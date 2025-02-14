---
title: Coffee Grinder Automation - A 2025 Update
published: 2025-02-14
# updated: 2025-01-31
description: 'An overview of how I improved my coffee grinder automation project by refactoring the code for better quality and maintainability.'
image: './assets/project/CoffeeGrinderAutomation.JPG'
tags: [
    C++,
    Coffee,
    ESP,
    MQTT,
]
category: 'Projects'
draft: false 
---

Back in 2020, I automated my coffee grinder. Before that, I had to weigh the ground coffee by hand.

More expensive coffee grinders offer time-based grinding and some even offer weight-based grinding.
Since mine didn't, I decided to take matters into my own hands and created a project to help me with it.

::github{repo="Jerey/coffee-automation"}

I revisited this project in 2025 and was not happy with the code.

## The Problem

The logic for starting, stopping, and managing the grinding process was scattered across multiple functions, making it difficult to understand and maintain.

Looking at the main `loop()` of the Arduino-based software showed this:

```cpp
void loop() {
  // ...
  if (automaticGrindingOngoing) {
    auto currentWeight = getCurrentWeightAndPublish();
    if ((currentWeight + thresholdTargetGrams) < desiredGrams) {
      // Start or continue the grinding
    } else {
      // The current weight with a given threshold has reached the target weight ..
      if (currentWeight < desiredGrams) {
        // .. now approach the desired weight slowly.
        // (the grinder retention and the distance between the grinder and the scale forced this approach)
        startGrinding("automaticGrinding", 150);
      } else {
        // .. or the desiredGrams have been reached.
      }
    }

  } else if (grindingOngoing &&
       (millis() - grindingStartedTime) > grindingTime) {
    // Time-based grinding was ongoing and we have reached the desired grinding time -> Stop the grinder.
  } else {
    // We are not grinding, so handle anything else (such as updates over the air).
  }
}
```

> Code parts were replaced by comments to ease the reading.
> [Here](https://github.com/Jerey/coffee-automation/blob/ea603f113caf657fe9d7a6bd0ccbf01cdb5467bc/src/program.cpp#L217-L250) is a link to the full code section.

When MQTT messages are received to start grinding, the `bool` flags `automaticGrindingOngoing` or `grindingOngoing` are set.

Looking at the [`callback`](https://github.com/Jerey/coffee-automation/blob/ea603f113caf657fe9d7a6bd0ccbf01cdb5467bc/src/program.cpp#L138-L169), I was surprised that there wasn't a `startAutomaticGrinding` function called or that the `startGrinding` function starts the grinding but doesn't care about stopping it.
The stopping logic was handled separately in the `loop()`, leading to a fragmented and hard-to-follow codebase.

## Improving the Code

The first idea was to extract the entire grinder and MQTT handling logic to their own libraries.

This left the `program.cpp` with less code only handling the update over the air and the connection to the Wi-Fi.

### `GrindingController`

A lot of the logic was now moved to the `GrindingController`.
It now takes care of the MQTT [`callback`](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/GrindingController.cpp#L46-L76) with dedicated functions for each MQTT command:

- `automaticGrinding(..)` -> Handles weight-based grinding
- `timeBasedGrinding(..)` -> Handles time-based grinding

The [`automaticGrinding`](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/GrindingController.cpp#L78-L102) function takes care of everything needed for weight-based grinding.
It tares the scale, grinds beans until the target weight minus a threshold is reached, and then slowly approaches the target weight. Additionally, it also handles all the MQTT updates.

The [`timeBasedGrinding`](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/GrindingController.cpp#L20-L25) function sends out updates via MQTT, starts, and stops the grinder based on the desired time.

The [`GrindingController::loop()`](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/GrindingController.cpp#L116-L119) is called by the [`program::loop()`](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/src/program.cpp#L81-L86).
Its main task is checking for MQTT updates and publishing the current weight on the scale regularly.

### `MqttGrinder`

The `MqttGrinder` is more or less a wrapper of the [`PubSubClient`](https://github.com/knolleary/pubsubclient), a library used for MQTT communication.
It takes care of any grinder-specific MQTT communication, such as [publishing](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/MqttGrinder.cpp#L25-L41) new values, [subscribing](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/MqttGrinder.cpp#L6-L11) to MQTT topics relevant to the grinder, and setting up the [callback](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/MqttGrinder.cpp#L58C26-L58C34) which is called when one of the subscribed topics is received.

### Blocking vs. Non-Blocking

The old implementation within the `program::loop()` was (almost) non-blocking, which actually is a good practice. A few delays were part of it, but in theory, the `program::loop()` would be pretty much executed periodically.

The new implementation is blocking since the new grinding functions remain in a `while`-loop until the targets are reached - theoretically, they can also never be reached.

But since the grinder controller always has exactly one task to do (either time-based or automatic grinding) and a firmware update should only occur when the grinder is not grinding, this solution felt right.
Additionally, the two main functions of the `GrindingController` (`automaticGrinding` and `timeBasedGrinding`) now are responsible for their own actions all the time, making the code easier to understand.

And despite the two functions being blocking, the `MqttGrinder` will still handle the MQTT messages regularly since the current weight is published periodically.
This is probably the part that should be refactored next, as there is a lot of hidden logic there. That `GrindingController::getCurrentWeightAndPublish()` publishes the weight after a defined time has passed (`scaleUpdateTime`) and therefore triggers an MQTT update is pretty hidden.

## Final Thoughts

It was fun to refactor this old project. Often my ESP-based projects start off as a quick proof of concept through which the code quality often suffers.

Additionally, I no longer own that grinder and therefore no longer use this project.
My current grinder is a so-called "single dose coffee grinder" - you weigh the beans before pouring them into the grinder and the output of the grinder is exactly the same weight.

But still having the load cell available enabled me to "experience" my own documentation for the setup - where the schematic allowed me to quickly have something up and running.
For testing, I chose to skip the relay and instead use the built-in LED of the D1 mini to indicate the current state of the grinder.

There are still several code parts that would benefit from a refactoring:

- The new [`callback`](https://github.com/Jerey/coffee-automation/blob/f62142d689d115cbf7541daf6f7284798d2f38ee/lib/CoffeeAutomation/GrindingController.cpp#L46-L76) function is rather long for being a mapping of topic to function.
- A lot of logic is still hidden. That removing `GrindingController::getCurrentWeightAndPublish()` results in no MQTT messages being updated is not something I would expect.

Additionally, further functions could be added:

- Fallback to ensure that the relay is switched off if anything bad happens (firmware crashes, etc.).
- Hardware buttons to control the grinder: MQTT enables many ways to control the grinder. But in real life, one would always control the grinder while standing there. It would be great to adjust settings and start the grinding without the need for any MQTT-compatible device.

If any of those code updates will come is unclear since I am no longer a user of the project.
But I also did not expect to refactor this project and yet here we are.

For a detailed view of the changes, you can check out the [GitHub pull request](https://github.com/Jerey/coffee-automation/pull/2).

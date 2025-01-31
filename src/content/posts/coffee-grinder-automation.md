---
title: Coffee Grinder Automation
published: 2020-04-01
# updated: 2024-11-29
description: 'µController and scale controlled coffee grinder controllable via Mqtt.'
image: '/assets/project/CoffeeGrinderProtoType.jpg'
tags: [Coffee, ESP, C++, MQTT]
category: 'Projects'
draft: false 
---

I enjoy a good cup of coffee. To enjoy that at home, I bought myself a coffee grinder along with a nice espresso machine. To receive a good tasting coffee, several factors are important: coarseness, dosage, quality of the beans, extraction time, ... . To find the best tasting coffee, it is important to minimize the changing factors. One of them typically is the bean amount. So far I had to stand by the coffee mill with a scale and manually measure the amount of ground beans, that has come out of it. After having worked from home for a while, I got annoyed of this, so I decided to automatize the grinding of the beans.

Having gained some experience in the `ESP8266` world, I decided to use a `D1-mini` for the task. After some research, I chose to use a load cell along with the load cell amplifier HX711. The mill itself is switched on and off by a relay controlled by the `D1-mini`.

A `node-red` flow along with the `node-red`-dashboard are used to control the `D1-mini`. The commands are sent through `mqtt` topics.

On the dashboard, there are several functions: Weight based and time based grinding, a brew timer and the taring of the scale.
The main challenge with this project was: While grinding it takes some time until the ground coffee reaches the scale. Therefore stopping the grinder when the weight is reached might already be too late. Therefore it was necessary to stop the process of grinding a bit earlier and time base grind some more until the target weight has been reached.

<img src="/assets/project/CoffeeGrinderDashboard.png" alt="Node-RED dashboard" width="800">


::github{repo="Jerey/coffee-automation"}

---
title: Mara X Meter
publishDate: 2020-03-02 00:00:00 #TODO: Add the publish date here.
img: /assets/project/Heatup.gif
img_alt: Iridescent ripples of a bright blue and pink liquid
description: |
  E-Ink display visualizing the heat-up of a mara-x.
tags:
  - C++
  - D1-mini
  - PlatformIO
---

My espresso machine is a Lelit Mara-X. Among several adaptions to the classic E-61 brewing unit, the Mara-X has a serial in- and output. The machine provides the current software version, the target boiler temperature, the current boiler temperature, the current heat exchanger temperature and whether the heating currently is on or off over this interface.

I have seen several projects visualizing this data in various ways.

Since the aesthetics of the coffee machine shouldn't be impact to much by a modern display, I decided to use an e-paper display to visualize the data relevant to me and also draw a heat-up graph.

See the github [repository](https://github.com/Jerey/mara-x-meter) for a detailed description.

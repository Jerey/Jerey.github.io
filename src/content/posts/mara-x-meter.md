---
title: Mara X Meter
published: 2021-07-01
# updated: 2024-11-29
description: 'E-Ink display visualizing the heat-up of a mara-x.'
image: '/assets/project/Heatup.gif'
tags: [Coffee, ESP, E-Ink, Mara-x, C++]
category: 'Projects'
draft: false 
---

My espresso machine is a Lelit Mara-X. Among several adaptions to the classic E-61 brewing unit, the Mara-X has a serial in- and output. The machine provides the current software version, the target boiler temperature, the current boiler temperature, the current heat exchanger temperature and whether the heating currently is on or off over this interface.

I have seen several projects visualizing this data in various ways.

Since the aesthetics of the coffee machine shouldn't be impact to much by a modern display, I decided to use an e-paper display to visualize the data relevant to me and also draw a heat-up graph.

::github{repo="Jerey/mara-x-meter"}

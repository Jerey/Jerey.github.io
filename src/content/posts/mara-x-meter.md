---
title: Mara X Meter
published: 2021-07-01
updated: 2025-01-31
description: 'An e-paper display which visualizes the heat-up process and key metrics of the Lelit Mara-X espresso machine.'
image: './assets/project/Heatup.gif'
tags: [
    C++,
    Coffee, 
    E-Ink, 
    ESP, 
    Mara-X, 
]
category: 'Projects'
draft: false 
---

My espresso machine is a Lelit Mara-X. Among several adaptations to the classic E-61 brewing unit, the Mara-X features a serial input and output interface. This interface provides information such as the current software version, target boiler temperature, current boiler temperature, current heat exchanger temperature, and the heating status (on or off).

I have come across several projects that visualize this data in various ways.

To ensure that the aesthetics of the coffee machine remain largely unaffected by modern displays, I decided to use an e-paper display. This display visualizes the data relevant to me and also draws a heat-up graph.

::github{repo="Jerey/mara-x-meter"}

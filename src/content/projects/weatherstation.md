---
title: Weatherstation
publishDate: 2020-03-04 00:00:00
img: /assets/project/WeatherstationNodeJSServer2.png
img_alt: Pearls of silky soft white cotton, bubble up under vibrant lighting
description: |
  Hard- and software project to track, store and visualize the current temperature and humidity.
tags:
  - C++
  - ESP8266
  - NodeJS
  - Python
  - MQTT
  - Grafana
  - InfluxDB
---

## Weatherstation

Looking for a project to work on in my spare time (which touches several technologies), I came across the `ESP8266` and had the idea, to create a "weatherstation". It should be able to track the room climate by storing the current temperature and humidity. Additionally, this collected data should be presented in a nice way.

The project consists of two major parts: [The client](https://github.com/jerey/weatherstation-client), which measures the current temperature and humidity, and publishes the data via `MQTT`. It is based on an `ESP8266`. And a server, which stores the received values and presents them in a nice way. There are multiple ways to start a server taking care of the data: Either with a [nodejs based server](https://github.com/jerey/weatherstation-server), which was specifically created for this project utilizing a SQL database to store the values and starting a webserver to present the data in form of graphs. Or with the help of `node-red`, `influxdb` and `grafana`. Here a `node-red` flow is be started, which automatically stores the published data to an `InfluxDB` and `Grafana` is used to visualize it.

<img src="/assets/project/WeatherstationNodeJSServer1.png" alt="NodeJS weatherstation server" width="400">

<img src="/assets/project/WeatherstationGrafana.png" alt="Node-RED, InfluxDB and Grafana alternative." width="1000">

For a more detailed view, see [the client repository](https://github.com/jerey/weatherstation-client) and [the server repository](https://github.com/jerey/weatherstation-server).


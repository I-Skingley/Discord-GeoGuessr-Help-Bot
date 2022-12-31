# geoBot

## General info
This is a Discord bot that returns an openstreetmap tile with 4 possible zoom levels. Originally created for "help" with GeoGuessr.

## Tech
Created with js
* using the discord.js library to interact with the Discord api.
* Nominatim for converting given location into longitude and latidude.
* Gets relevant tile image from openstreetmap

## Todo
* Add location pin

## Setup
To run this project, install it locally using npm:

```
$ npm install
$ node deploy-commands.js
$ npm run start
```

Will require the following in an .env file:
* BOT_TOKEN = Discord bot token
* CLIENTID = Discord bot client ID
* GUILDID = Discord server ID

## Screenshots
Low zoom

![Low](/Screenshots/low.png?raw=true)

Med zoom

![Med](/Screenshots/med.png?raw=true)

High zoom

![High](/Screenshots/high.png?raw=true)

Very High zoom

![VHigh](/Screenshots/vhigh.png?raw=true)
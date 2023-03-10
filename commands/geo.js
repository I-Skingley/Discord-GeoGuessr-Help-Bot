require('dotenv').config();

const { SlashCommandBuilder } = require('discord.js');

apiKey = process.env.APIKEY_TZDB;
module.exports = {
  data: new SlashCommandBuilder()
    .setName('geo')
    .setDescription('Find a location')
    .addStringOption(option =>
      option.setName('location')
        .setDescription('Where are you trying to find?')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('zoom')
        .setDescription('Zoom level for tile.')
        .setRequired(true)
        .addChoices(
          { name: 'Low', value: '7' },
          { name: 'Med', value: '10' },
          { name: 'High', value: '13' },
          { name: 'Very High', value: '16' }
        ))

  ,
  async execute(interaction) {
    const suggest =  String(interaction.options.getString("location"))

    const zoom = interaction.options.getString("zoom")

    fetch(`https://nominatim.openstreetmap.org/search/${suggest}?format=json&addressdetails=1&limit=1&polygon_svg=1`)
      .then(function (response) {
        return (response.json())
      }).then(async function (lData) {

        const lat = parseFloat(lData[0].lat)
        const lon = parseFloat(lData[0].lon)

        const y = lat2tile(lat, zoom)
        const x = lon2tile(lon, zoom)

        await interaction.reply({ files: [`https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`], ephemeral: true });

      });
    return;
  }
};

function lon2tile(lon, zoom) { return (Math.floor(Math.pow(2, zoom) * (lon + 180) / 360)); }
function lat2tile(lat, zoom) { return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom))); }

//  Output format
// [
//   {
//     place_id: 106196618,
//     licence: 'Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright',
//     osm_type: 'way',
//     osm_id: 15976890,
//     boundingbox: [ '52.5170798', '52.5173311', '13.3975116', '13.3981577' ],
//     lat: '52.51720765',
//     lon: '13.397834399325466',
//     display_name: 'Kommandantenhaus, 1, Unter den Linden, Mitte, Berlin, 10117, Deutschland',
//     class: 'historic',
//     type: 'house',
//     importance: 0.8135042058306902,
//     address: {
//       historic: 'Kommandantenhaus',
//       house_number: '1',
//       road: 'Unter den Linden',
//       suburb: 'Mitte',
//       borough: 'Mitte',
//       city: 'Berlin',
//       'ISO3166-2-lvl4': 'DE-BE',
//       postcode: '10117',
//       country: 'Deutschland',
//       country_code: 'de'
//     },
//     svg: 'M 13.3975116 -52.5172905 L 13.397549 -52.5170798 13.397715 -52.5170906 13.3977122 -52.5171064 13.3977392 -52.5171086 13.3977417 -52.5170924 13.3979655 -52.5171069 13.3979623 -52.5171233 13.3979893 -52.5171248 13.3979922 -52.5171093 13.3981577 -52.5171203 13.398121 -52.5173311 13.3978115 -52.5173103 Z'
//   }
// ]
require('dotenv').config();

const Enmap = require('enmap');
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const axios = require('axios');

client.instance = axios.create({
  baseURL: process.env.PP_WEB_DOMAIN,
  headers: { 
    'Authorization': process.env.PP_DISCORD_TOKEN,
    'Accept': 'application/json'
  }
})

client.prefix = '!pp-';

client.on('ready', () => {
  console.log('Bot is started!');
});

fs.readdir('./events/', (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    if (!file.endsWith('.js')) return;

    const event = require(`./events/${file}`);

    let eventName = file.split('.')[0];

    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./events/${file}`)];
  });
});

client.commands = new Enmap();

fs.readdir('./commands/', (err, files) => {
  if (err) return console.error(err);

  files.forEach(file => {
    let props = require(`./commands/${file}`);

    let commandName = file.split('.')[0];

    console.log(`Attempting to load command ${commandName}`);
    client.commands.set(commandName, props);
  });
});

client.login(process.env.BOT_TOKEN);
// Require the necessary discord.js classes
const fs = require('fs');
const { Client, Collection, Intents, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const handleComand = require('./helpers/command');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.MessageContent] });

client.cooldowns = new Collection();

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once('ready', () => {
    console.log('Ready!');
});

client.on('interactionCreate', async interaction => {
    if(interaction.isCommand()) handleComand(client, interaction);

    
});
// Log in to Discord with your client's token
client.login(token);
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

var quoteChannel = null;

module.exports = {
    data: new SlashCommandBuilder()
        .setName('select-channel-quote')
        .setDescription('Define a channel to get some quote for the /random-quote')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel with quotes')
                .setRequired(true)),

    /**
     * 
     * @param { CommandInteraction} interaction 
     */
    
    async execute(interaction){
        const channel = interaction.options.getChannel('channel');
        quoteChannel = channel;
        
        module.exports.quoteChannel = quoteChannel;
        await interaction.reply(`The quote's channel was set to ${quoteChannel} !`);
    }
}

module.exports.quoteChannel = quoteChannel;




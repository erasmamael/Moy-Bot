const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Commands list'),

    /**
     * 
     * @param { CommandInteraction} interaction 
     */
    async execute(interaction){
        await interaction.reply('`/select-channel-quote` to define a channel to get some quote for the `/random-quote`\n' + 
                                '`/random-quote` to get a random quote from the channel selected with `/select-channel-quote`\n' +
                                '`/ratio` to ratio the personne who send the previous message');
    }
}


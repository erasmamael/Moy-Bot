const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('random-quote')
        .setDescription('A random quote from the channel selected with /select-channel-quote'),

    /**
     * 
     * @param { CommandInteraction} interaction 
     */
    async execute(interaction){

        const channel = require('./select-channel-quote.js');

        if(channel.quoteChannel != null ){

            const random = Math.floor(Math.random() * 100);

			let list = await channel.quoteChannel.messages.fetch({limit: random});

			let phrase = list.last().content.split("<@");

			if(phrase[1] === undefined){
				phrase = list.last().content.split("\n");
			}else{
				phrase[1] = "<@" + phrase[1];
				for(let i=2; i<phrase.length-2; i++) phrase[1] += phrase[i];
			}
			
            await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor('#7a7a7a')
						.setTitle(phrase[0])
						.setDescription(phrase[1])
						.setTimestamp(list.last().createdTimestamp)
				]
			});
        }else{
            await interaction.reply("there are no selected channels.\nUse `/select-channel-quote` to select a channel.");
        }
        
    }
}
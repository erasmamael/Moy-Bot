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
        console.log('connexion reussi');
        if(channel.quoteChannel != null ){

            const random = Math.floor(Math.random() * 100);

			let list = await channel.quoteChannel.messages.fetch({limit: random});

            let message = [];
            let author = "";

            if(list.last().content.split('\n').length>1){
                console.log('retour à la ligne');
                message = list.last().content.split('\n');
                author = message[message.length-1];
            }else if(list.last().content.split('"').length>2){
                console.log('guillemet');
                message = list.last().content.split('"');
                author = message[message.length-1];
            }else if(list.last().content.split('@').length>1){
                console.log('les pings');
                message = list.last().content.split('@');
                author = "<@" + message[message.length-1];
            }else{
                console.log('rien');
                message = list.last().content;
                author = list.last().author;
            }

			// let phrase = list.last().content.split("<@");

			// if(phrase[1] === undefined){
			// 	phrase = list.last().content.split("\n");
			// }else{
			// 	phrase[1] = "<@" + phrase[1];
			// }

            console.log('préparation de la réponse');
            let phrase = "";
            if(message.length > 1){
                for(let i=0; i<message.length-1; i++){
                    phrase = phrase + message[i];
                }
            }else{
                console.log('pas boucle');
                phrase = message;
            }
			
            console.log('message : '+message);
            console.log('phrase : ' + phrase);
            console.log('author : '+author);
            await interaction.reply({
				embeds: [
					new EmbedBuilder()
						.setColor('#7a7a7a')
						.setTitle(phrase)
						.setDescription(author)
						.setTimestamp(list.last().createdTimestamp)
				]
			});
        }else{
            console.log('Pas bon');
            await interaction.reply("there are no selected channels.\nUse `/select-channel-quote` to select a channel.");
        }
        
    }
}
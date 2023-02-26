const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ratio')
		.setDescription('to ratio the personne who send the previous message'),

	/**
	 * 
	 * @param { CommandInteraction} interaction 
	 */
	async execute(interaction){

		//recupération du message qui précède
		const lstMessages = await message.channel.messages.fetch({limit: 2});
		const messageBefore = lstMessages.last();
		
		//repondre ratio 
		var embed = new EmbedBuilder()
		.setColor('#1d09d8')
		.setTitle("Ratio")
		.setDescription(`${interaction.user} veut ratio ${messageBefore.author}`);

		interaction.reply({
			embeds: [embed]
		});
		
		//ajouter une réaction au message précédent et au message envoyé 
		var message = await interaction.fetchReply();

		message.react('💙');
		messageBefore.react('💙');

		//attendre 30 sec
		await new Promise(r => setTimeout(r, 5000)); 

		//modification de la couleur pour dire que le temps est écoulé 
		embed.setColor('DarkRed');
		message.edit({embeds: [embed]});

		//incompréhensible mais permet d'actualiser le nombre de réactions 
		message = await interaction.fetchReply();
		await message.channel.messages.fetch({limit: 2});

		//comparer le nombre de réaction
		if(message.reactions.cache.get('💙').count > messageBefore.reactions.cache.get('💙').count){
			message.channel.send(`Aller Hop ! Ratio ${messageBefore.author}`);
			
		}else{
			message.channel.send(`Oh le flop ! Ferme la ${interaction.user}`);
		}
	}
}
const { SlashCommandBuilder } = require('@discordjs/builders');
const { CommandInteraction, EmbedBuilder } = require('discord.js');

module.exports = {
    couldown: 5,
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

            let lstMessage = [];
            // Create message pointer
            let message = await channel.quoteChannel.messages
                .fetch({ limit: 1 })
                .then(messagePage => (messagePage.size === 1 ? messagePage.at(0) : null));

            while (message) {
            await channel.quoteChannel.messages
                .fetch({ limit: 100, before: message.id })
                .then(messagePage => {
                    lstMessage.push.apply(messagePage);

                    // Update our message pointer to be last message in page of messages
                    message = 0 < messagePage.size ? messagePage.at(messagePage.size - 1) : null;
                });
            }

            const random = Math.floor(Math.random() * lstMessage.length);

            const selectedMessage = lstMessage[random];

            let text = [];
            let author = "";

            if(selectedMessage.content.split('\n').length>1){
                text = selectedMessage.content.split('\n');
                author = text[text.length-1];

            }else if(selectedMessage.content.split('"').length>2){
                text = selectedMessage.content.split('"');
                author = text[text.length-1];

            }else if(selectedMessage.content.split('@').length>1){
                text = selectedMessage.content.split('@');
            
                if(text[0].endsWith('<')){
                    author = "<@" + text[text.length-1];
                    text[0] = text[0].slice(0, -1);

                }else{
                    author = text[text.length-1]
                }
            }else{
                text = selectedMessage.content;
                author = "";
            }
            
            
            let phrase = "";
            if(Array.isArray(text)){
                for(let i=0; i<text.length-1; i++){
                    phrase = phrase + " "+ text[i];
                }
            }else{
                phrase = text;
            }

            if(author === "") author = "<@"+selectedMessage.author.id+">";

            const response = new EmbedBuilder()
                            .setColor('#7a7a7a')
                            .setTimestamp(selectedMessage.createdTimestamp);

            if(phrase === ""){ 
                response.setTitle(author);
                
            }else{
                response.setTitle(phrase)
                        .setDescription(author);
            }
            
            if(selectedMessage.attachments.size>0){
                response.setImage(selectedMessage.attachments.first().url);
            }
            console.log(response);
            await interaction.reply({embeds:[response]});
        }else{
            await interaction.reply("there are no selected channels.\nUse `/select-channel-quote` to select a channel.");
        }
        
    }
}
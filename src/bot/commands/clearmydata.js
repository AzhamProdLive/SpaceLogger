const { displayUser } = require('../utils/constants')

module.exports = {
  func: async message => {
    await message.channel.createMessage({
      embeds: [{
        title: 'Action needed:',
        description: `To clear your data (messages), please contact my owner via Discord or Email. Remember: all messages stored are removed automatically after ${process.env.MESSAGE_HISTORY_DAYS} days.`,
        color: 16711680,
        timestamp: new Date(),
        footer: {
          icon_url: global.bot.user.avatarURL,
          text: displayUser(global.bot.user)
        },
        author: {
          name: displayUser(message.author),
          icon_url: message.author.avatarURL
        },
        fields: []
      }]
    })
  },
  name: 'clearmydata',
  quickHelp: `Provides the information needed to clear your data from the bot. Your stored data (messages) is automatically deleted after ${process.env.MESSAGE_HISTORY_DAYS} days from the database regardless of using this command.`,
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}clearmydata\``,
  type: 'any',
  category: 'Utility'
}

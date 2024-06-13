const { displayUser } = require('../utils/constants')

module.exports = {
  func: async message => {
    await message.channel.createMessage({
      embeds: [{
        title: 'Configuration dashboard',
        description: `Hey, I'm ${global.bot.user.username}! My **only** purpose is to, at your command, log everything to your configured channels. Click "configuration dashboard" to login to my dashboard and configure me!`,
        color: 3553599,
        timestamp: new Date(),
        footer: {
          icon_url: global.bot.user.avatarURL,
          text: displayUser(global.bot.user)
        },
        thumbnail: {
          url: global.bot.user.avatarURL
        },
        author: {
          name: displayUser(message.author),
          icon_url: message.author.avatarURL
        },
        fields: [
          {
            name: 'Technical Details',
            value: `${displayUser(global.bot.user)} is written in JavaScript utilizing the Node.js runtime. It uses the [eris](https://github.com/abalabahaha/eris) library to interact with the Discord API. PostgreSQL and Redis are used. The original code OSS is available at https://github.com/curtisf/logger`
          },
          {
            name: 'The Author',
            value: 'SpaceLogger is developed and maintained by [AzhamMakesTrash](https://github.com/azhamprodlive). SpaceLogger is a fork of [Logger](https://github.com/curtisf/logger). You can contact AzhamMakesTrash via his linked socials on github.'
          },
          {
            name: 'Shard Info',
            value: `Shard ID: ${message.channel.guild.shard.id}\nWebsocket latency: ${message.channel.guild.shard.latency}\nStatus: ${message.channel.guild.shard.status}`
          },
          {
            name: 'Privacy Policy',
            value: 'You can view the original privacy policy [here](https://gist.github.com/curtisf/0598b0930c11363d24e29300cf21d572). For up-to-date privacy information, you can contact me via my email address (available on Github).'
          }
        ]
      }]
    })
  },
  name: 'info',
  quickHelp: 'Get information about how Logger was made and the current shard serving you.',
  examples: `\`${process.env.GLOBAL_BOT_PREFIX}info\``,
  type: 'any',
  category: 'Information'
}

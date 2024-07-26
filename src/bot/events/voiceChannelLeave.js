const send = require('../modules/webhooksender')
const { displayUsername } = require('../utils/constants')

module.exports = {
  name: 'voiceChannelLeave',
  type: 'on',
  handle: async (member, channel) => {
    if (member) {
      if (global.bot.guildSettingsCache[channel.guild.id].isChannelIgnored(channel.id)) return
      await send({
        guildID: channel.guild.id,
        eventName: 'voiceChannelLeave',
        embeds: [{
          author: {
            name: `${displayUsername(member)} ${member.nick ? `(${member.nick})` : ''}`,
            icon_url: member.avatarURL
          },
          description: `**${displayUsername(member)}** ${member.nick ? `(${member.nick})` : ''} left ${channel.type !== 13 ? 'voice' : 'stage'} channel: ${channel.name}.`,
          fields: [{
            name: 'Channel',
            value: `<#${channel.id}> (${channel.name})`
          }, {
            name: 'ID',
            value: `\`\`\`ini\nUser = ${member.id}\nChannel = ${channel.id}\`\`\``
          }],
          color: 3553599
        }]
      })
    }
  }
}
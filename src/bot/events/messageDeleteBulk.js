const sa = require('superagent')
const { getMessage } = require('../../db/messageBatcher')
const getMessagesByIds = require('../../db/interfaces/postgres/read').getMessagesByIds
const send = require('../modules/webhooksender')
const { displayUser } = require('../utils/constants')

  module.exports = {
    name: 'messageDeleteBulk',
    type: 'on',
    handle: async deletedMessages => {
      if (deletedMessages.length === 0) return // TODO: TEST!

      if (!process.env.PASTE_SITE_ROOT_URL) {
        if (!deletedMessages[0].guildId) return;

        return send({
          guildID: deletedMessages[0].guildId,
          eventName: 'messageDeleteBulk',
          embeds: [{
            description: `${deletedMessages.length} messages were bulk deleted. :warning: The bot owner hasn't configured a paste site so contents of deleted messages not shown. :warning:`,
            color: '#FFAE42',
          }]
        });
      }

      let messagesFromBatch = [];
      let messagesToFetchFromDb = [];
      for (const deletedMessage of deletedMessages) {
        const messageFromBatch = getMessage(deletedMessage.id)
        if (messageFromBatch === undefined) messagesToFetchFromDb.push(deletedMessage.id)
        else messagesFromBatch.push(messageFromBatch)
      }

      const messagesFromDb = await getMessagesByIds(messagesToFetchFromDb)
      await paste([...messagesFromBatch, ...messagesFromDb], deletedMessages[0].channel.guild.id)
    }
  }

async function paste (messages, guildID) {
  if (!messages || messages.length === 0) return
  const messageDeleteBulkEvent = {
    guildID: guildID,
    eventName: 'messageDeleteBulk',
    embeds: [{
      description: `**${messages.length}** message(s) were deleted and known in cache.`,
      fields: [],
      color: 15550861
    }]
  }
  const pasteString = messages.reverse().map(m => {
    let globalUser = global.bot.users.get(m.author_id)
    if (!globalUser) {
      globalUser = {
        username: 'Unknown',
        discriminator: '0000',
        avatarURL: '<no avatar>'
      }
    }
    return `${displayUser(globalUser)} (${m.author_id}) | (${globalUser.avatarURL}) | ${new Date(m.ts).toUTCString()}: ${m.content}`
  }).join('\r\n')
  if (pasteString) {
    sa
      .post(`${process.env.PASTE_CREATE_ENDPOINT.endsWith("/") ? process.env.PASTE_CREATE_ENDPOINT.slice(0, -1) : process.env.PASTE_CREATE_ENDPOINT}/documents`)
      .set('Authorization', process.env.PASTE_CREATE_TOKEN ?? '')
      .set('Content-Type', 'text/plain')
      .send(pasteString || 'An error has occurred while fetching pastes. Please contact the bot author.')
      .end((err, res) => {
        if (!err && res.body && res.statusCode === 200 && res.body.key) {
          messageDeleteBulkEvent.embeds[0].fields.push({
            name: 'Link',
            value: `${process.env.PASTE_CREATE_ENDPOINT.endsWith("/") ? process.env.PASTE_CREATE_ENDPOINT.slice(0, -1) : process.env.PASTE_CREATE_ENDPOINT}/${res.body.key}.txt`
          })
          send(messageDeleteBulkEvent)
        } else {
          global.logger.error(err)
          global.webhook.error('An error has occurred while posting to the paste website. Check logs for more.')
        }
      })
  }
}
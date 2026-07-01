const pool = require('../../clients/postgres')

exports.deleteGuild = async function (guildID) {
  return await pool.query('DELETE FROM guilds WHERE id=$1', [guildID])
}

exports.deleteMessage = async function (messageID) {
  return await pool.query('DELETE FROM messages WHERE id=$1', [messageID])
}

exports.deleteMessagesOlderThan = async function (days) {
  // Delete messages older than specified days
  const result = await pool.query(
    'DELETE FROM messages WHERE ts < NOW() - INTERVAL \'1 day\' * $1 RETURNING id',
    [days]
  )
  return result.rowCount
}

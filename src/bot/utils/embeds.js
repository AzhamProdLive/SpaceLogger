const { displayUsername } = require("./constants")

module.exports = {
  getEmbedFooter (user) {
    return {
      text: displayUsername(user),
      icon_url: user.dynamicAvatarURL(null, 64)
    }
  },
  getAuthorField (user) {
    return {
      name: displayUsername(user),
      icon_url: user.avatarURL
    }
  }
}
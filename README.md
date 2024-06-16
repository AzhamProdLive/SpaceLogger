# /!\ THIS BRANCH IS NOT MEANT TO BE USED AS IS, THIS IS AN UNSTABLE BRANCH USED FOR NEW FEATURES AND DEVELOPMENT TOWARD SPACELOGGER

---

SpaceLogger v1 is a powerful [Discord](https://discordapp.com) bot forked from LoggerV3 and Tizzy Logger's, which is meant to give staff members oversight over the various actions taking place in their server.
- This fork includes some improvements and features the main repo doesn't have.
> - Image/File logs for `messageUpdate`, `messageDelete`, `messageBulkDelete` events.

## Installation (PLEASE CHECK THE MAIN REPO FOR THE INSTRUCTIONS, AS THIS REPO HAS BEEN MODIFIED TO FIT MY OWN NEEDS)

- [PostgreSQL](https://www.postgresql.org/download/)
- [Redis](https://redis.io/downloads/)
- [NodeJS](https://nodejs.org/en/download)

1. Setup Postgres and add a superuser (default user works)
2. Clone bot repo and enter the created folder
3. Copy .env.example into .env
4. Fill out **all** of the **required** fields in `.env`
5. `npm install`
6. `npm run genDB`
7. `node index.js`
8. Use your prefix to set the bot's commands. If yours is %, then you'd do `%setcmd global` to globally set commands, and `%setcmd guild` to quickly set server-specific slash commands
> NOTE: You'll need to restart your Discord client in order for them to show up!

## Usage

```bash
node index.js
```

## Contributing
Pull requests are welcome as long as it follows the following guidelines:
1. Is your idea really one that a large group of moderators would like?
2. Is your idea scalable?
3. Will your idea cause the bot to hit it's global ratelimit?

If you have done all of the above steps, then open a pull request and I will review it. Style guide and testing will be implemented in a later update.

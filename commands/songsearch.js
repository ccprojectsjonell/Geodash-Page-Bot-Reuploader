const axios = require('axios');

module.exports = {
  name: 'songsearch',
  onCmds: async ({ bot, event, args }) => {
    const searchQuery = args.join(' ');
    if (!searchQuery) {
      return bot.send('Please provide a search query for searchsong');
    }

    try {
      const response = await axios.get(`https://geodash.click/dashboard/stats/searchSongs.php`, {
        params: { q: searchQuery }
      });
const b = global.fonts.bold(`📝 Song Search Results of "${searchQuery}" `)
      const data = response.data;
      if (!data) {
        return bot.send('No songs found for your search.');
      }

      const songMatches = [...data.matchAll(/<td>(\d+)<\/td>\s*<td>([^<]+)<\/td>\s*<td>([^<]+)<\/td>/g)];
      if (songMatches.length === 0) {
        return bot.send('No songs found for your search.');
      }

      const songList = songMatches.map(match => {
        const [_, id, title, artist] = match;
        return `${global.line}\nID: ${id} - Title: ${title.trim()} by ${artist.trim()}`;
      }).join('\n');

      bot.send(`${b}\n${songList}`);
    } catch (error) {
      bot.send(error.message);
      console.error('Error in songsearch command:', error);
    }
  }
};

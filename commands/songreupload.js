const axios = require('axios');

module.exports = {
  name: 'songreupload',
  onCmds: async ({ bot, event, args }) => {
    const url = args[0];
    if (!url) {
      return bot.send('Please provide a song URL YT');
    }
 
    try {
      bot.send("Reuploading Song.......");
      const response = await axios.get(`https://geodash.click/api/songReupload4bot.php`, {
        params: {
          apikey: 'jonell@143',
          url: url
        }
      });

      const data = response.data;

      if (data.status === true) {
        const { response: responseMessage, song_id, title } = data;
 const bold = global.fonts.bold("✅ Successfully Reuploaded");
        const database = global.fonts.bold("✅ Already Reuploaded Song");
        if (responseMessage === "Successfully reuploaded to the database") {
          bot.send(`${bold}\n${global.line}\nReuploaded Successfully In GeoDash:\n📝 Titile: ${title}\n🆔 SongID: ${song_id}.`);
        } else if (responseMessage === "This song url has been reupload already") {
          bot.send(`${database}\n${global.line}\nThis song is Already Reupload\n📝 Titile: ${title}\n🆔 SongID: ${song_id}.`);
        } else {
          bot.send(error.message);
        }
      } else {
        bot.send(error.message);
      }
    } catch (error) {
      bot.send(error.message);
      console.error('Error in songreupload command:', error);
    }
  }
};

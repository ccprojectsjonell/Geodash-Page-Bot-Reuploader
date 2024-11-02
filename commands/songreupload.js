const axios = require('axios');

module.exports = {
  name: 'songreupload',
  onCmds: async ({ bot, event, args }) => {
    const url = args[0];
    if (!url) return bot.send('Please provide a song URL YT');
 
    try {
      bot.send("Reuploading Song.......");
      const response = await axios.get(`https://geodash.click/api/songReupload4bot.php`, {
        params: { apikey: 'jonell@143', url }
      });

      const { status, response: responseMessage, song_id, title } = response.data;
      const successBold = global.fonts.bold("✅ Successfully Reuploaded");
      const alreadyReuploadedBold = global.fonts.bold("✅ Already Reuploaded Song");

      if (status) {
        if (responseMessage === "Successfully reuploaded to the database") {
          bot.send(`${successBold}\n${global.line}\nReuploaded Successfully In GeoDash:\n📝 Title: ${title}\n🆔 SongID: ${song_id}.`);
        } else if (responseMessage === "This song url has been reupload already") {
          bot.send(`${alreadyReuploadedBold}\n${global.line}\nThis song is Already Reupload\n📝 Title: ${title}\n🆔 SongID: ${song_id}.`);
        } else {
          bot.send(responseMessage);
        }
      } else {
        bot.send("Reupload failed i think this a copyright issue this YouTube link try another link");
      }
    } catch (error) {
      bot.send(error.message);
      console.error('Error in songreupload command:', error);
    }
  }
};

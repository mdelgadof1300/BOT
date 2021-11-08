const { Telegraf } = require("telegraf");
const { llamarBOT } = require("./llamada_bot");

const bot = new Telegraf("2008792740:AAEdi4_TklkRErPs5kKMYhg-OxsmFeKQbco");

const regex = new RegExp(/pregunta (.+)/i);

bot.start((ctx) =>
  ctx.reply(
    "Bienvenido, usa el comando /pregunta <pregunta> para cualquiera de tus inquietudes"
  )
);
bot.help((ctx) => ctx.reply("Send me a sticker"));
bot.on("sticker", (ctx) => ctx.reply("👍"));
bot.hears("hi", (ctx) => ctx.reply("Hey there"));
bot.hears(regex, async (ctx) => {
  const pregunta = ctx.message.text.replace("/pregunta ", "");
  let { data } = await llamarBOT(pregunta);
  let respuesta = data["answers"][0].answer;
  if (data["answers"][0].score > 60) {
    ctx.reply(respuesta);
  } else {
    ctx.reply("No tengo una respuesta certera, lo siento :c");
  }
});
bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));

const { Telegraf } = require("telegraf");
const { llamarBOT } = require("./llamada_bot");

const bot = new Telegraf("2008792740:AAEdi4_TklkRErPs5kKMYhg-OxsmFeKQbco");

const regex = new RegExp(/pregunta (.+)/i);

bot.start((ctx) =>
  ctx.reply(
    "Bienvenido, usa el comando /pregunta <pregunta> para cualquiera de tus inquietudes. Ejemplo 1: /pregunta ¿cuáles son mis derechos?, Ejemplo 2: /pregunta ¿Qué es el servicio social?, Ejemplo 3: /pregunta Prácticas profesionales"
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
    ctx.reply("No tengo una respuesta certera, lo siento :c.");
  }
});
bot.launch();

const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

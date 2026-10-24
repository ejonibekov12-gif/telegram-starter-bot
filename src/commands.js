import { InlineKeyboard } from "grammy"


const OWNER_ID = 8271078986
const CHANNEL = "@ShunchakiMusiqaUz"
const CHANNEL_URL = "https://t.me/ShunchakiMusiqaUz"


function subscriptionKeyboard() {
return new InlineKeyboard()
.url("📢 Kanalga obuna bo‘lish", CHANNEL_URL)
}


export function registerCommands(bot) {
bot.command("start", async (ctx) => {
if (ctx.from?.id !== OWNER_ID) {
return ctx.reply("🎵 Salom! SHUNCHAKI MUSIQA UZ kanalimizga xush kelibsiz.")
}


await ctx.reply(
  "🎧 SHUNCHAKI MUSIQA UZ BOTIGA XUSH KELIBSIZ!\n\n" +
  "🎵 Menga musiqa faylini yuboring.\n" +
  "🚀 Men uni avtomatik ravishda kanalingizga joylayman!",
)



})


bot.command("help", (ctx) => {
if (ctx.from?.id !== OWNER_ID) {
return ctx.reply("🎧 SHUNCHAKI MUSIQA UZ")
}


return ctx.reply(
  "🎧 BOT BUYRUQLARI\n\n" +
  "/start — Botni boshlash\n" +
  "/help — Yordam\n" +
  "/id — Telegram ID raqamingiz\n\n" +
  "🎵 Audio fayl yuboring — kanalga joylanadi."
)



})


bot.command("id", (ctx) =>
ctx.reply(Telegram ID: ${ctx.from?.id ?? "Noma'lum"})
)


bot.on("message:audio", async (ctx) => {
if (ctx.from?.id !== OWNER_ID) {
return ctx.reply("⛔ Bu botdan faqat uning egasi foydalana oladi.")
}


const audio = ctx.message.audio
const title = audio.title || "Noma'lum qo‘shiq"
const artist = audio.performer || "Noma'lum ijrochi"

const caption =
  "━━━━━━━━━━━━━━━━━━\n" +
  "🎧 SHUNCHAKI MUSIQA UZ\n" +
  "━━━━━━━━━━━━━━━━━━\n\n" +
  `🎵 Nomi: ${title}\n` +
  `🎤 Ijrochi: ${artist}\n\n` +
  "🎶 Musiqadan zavqlaning! ❤️‍🔥\n\n" +
  "💿 Quloqchinlarni taqing va musiqani his qiling!\n\n" +
  "━━━━━━━━━━━━━━━━━━\n" +
  "📢 Kanalimizga qo‘shiling 👇\n" +
  "@ShunchakiMusiqaUz"

try {
  await ctx.api.sendAudio(CHANNEL, audio.file_id, {
    caption,
    reply_markup: subscriptionKeyboard(),
  })

  await ctx.reply("✅ Musiqa kanalingizga muvaffaqiyatli joylandi! 🎧")
} catch (error) {
  console.error("Musiqa joylash xatosi:", error)
  await ctx.reply(
    "❌ Musiqa joylanmadi. Bot kanalda administrator ekanini tekshiring."
  )
}



})


bot.on("message:text", async (ctx) => {
if (ctx.from?.id !== OWNER_ID) return
if (ctx.message.text.startsWith("/")) return


await ctx.reply(
  "🎵 Musiqa faylini yuboring, jo‘ra!\n" +
  "Men uni @ShunchakiMusiqaUz kanaliga joylayman."
)



})
}



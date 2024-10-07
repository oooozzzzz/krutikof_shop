const { createUser } = require("../db");

const { startMenu } = require("../menus/startMenu");

module.exports = async (ctx) => {
	await ctx.msg.delete();
	await ctx.reply("Добро пожаловать!")
	await ctx.replyWithPhoto("AgACAgIAAxkBAAM6Zvu5ionCDlaj3--pSpshy2GGsOsAAj_lMRu8AAHhS_VnbxKsKJj3AQADAgADcwADNgQ", {reply_markup: startMenu, caption: ctx.t("start")})
	await createUser(ctx.from.id, ctx.from.first_name);
};

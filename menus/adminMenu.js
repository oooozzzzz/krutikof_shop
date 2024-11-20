const { Menu } = require("@grammyjs/menu");

const adminMenu = new Menu("adminMenu")
	.text("Оповестить пользователей", async (ctx) => {
		ctx.msg.delete();
		await ctx.conversation.enter("notifyUsers");
	})
	.row()
	.text("Закрыть", async (ctx) => {
		await ctx.msg.delete();
	});
// .text("Добавить опрос", async (ctx) => {
// 	ctx.msg.delete()
// 	await ctx.conversation.enter("createPoll")
// })
// .row()
// .text("Добавить ссылку на свой магазин", async (ctx) => {
// 	ctx.msg.delete();
// 	await ctx.conversation.enter("setShopUrl");
// });

module.exports = { adminMenu };

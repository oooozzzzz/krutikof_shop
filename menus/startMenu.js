const { Menu } = require("@grammyjs/menu");
const { catalogMenu, catalogItemsMenus, categoryItemsMenus } = require("./catalogMenu");
const {
	instructionsMenu,
	instructionItemsMenus,
} = require("./instructionsMenu");
const { reviewsMenu, urlsMenu } = require("./reviewMenu");
const { reviewsPhoto } = require("../media/photos");

const startMenu = new Menu("startMenu")
	.text("🛍️ Ассортимент", async (ctx) => {
		ctx.menu.nav("catalogMenu");
		await ctx.msg.editCaption(ctx.t("catalog"));
	})
	.row()
	.text("✍️ Оставить отзыв", async (ctx) => {
		ctx.menu.nav("reviewsMenu");
		await ctx.msg.editMedia(reviewsPhoto)
    await ctx.msg.editCaption(ctx.t("reviews"));
	})
	.row()
	.text("📄 Инструкция", async (ctx) => {
		ctx.menu.nav("instructionsMenu");
		await ctx.msg.editCaption(ctx.t("instructions"));
	})
	.row()
	.text("🤔 Хочу задавать вопрос", async (ctx) => {
		// await ctx.msg.delete();
		await ctx.conversation.enter("askQuestion");
	});

startMenu.register([
	catalogMenu,
	instructionsMenu,
	reviewsMenu,
	urlsMenu,
	...catalogItemsMenus,
	...instructionItemsMenus,
	...categoryItemsMenus
]);

module.exports = { startMenu };

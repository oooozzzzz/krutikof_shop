const { Menu, MenuRange } = require("@grammyjs/menu");
const { instructionsVideos } = require("../media/videos");
const { InputMediaBuilder } = require("grammy");
const { startPhoto } = require("../media/photos");

const instructions = [
	{ name: "Товар 1", description: "описание 1", menu: "good1Instruction" },
	{ name: "Товар 2", description: "Описание 2", menu: "good2Instruction" },
	{ name: "Товар 3", description: "Описание 3", menu: "good3Instruction" },
	{ name: "Товар 4", description: "Описание 4", menu: "good4Instruction" },
	{ name: "Товар 5", description: "Описание 5", menu: "good5Instruction" },
	{ name: "Товар 6", description: "Описание 6", menu: "good6Instruction" },
	{ name: "Товар 7", description: "Описание 7", menu: "good7Instruction" },
	{ name: "Товар 8", description: "Описание 8", menu: "good8Instruction" },
];

const instructionsMenu = new Menu("instructionsMenu")
	.dynamic(() => {
		const range = new MenuRange();
		instructions.forEach((item, i) => {
			range.text(item.name, async (ctx) => {
				ctx.menu.nav(item.menu)
				await ctx.msg.editMedia(InputMediaBuilder.document(instructionsVideos[i].id, {caption: instructionsVideos[i].caption}));
			});
			i % 2 != 0 ? range.row() : null;
		});
		return range;
	})
	.row()
	.text("Назад", async (ctx) => {
		ctx.menu.nav("startMenu");
		await ctx.msg.editCaption(ctx.t("start"));
	});

const instructionsMenus = [
	{ url: "url 1", name: "good1Instruction" },
	{ url: "url 2", name: "good2Instruction" },
	{ url: "url 3", name: "good3Instruction" },
	{ url: "url 4", name: "good4Instruction" },
	{ url: "url 5", name: "good5Instruction" },
	{ url: "url 6", name: "good6Instruction" },
	{ url: "url 7", name: "good7Instruction" },
	{ url: "url 8", name: "good8Instruction" },
];

const instructionItemsMenus = instructionsMenus.map((item) => {
	const menu = new Menu(item.name);
	menu
		.text(item.url, async (ctx) => {
			ctx.reply(`Пользователь переходит по ссылке ${item.url}`);
		})
		.row()
		.text("Назад", async (ctx) => {
			ctx.menu.nav("instructionsMenu");
			await ctx.msg.editMedia(startPhoto);
			ctx.msg.editCaption(ctx.t("instructions"));
		});
	return menu;
});

module.exports = { instructionsMenu, instructionItemsMenus };

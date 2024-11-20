const { Menu, MenuRange } = require("@grammyjs/menu");
const { instructionsVideos } = require("../media/videos");
const { InputMediaBuilder } = require("grammy");
const { startPhoto } = require("../media/photos");

const instructions = [
	{ name: "Ночник Месяц", description: "описание 1", menu: "good1Instruction" },
	{ name: "Ночник Маяк", description: "Описание 2", menu: "good2Instruction" },
	{
		name: "Ночник Ретро Лампа",
		description: "Описание 3",
		menu: "good3Instruction",
	},
	{
		name: "Ночник Воздушный Шар",
		description: "Описание 4",
		menu: "good4Instruction",
	},
];

const instructionsMenu = new Menu("instructionsMenu")
	.dynamic(() => {
		const range = new MenuRange();
		instructions.forEach((item, i) => {
			range.text(item.name, async (ctx) => {
				ctx.menu.nav(item.menu);
				await ctx.msg.editMedia(
					InputMediaBuilder.video(instructionsVideos[i].id, {
						caption: instructionsVideos[i].caption,
					})
				);
			});
			range.row();
		});
		return range;
	})
	.row()
	.text("Назад", async (ctx) => {
		ctx.menu.nav("startMenu");
		await ctx.msg.editCaption(ctx.t("start"));
	});

const instructionsMenus = [
	{
		url: "https://www.wildberries.ru/catalog/264440359/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
		name: "good1Instruction",
	},
	{
		url: "https://www.wildberries.ru/catalog/264428748/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
		name: "good2Instruction",
	},
	{
		url: "https://www.wildberries.ru/catalog/264438700/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
		name: "good3Instruction",
	},
	{
		url: "https://www.wildberries.ru/catalog/264430744/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
		name: "good4Instruction",
	},
];

const instructionItemsMenus = instructionsMenus.map((item) => {
	const menu = new Menu(item.name);
	menu
		.url("Заказать", item.url)
		.row()
		.text("Назад", async (ctx) => {
			ctx.menu.nav("instructionsMenu");
			await ctx.msg.editMedia(startPhoto);
			ctx.msg.editCaption(ctx.t("instructions"));
		});
	return menu;
});

module.exports = { instructionsMenu, instructionItemsMenus };

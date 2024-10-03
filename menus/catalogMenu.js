const { Menu, MenuRange } = require("@grammyjs/menu");
const { goodsPhotos, startPhoto } = require("../media/photos");
const { InputMediaBuilder } = require("grammy");

const catalog = [
	{ name: "Товар 1", description: "Описание1", menu: "good1Menu" },
	{ name: "Товар 2", description: "Описание2", menu: "good2Menu" },
	{ name: "Товар 3", description: "Описание3", menu: "good3Menu" },
	{ name: "Товар 4", description: "Описание3", menu: "good4Menu" },
	{ name: "Товар 5", description: "Описание3", menu: "good5Menu" },
	{ name: "Товар 6", description: "Описание3", menu: "good6Menu" },
	{ name: "Товар 7", description: "Описание3", menu: "good7Menu" },
	{ name: "Товар 8", description: "Описание3", menu: "good8Menu" },
];

const catalogMenu = new Menu("catalogMenu")
	.dynamic(() => {
		const range = new MenuRange();
		catalog.forEach((item, i) => {
			range.text(item.name, async (ctx) => {
				ctx.menu.nav(item.menu);
				await ctx.msg.editMedia(
					InputMediaBuilder.photo(goodsPhotos[i].id, {
						caption: goodsPhotos[i].caption,
					})
				);
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

const goodsMenus = [
	{ url: "url 1", name: "good1Menu" },
	{ url: "url 2", name: "good2Menu" },
	{ url: "url 3", name: "good3Menu" },
	{ url: "url 4", name: "good4Menu" },
	{ url: "url 5", name: "good5Menu" },
	{ url: "url 6", name: "good6Menu" },
	{ url: "url 7", name: "good7Menu" },
	{ url: "url 8", name: "good8Menu" },
];

const catalogItemsMenus = goodsMenus.map((item) => {
	const menu = new Menu(item.name);
	menu
		.text(item.url, async (ctx) => {
			ctx.reply(`Пользователь переходит по ссылке ${item.url}`);
		})
		.row()
		.text("Назад", async (ctx) => {
			ctx.menu.nav("catalogMenu");
			await ctx.msg.editMedia(startPhoto);
			ctx.msg.editCaption(ctx.t("catalog"));
		});
	return menu;
});

module.exports = { catalogMenu, catalogItemsMenus };

const { MenuRange, Menu } = require("@grammyjs/menu");
const { startPhoto } = require("../media/photos");

const reviewsMenu = new Menu("reviewsMenu")
	.dynamic(() => {
		const range = new MenuRange();
		for (let i = 1; i < 6; i++) {
			if (i <= 3) {
				range.text(i, async (ctx) => {
					await ctx.conversation.enter("handleNegativeReview");
				});
			} else {
				range.text(i, async (ctx) => {
					try {
						ctx.menu.nav("catalogMenu");
					} catch (error) {}
					await ctx.msg.editCaption(
						"Пожалуйста, оставьте отзыв на наш товар на Wildberries!"
					);
				});
			}
			// range.text(i, async (ctx) => {
			// 	if (i <= 3) {
			// 		await ctx.conversation.enter("handleNegativeReview");
			// 	} else {
			// 		ctx.msg.editCaption(
			// 			"Пожалуйста, оставьте отзыв на наш товар на Wildberries!"
			// 		);
			// 		try {
			// 			ctx.menu.nav("catalogMenu");
			// 		} catch (error) {}
			// 	}
			// });
		}
		return range;
	})
	.row()
	.text("Назад", async (ctx) => {
		ctx.menu.nav("startMenu");
		await ctx.msg.editCaption(ctx.t("start"));
		await ctx.msg.editMedia(startPhoto);
	});

const urls = [
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 1" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 2" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 3" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 4" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 5" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 6" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 7" },
	{ url: "https://www.google.ru/?hl=ru", name: "Товар 8" },
];

const urlsMenu = new Menu("urlsMenu").dynamic(() => {
	const range = new MenuRange();
	urls.forEach((item, i) => {
		range.url(item.name, item.url);
		i % 2 != 0 ? range.row() : null;
	});
	return range;
});

module.exports = { reviewsMenu, urlsMenu };

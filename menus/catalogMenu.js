const { Menu, MenuRange } = require("@grammyjs/menu");
const { goodsPhotos, startPhoto } = require("../media/photos");
const { InputMediaBuilder } = require("grammy");

const catalog = [
	{
		name: "Вентиляторы",
		description:
			"Устали от жары летом и духоты? Выручит мини вентилятор Meilisoon. С ним вы ощутите свежесть и прилив сил в жаркую погоду. Портативный ручной вентилятор отличается низким уровнем шума, компактными размерами и легким весом. Помещается в женской сумочке или небольшом детском рюкзаке.",
		menu: "good1Menu",
	},
	{
		name: "Жилеты для собак",
		description:
			"Тёплый жилет для собак с молнией - незаменимая прогулочная одежда для вашего пушистого друга в зимнее или холодное весеннее и осеннее время года. Утепленная зимняя куртка в унисекс цвете имеет встроенную регулируемую шлейку для удобного крепления съемного поводка и комфорта животного, с легкостью заменит комбинезон и будет не заменимой вещью вашей собаки в холодное время года.",
		menu: "good2Menu",
	},
	{ name: "Новогодние товары", description: "Описание3", menu: "good3Menu" },
	{
		name: "Ночники",
		description:
			"Настольный ночник — это не только стильный, но и компактный прибор, который станет незаменимым помощником в любом доме. Его уникальный дизайн в виде месяца понравится вашему малышу. Он не только освещает темные уголки вашей спальни, но и создает атмосферу уюта в детской комнате, придавая интерьеру особый шарм.",
		menu: "good4Menu",
	},
];

const catalogMenu = new Menu("catalogMenu")
	.dynamic(() => {
		const range = new MenuRange();
		catalog.forEach((item, i) => {
			range.text(item.name, async (ctx) => {
				ctx.menu.nav(item.menu);
				if (item.menu === "good2Menu") {
					await ctx.msg.editMedia(
						InputMediaBuilder.photo(goodsPhotos[item.menu].id)
					);
				}
				// await ctx.msg.editMedia(
				// 	InputMediaBuilder.photo(goodsPhotos[i].id, {
				// 		caption: goodsPhotos[i].caption,
				// 	})
				// );
				await ctx.msg.editCaption(item.description);
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

const goodsMenus = [
	{
		url: [
			{ name: "Вентилятор с ушками", menu: "vent1" },
			{ name: "Вентилятор 3 скорости", menu: "vent2" },
			{ name: "Вентиляторы с увлажнителем", menu: "vent3" },
		],
		name: "good1Menu",
	},
	{
		url: [
			{
				url: "https://www.wildberries.ru/catalog/100985819/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
				name: "Жилет синий",
			},
			{
				url: "https://www.wildberries.ru/catalog/124525036/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
				name: "Жилет красный",
			},
			{
				url: "https://www.wildberries.ru/catalog/122600539/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
				name: "Жилет зеленый",
			},
		],
		name: "good2Menu",
	},
	{
		url: [
			{ name: "Мишура", menu: "ny1" },
			{ name: "Елки", menu: "ny2" },
		],
		name: "good3Menu",
		nextMenu: "item2Menu",
	},
	{
		url: [
			{ name: "Ночник месяц", menu: "lighter1" },
			{ name: "Ночник маяк", menu: "lighter2" },
			{ name: "Ночник воздушный шар", menu: "lighter3" },
			{ name: "Ночник ретро лампа", menu: "lighter4" },
		],
		name: "good4Menu",
	},
];

const catalogItemsMenus = goodsMenus.map((item) => {
	const menu = new Menu(item.name);
	if (item.name === "good2Menu") {
		menu.dynamic(() => {
			const range = new MenuRange();
			item.url.forEach((url, i) => {
				range.url(url.name, url.url);
				range.row();
			});
			return range;
		});
	} else {
		menu.dynamic(() => {
			const range = new MenuRange();
			item.url.forEach((url) => {
				range.text(url.name, async (ctx) => {
					ctx.menu.nav(url.menu);
					await ctx.msg.editMedia(
						InputMediaBuilder.photo(goodsPhotos[url.menu].id, {
							caption: goodsPhotos[url.menu].caption,
						})
					);
				});
				range.row();
			});
			return range;
		});
	}
	menu.row().text("Назад", async (ctx) => {
		ctx.menu.nav("catalogMenu");
		await ctx.msg.editMedia(
			InputMediaBuilder.photo(
				"AgACAgIAAxkBAAM6Zvu5ionCDlaj3--pSpshy2GGsOsAAj_lMRu8AAHhS_VnbxKsKJj3AQADAgADcwADNgQ"
			)
		);
		await ctx.msg.editCaption(ctx.t("catalog"));
	});
	return menu;
});

const categoryMenus = [
	{
		name: "vent1",
		back: "good1Menu",
		items: [
			{
				name: "Вентилятор Чёртик",
				url: "https://www.wildberries.ru/catalog/35723697/detail.aspx?targetUrl=EX&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: "Вентилятор Кошка",
				url: "https://www.wildberries.ru/catalog/57179682/detail.aspx?targetUrl=EX&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: "Вентилятор Оленёнок",
				url: "https://www.wildberries.ru/catalog/57179685/detail.aspx?targetUrl=EX&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: "Вентилятор Зайка",
				url: "https://www.wildberries.ru/catalog/35846391/detail.aspx?targetUrl=EX&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
		],
	},
	{
		name: "vent2",
		back: "good1Menu",
		items: [
			{
				name: "Вентилятор Розовый",
				url: "https://www.wildberries.ru/catalog/150576608/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: "Вентилятор Белый",
				url: "https://www.wildberries.ru/catalog/150576607/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: "Вентилятор Голубой",
				url: "https://www.wildberries.ru/catalog/150576610/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Вентилятор Фиолетовый",
				url: "https://www.wildberries.ru/catalog/150576609/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "vent3",
		back: "good1Menu",
		items: [
			{
				name: "Вентилятор Белый",
				url: "https://www.wildberries.ru/catalog/234106387/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Вентилятор Розовый",
				url: "https://www.wildberries.ru/catalog/234107117/detail.aspx?targetUrl=EX&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "ny1",
		back: "good3Menu",
		items: [
			{
				name: 'Гирлянда "Снежок" 10 см',
				url: "https://www.wildberries.ru/catalog/47948942/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: 'Гирлянда "Снежок" 7,5 см',
				url: "https://www.wildberries.ru/catalog/47944264/detail.aspx?targetUrl=SP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: 'Гирлянда "Мираж"',
				url: "https://www.wildberries.ru/catalog/178209587/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Гирлянда зеленая 2м",
				url: "https://www.wildberries.ru/catalog/49009072/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "ny2",
		back: "good3Menu",
		items: [
			{
				name: "Ёлки 40 см",
				url: "https://www.wildberries.ru/catalog/178209668/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ёлки 60 см",
				url: "https://www.wildberries.ru/catalog/258963240/detail.aspx?targetUrl=SP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "lighter1",
		back: "good4Menu",
		items: [
			{
				name: "Ночник зайка",
				url: "https://www.wildberries.ru/catalog/264440359/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник мишка",
				url: "https://www.wildberries.ru/catalog/264425978/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник панда",
				url: "https://www.wildberries.ru/catalog/264425975/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "lighter2",
		back: "good4Menu",
		items: [
			{
				name: "Ночник зайка",
				url: "https://www.wildberries.ru/catalog/264428748/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник панда",
				url: "https://www.wildberries.ru/catalog/264428749/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник кот",
				url: "https://www.wildberries.ru/catalog/264441246/detail.aspx?targetUrl=GP&utm_source=%D0%A2%D0%93+%D0%B1%D0%BE%D1%82&utm_medium=CPC&utm_campaign=267745-id-%D0%B1%D0%BE%D1%82++krutikof+shop",
			},
			{
				name: "Ночник мишка",
				url: "https://www.wildberries.ru/catalog/264443575/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "lighter3",
		back: "good4Menu",
		items: [
			{
				name: "Ночник фиолетовый",
				url: "https://www.wildberries.ru/catalog/264430744/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник розовый",
				url: "https://www.wildberries.ru/catalog/264430746/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник голубой",
				url: "https://www.wildberries.ru/catalog/264430747/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник зеленый",
				url: "https://www.wildberries.ru/catalog/264449316/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
	{
		name: "lighter4",
		back: "good4Menu",
		items: [
			{
				name: "Ночник белый",
				url: "https://www.wildberries.ru/catalog/264438700/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник зеленый",
				url: "https://www.wildberries.ru/catalog/264438702/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник фиолетовый",
				url: "https://www.wildberries.ru/catalog/264432816/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
			{
				name: "Ночник розовый",
				url: "https://www.wildberries.ru/catalog/264432817/detail.aspx?targetUrl=GP&utm_source=ТГ+бот&utm_medium=CPC&utm_campaign=267745-id-бот++krutikof+shop",
			},
		],
	},
];

const categoryItemsMenus = categoryMenus.map((item) => {
	const menu = new Menu(item.name);
	// if (item.name === "good2Menu") {
	menu.dynamic(() => {
		const range = new MenuRange();
		item.items.forEach((url, i) => {
			range.url(url.name, url.url);
			range.row();
		});
		return range;
	});
	// } else {
	// 	menu.dynamic(() => {
	// 		const range = new MenuRange();
	// 		item.url.forEach((url, i) => {
	// 			range.text(url.name, async (ctx) => {
	// 				// ctx.menu.nav(url.menu);
	// 				await ctx.msg.editMedia(
	// 					InputMediaBuilder.photo(
	// 						goodsPhotos[i].id
	// 						// 	{
	// 						// 	caption: goodsPhotos[i].caption,
	// 						// }
	// 					)
	// 				);
	// 				console.log(url.menu);
	// 			});
	// 			range.row();
	// 		});
	// 		return range;
	// 	});
	// }
	menu.row().text("Назад", async (ctx) => {
		ctx.menu.nav(item.back);
		await ctx.msg.editMedia(
			InputMediaBuilder.photo(
				"AgACAgIAAxkBAAM6Zvu5ionCDlaj3--pSpshy2GGsOsAAj_lMRu8AAHhS_VnbxKsKJj3AQADAgADcwADNgQ"
			)
		);
		await ctx.msg.editCaption(ctx.t("catalog"));
	});
	return menu;
});

module.exports = { catalogMenu, catalogItemsMenus, categoryItemsMenus };

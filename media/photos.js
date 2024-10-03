const { InputMediaBuilder } = require("grammy");

const goodsPhotos = [
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 1",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 2",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 3",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 4",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 5",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 6",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 7",
	},
	{
		id: "AgACAgIAAxkBAANAZvu7ETVXuDbRJfS7fknHHxu2HikAAl3lMRu8AAHhS9lDFt6iFugHAQADAgADcwADNgQ",
		caption: "Описание 8",
	},
];

const startPhoto = InputMediaBuilder.photo(
	"AgACAgIAAxkBAAM6Zvu5ionCDlaj3--pSpshy2GGsOsAAj_lMRu8AAHhS_VnbxKsKJj3AQADAgADcwADNgQ"
);

const reviewsPhoto = InputMediaBuilder.photo(
	"AgACAgIAAxkBAAPtZv5G8LHHAR2zLe82WLfC10t4viUAAgLpMRt5h_BL3SNBXlrUvRYBAAMCAANzAAM2BA"
);

module.exports = { goodsPhotos, startPhoto, reviewsPhoto };

const { InlineKeyboard } = require("grammy");

const toMainMenuKeyboard = () => {

	const menu = new InlineKeyboard()
		.text("Продолжить работу с ботом", "toMenu");
	return menu;
};
module.exports = { toMainMenuKeyboard };

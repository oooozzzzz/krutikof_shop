const { InlineKeyboard } = require("grammy");

const generateAnswerKeyboard = (id) => {
	const answerKeyboard = new InlineKeyboard().text(
		"Ответить пользователю",
		`question-${id}`
	);
	return answerKeyboard
}

module.exports = { generateAnswerKeyboard };
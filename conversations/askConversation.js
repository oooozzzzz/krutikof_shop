const { generateAnswerKeyboard } = require("../keyboards/answerKeyboard");
const { cancelKeyboard } = require("../keyboards/cancelKeyboard");
const { toMainMenuKeyboard } = require("../keyboards/toMainMenuKeyboard");

const askQuestion = async (conversation, ctx) => {
	const beginning = await ctx.reply(
		"Введите Ваш вопрос, я сразу же передам его администратору",
		{
			reply_markup: cancelKeyboard,
		},
	);
	const questionCtx = await conversation.wait();
	const question = questionCtx.message?.text;
	if (!question) {
		questionCtx.msg.delete();
		return ctx.reply("Операция отменена", {
			reply_markup: toMainMenuKeyboard(),
		});
	}
	// console.log(beginning)
	await ctx.api.deleteMessage(beginning.chat.id, beginning.message_id);
	await ctx.api.sendMessage(
		-1002495927191,
		`Вопрос от @${questionCtx.from.username}\n\n${question}`,
		{ reply_markup: generateAnswerKeyboard(questionCtx.from.id) },
	);
	await ctx.reply("Ваш вопрос передан в службу заботы покупателей!", {
		reply_markup: toMainMenuKeyboard(),
	});
};

module.exports = { askQuestion };

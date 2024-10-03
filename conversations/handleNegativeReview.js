const { addComment } = require("../db");
const { generateAnswerKeyboard } = require("../keyboards/answerKeyboard");
const { toMainMenuKeyboard } = require("../keyboards/toMainMenuKeyboard");

const handleNegativeReview = async (conversation, ctx) => {
	// const isPositive = false;
	const beginning = await ctx.reply("Что Вы хотели бы улучшить?");
	const reviewCtx = await conversation.wait();
	const comment = reviewCtx.message?.text;
	// await addComment({ id: ctx.from.id, comment, isPositive });
	await ctx.api.deleteMessage(beginning.chat.id, beginning.message_id)
	await ctx.api.sendMessage(762569950, `Негативный отзыв от @${reviewCtx.from.username}\n\n${comment}`, {reply_markup: generateAnswerKeyboard(reviewCtx.from.id)});
	await ctx.reply("Ваш отзыв передан администратору!", {
		reply_markup: toMainMenuKeyboard(),
	});
	// try {
	// 	ctx.reply(
	// 		`Спасибо за отзыв! Обратная связь помогает нам становиться лучше! \nВаш отзыв направлен администратору.`,
	// 		{ reply_markup: toMainMenuKeyboard() }
	// 	);
	// } catch (error) {}
	return;
};

module.exports = { handleNegativeReview };
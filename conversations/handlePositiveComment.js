const { addComment } = require("../db");
const { toMainMenuKeyboard } = require("../keyboards/toMainMenuKeyboard");

const handlePositiveReview = async (conversation, ctx) => {
	const isPositive = true;
	await ctx.reply("Что Вам особенно понравилось?");
	const reviewCtx = await conversation.wait();
	const comment = reviewCtx.message?.text;
	await addComment({ id: ctx.from.id, comment, isPositive });
	try {
		ctx.reply(
			`Спасибо за отзыв! Обратная связь помогает нам становиться лучше!
Твой промокод: #ПРОМОКОД`,
			{ reply_markup: toMainMenuKeyboard() }
		);
	} catch (error) {}
	return;
};

module.exports = { handlePositiveReview };

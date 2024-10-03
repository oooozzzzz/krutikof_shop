const { InlineKeyboard } = require("grammy");
const { getAllUsers } = require("./db");
const { toAdminMenuKeyboard } = require("./keyboards/toAdminMenuKeyboard");

module.exports.deleteNow = async (ctx) => {
	try {
		await ctx.msg.delete();
	} catch (error) {
		console.error(`Error deleting message: ${error.message}`);
	}
};

module.exports.deleteAfter = async (ctx, seconds) => {
	setTimeout(() => {
		ctx.msg.delete();
	}, seconds * 1000);
};

module.exports.copyMessageToUsers = async (ctx) => {
	const usersList = await getAllUsers();
	function delay(ms) {
		return new Promise((resolve) => setTimeout(resolve, ms));
	}
	const send = async (id) => {
		await delay(500);
		try {
			await ctx.message.copy(id);
			return true;
		} catch (error) {
			return false;
		}
	};

	const processUsersList = async (usersList) => {
		let success = 0;
		let failure = 0;
		let atAll = 0;
		for (let user in usersList) {
			const res = await send(usersList[user].tg_id);
			res ? success++ : failure++;
			atAll++;
		}
		return { success, failure, atAll };
	};
	const { success, failure, atAll } = await processUsersList(usersList);
	await ctx.reply(
		`Всего отправлено сообщений пользователям: ${atAll}
Успешно: ${success}, с ошибками: ${failure}.`,
		{ reply_markup: toAdminMenuKeyboard }
	);
};

module.exports.toPref = (ctx) => {
	const query = ctx.callbackQuery.data;
	const index = query.match(/-/).index;
	const preference = query.slice(index + 1);
	const action = query.slice(0, index);
	return { preference, action };
};

module.exports.answersToKeyboard = (answers) => {
	answers = answers.split(", ");
	const labelDataPairs = answers.map((answer) => {
		return [answer, `pref-${answer}`];
	});
	console.log(labelDataPairs);
	const buttonRow = labelDataPairs.map(([label, data]) =>
		InlineKeyboard.text(label, data)
	);
	const keyboard = InlineKeyboard.from([buttonRow]);
	return keyboard;
};

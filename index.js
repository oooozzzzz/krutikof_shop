const { bot } = require("./bot");
const startHandler = require("./handlers/startHandler");
const adminHandler = require("./handlers/adminHandler");
const { toMainMenu, toAdminMenu, toOwnerMenu } = require("./routes");
const ownerHandler = require("./handlers/ownerHandler");
const { toPref } = require("./services");
const { votePollHandler } = require("./handlers/votePollHandler");
const { GrammyError, HttpError } = require("grammy");
const { questionHandler } = require("./handlers/questionsHandler");
const { getAllUsers, getAllUsersInfo, getUsersCount } = require("./db");

bot.command("start", (ctx) => startHandler(ctx));
// bot.command("language", (ctx) => languageHandler(ctx));

bot.command("chat_id", (ctx) => ctx.reply(ctx.chat.id));

bot.callbackQuery("toMenu", async (ctx) => {
	toMainMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toAdminMenu", async (ctx) => {
	toAdminMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("toOwnerMenu", async (ctx) => {
	toOwnerMenu(ctx);
	ctx.answerCallbackQuery();
});
bot.callbackQuery("ok", async (ctx) => {
	ctx.answerCallbackQuery();
});
bot.command("users", async (ctx) => {
	const users = await getAllUsersInfo();
	const usersCount = await getUsersCount();
	await ctx.reply(
		`Всего пользователей: ${usersCount}\n\n${users
			.map((user) => user.first_name)
			.join(", ")}`,
	);
});
bot.callbackQuery("cancel", async (ctx) => {
	try {
		ctx.msg.delete();
	} catch (error) {}
	ctx.conversation.exit();
	ctx.answerCallbackQuery();
});
bot.on(":video", async (ctx) => {
	await ctx.reply("video  " + ctx.msg.video.file_id, {
		reply_parameters: { message_id: ctx.msg.message_id },
	});
});
bot.on(":photo", async (ctx) => {
	await ctx.reply(ctx.msg.photo[0]?.file_id, {
		reply_parameters: { message_id: ctx.msg.message_id },
	});
});

bot.on(":document", async (ctx) => {
	console.log(ctx.msg.document);
	await ctx.reply("document  " + ctx.msg.document?.file_id, {
		reply_parameters: { message_id: ctx.msg.message_id },
	});
});

bot.on("message", async (ctx) => {
	await adminHandler(ctx);
	await ownerHandler(ctx);
});

bot.callbackQuery(/-/, async (ctx) => {
	// Взаимодействие с категориями
	// try {
	// 	await ctx.msg.delete();
	// } catch (error) {}

	const { preference, action } = toPref(ctx);
	switch (action) {
		case "pref":
			try {
				votePollHandler(ctx, preference);
			} catch (error) {}
			break;
		case "question":
			ctx.session.userId = preference;
			await questionHandler(ctx);
			break;
		default:
			break;
	}
	ctx.answerCallbackQuery();
});

bot.catch((err) => {
	const ctx = err.ctx;
	console.log(`Error while handling update ${ctx.update.update_id}:`);
	const e = err.error;
	if (e instanceof GrammyError) {
		console.log("Error in request:", e.description);
	} else if (e instanceof HttpError) {
		console.log("Could not contact Telegram:", e);
	} else {
		console.log("Unknown error:", e);
	}
	bot.start();
});

bot.start();

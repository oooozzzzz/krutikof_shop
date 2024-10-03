const { InputMediaBuilder } = require("grammy")

const freestyleShowMedia = () => {
	const video1 = InputMediaBuilder.video('BAACAgIAAxkBAAIBimbW9SVSx9aTtKmPaIfFir3IgNi9AAIzWwAC9eq4Spq_wH5Atg1JNQQ')
	const video2 = InputMediaBuilder.video('BAACAgIAAxkBAAIBi2bW9XsxgtIwDsBQGCa8ykuUAAEaMwACN1sAAvXquEoIGqcZqYq9iDUE')
	const video3 = InputMediaBuilder.video('BAACAgIAAxkBAAIBjGbW9Y10rGmC8C35EQABIP4ur7P93AACPVsAAvXquEoeY_OwsNC22TUE')
	const video4 = InputMediaBuilder.video('BAACAgIAAxkBAAIBjWbW9Z0ho5QZslGjR4p7MvhDZPs9AAJAWwAC9eq4SgTcfxbrpdm5NQQ')
	console.log(video1)
	return [video1, video2, video3, video4]
}

module.exports = {freestyleShowMedia}
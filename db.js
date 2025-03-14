const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

module.exports.createUser = async (tg_id, name) => {
	const id = tg_id.toString();
	try {
		await prisma.user.create({
			data: {
				tg_id: id,
				first_name: name,
			},
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.makeAdmin = async (id) => {
	id = id.toString();
	await prisma.user.update({ where: { tg_id: id }, data: { isAdmin: true } });
};

module.exports.addComment = async ({ id, comment, isPositive }) => {
	id = id.toString();
	try {
		await prisma.user.update({
			where: { tg_id: id },
			data: {
				comments: {
					create: {
						content: comment,
						isPositive,
						tg_id: id,
					},
				},
			},
		});
	} catch (error) {}
};

module.exports.getAllUsers = async () => {
	try {
		const users = await prisma.user.findMany({ select: { tg_id: true } });
		return users;
	} catch (error) {
		return false;
	}
};

module.exports.addPreference = async ({ preference, tg_id }) => {
	tg_id = tg_id.toString();
	try {
		await prisma.user.update({
			where: { tg_id: tg_id },
			data: { preferences: { create: { value: preference } } },
		});
		return true;
	} catch (error) {
		return false;
	}
};

module.exports.getOwnerPassword = async () => {
	try {
		const password = await prisma.password.findUnique({
			where: { label: "owner" },
			select: { value: true },
		});
		return password.value;
	} catch (error) {
		return false;
	}
};

module.exports.setPassrword = async (label, value) => {
	try {
		await prisma.password.update({ where: { label }, data: { value } });
	} catch (error) {
		return false;
	}
};

module.exports.getAdminPassword = async () => {
	try {
		const password = await prisma.password.findUnique({
			where: { label: "admin" },
			select: { value: true },
		});
		return password.value;
	} catch (error) {
		console.log(error);
		return false;
	}
};

module.exports.getAllUsersInfo = async () => {
	try {
		const users = await prisma.user.findMany();
		return users;
	} catch (error) {
		return false;
	}
};

module.exports.getUsersCount = async () => {
	try {
		const users = await prisma.user.count();
		return users;
	} catch (error) {
		return false;
	}
};

const db = require("../../data/db-config");

async function getAll() {
  const result = await db("accounts");
  return result;
}

const getById = async (id) => {
  const result = await db("accounts").where("id", id).first();
  return result;
};

const create = async (account) => {
  const [id] = await db("accounts").insert(account).returning("id");
  return getById(id);
};

const updateById = async (id, account) => {
  await db("accounts").where("id", id).update(account);
  return getById(id);
};

const deleteById = async (id) => {
  await db("accounts").where("id", id).del();
  return;
};

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};

const db = require("../../data/db-config");

// const yup = require("yup");

// const accountSchema = yup.object({
//   name: yup
//     .string()
//     .trim()
//     .min(3, 'name of account must be between 3 and 100')
//     .max(100, 'name of account must be between 3 and 100')
//     .required("name and budget are required 1"),
//   budget: yup
//     .number()
//     .typeError("budget of account must be a number")
//     .positive("budget of account is too large or too small")
//     .max(1000000, "budget of account is too large or too small")
//     .required("name and budget are required"),
// });

// exports.checkAccountPayload = async (req, res, next) => {
//   try {
//     await accountSchema.validate(req.body);
//     next();
//   } catch (error) {
//     return res.status(400).json({ message: error.message });
//   }
// };

exports.checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;

  if (name === undefined || budget === undefined) {
    return res.status(400).json({ message: "name and budget are required" });
  }

  const trimmedName = name.trim();
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return res
      .status(400)
      .json({ message: "name of account must be between 3 and 100" });
  }

  const budgetNumber = parseFloat(budget);
  if (isNaN(budgetNumber)) {
    return res
      .status(400)
      .json({ message: "budget of account must be a number" });
  }

  if (budgetNumber < 0 || budgetNumber > 1000000) {
    return res
      .status(400)
      .json({ message: "budget of account is too large or too small" });
  }

  next();
};

exports.checkAccountId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const account = await db("accounts").where({ id }).first();
    if (!account) {
      return res.status(404).json({ message: "account not found" });
    }
    req.account = account;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking account ID" });
  }
};

exports.checkAccountNameUnique = async (req, res, next) => {
  const { name } = req.body;
  try {
    const existingAccount = await db("accounts")
      .where("name", name.trim())
      .first();
    if (existingAccount) {
      return res.status(400).json({ message: "that name is taken" });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: "Error checking account name" });
  }
};

import IncomeModel from "../schema/Income.js";

export const addIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const incomeObj = { userId, ...req.body };

    const newIncome = await IncomeModel.create(incomeObj);

    return res.status(201).json({
      message: "Income record successfully added.",
      data: newIncome,
    });
  } catch (error) {
    console.error("Error adding income:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getIncome = async (req, res) => {
  try {
    // console.log(req.user);
    const userId = req.user._id;
    // console.log(userId);
    const incomes = await IncomeModel.find({ userId }).sort({ date: -1 });
    return res
      .status(200)
      .json({ message: "Income records fetched.", data: incomes });
  } catch (error) {
    console.error("Error retrieving income:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteIncome = async (req, res) => {
  try {
    const deleted = await IncomeModel.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Income not found." });
    return res.status(200).json({ message: "Income deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

import ExpenseModel from "../schema/Expense.js";
export const addExpense = async (req, res) => {
  try {
    const userId = req.user;
    const expenseObj = { userId, ...req.body };

    const newExpense = await ExpenseModel.create(expenseObj);
    return res.status(201).json({
      message: "Expense record successfully added.",
      data: newExpense,
    });
  } catch (error) {
    console.error("Error adding expense:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const getExpense = async (req, res) => {
  try {
    const userId = req.user;
    const expenses = await ExpenseModel.find({ userId }).sort({ date: -1 });
    return res.status(200).json({
      message: "Expense records fetched.",
      data: expenses,
    });
  } catch (error) {
    console.error("Error retrieving expense:", error.message);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const deleteExpense = async (req, res) => {
  try {
    const deleted = await ExpenseModel.findByIdAndDelete(req.params.id);
    if (!deleted)
      return res.status(404).json({ message: "Expense not found." });
    return res.status(200).json({ message: "Expense deleted successfully." });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error." });
  }
};

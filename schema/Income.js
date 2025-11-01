import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    userId: {
        type: String
    },
    category: {
        type: String,
        required: true,
        maxLength: 50
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    date: {
        default: Date.now(),
        type: Date,
    },

}, { timestamps: true });

const IncomeModel = mongoose.model("Income", incomeSchema);

export default IncomeModel;

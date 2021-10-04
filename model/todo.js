const mongoose = require("mongoose");
const validator = require("validator");

const TodoSchema = mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
});
const Todo = mongoose.model("Todo", TodoSchema);
module.exports = Todo;
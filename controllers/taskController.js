const Task = require('../models/taskModels')
const Cookies = require('cookie-parser')
const jwt = require('jsonwebtoken');

//CREATE TASK 
exports.addTask = async (req, res) => {
    const { token } = req.cookies;
    const decodedData = jwt.verify(
        token,
        '4c237a2c708361e111344ddb246f813130f1cf5b06f73c6766e472a561aaaeb7',
    )
    const createTask = new Task({
        task: req.body.task,
        user_id:decodedData.id
    });

    try {
        const newTask = await createTask.save();
        res.status(201).json(newTask);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// GET ALL TASKS
exports.getTask = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedData = jwt.verify(
            token,
            '4c237a2c708361e111344ddb246f813130f1cf5b06f73c6766e472a561aaaeb7',
        )
        const user_id = decodedData.id

        const getAllTask = await Task.find( { user_id } ).sort({ updatedAt: -1 });
        res.json(getAllTask);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// DELETE ALL TASKS
exports.deleteAllTasks = async (req, res) => {
    try {
        const result = await Task.deleteMany({});
        res.status(200).json({ message: " All tasks deleted ", deletedCount: result.deletedCount })
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//UPDATE BY ID
exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { task } = req.body;

    try {
        const updatedTask = await Task.findByIdAndUpdate(
            id,
            {
                task,
                updatedAt: Date.now()
            },
            { new: true, runValidators: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE BY ID
exports.deleteTaskByID = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

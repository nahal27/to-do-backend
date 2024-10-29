const Task = require('../models/taskModels')

//CREATE TASK 
exports.addTask = async (req, res) => {
    const createTask = new Task({
        task: req.body.task
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
        const getAllTask = await Task.find().sort({ updatedAt: -1 });
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

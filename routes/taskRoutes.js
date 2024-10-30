const express = require('express');
const router =express.Router();
const taskController = require('../controllers/taskController')
const authController = require('../controllers/authController')

//tasks routes
router.post('/addTask',taskController.addTask);
router.get('/getTasks',taskController.getTask);
router.delete('/deleteAllTasks',taskController.deleteAllTasks);
router.put('/updateTask/:id',taskController.updateTask);
router.delete('/deleteTaskByID/:id',taskController.deleteTaskByID);

//auth routes
router.post('/signup', authController.signUp);
router.post('/login', authController.login);


module.exports = router;
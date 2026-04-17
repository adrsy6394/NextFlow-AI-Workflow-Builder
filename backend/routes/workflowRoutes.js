const express = require('express');
const router = express.Router();
const workflowController = require('../controllers/workflowController');

router.post('/save', workflowController.saveWorkflow);
router.get('/history', workflowController.getWorkflows);

module.exports = router;

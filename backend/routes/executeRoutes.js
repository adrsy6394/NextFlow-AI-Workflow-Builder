const express = require('express');
const router = express.Router();
const workflowJob = require('../jobs/workflowJob');

router.post('/start', (req, res) => {
  try {
    const { nodes, edges } = req.body;
    if (!nodes || !edges) return res.status(400).json({ error: 'Missing workflow data' });

    const jobId = workflowJob.startJob(nodes, edges);
    res.json({ success: true, jobId });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/status/:jobId', (req, res) => {
  const status = workflowJob.getJobStatus(req.params.jobId);
  if (!status) return res.status(404).json({ error: 'Job not found' });
  
  res.json({ success: true, data: status });
});

module.exports = router;

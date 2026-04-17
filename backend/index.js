const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { requireAuth } = require('./middleware/authMiddleware');

const workflowRoutes = require('./routes/workflowRoutes');
const aiRoutes = require('./routes/aiRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workflow', requireAuth, workflowRoutes);
app.use('/api/ai', requireAuth, aiRoutes);
app.use('/api/upload', requireAuth, require('./routes/uploadRoutes'));
app.use('/api/execute', require('./routes/executeRoutes')); // Public mapping for execution jobs (can add requireAuth if constrained)

// app.use('/api/auth', require('./routes/authRoutes'));

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'NextFlow API is running properly.' });
});

// Start Server
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
}
module.exports = app;

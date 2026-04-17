const aiService = require('../services/aiService');

exports.runNode = async (req, res) => {
  try {
    const { systemPrompt, userPrompt, model } = req.body;
    
    // Text Prompt formatting
    const finalSystemPrompt = systemPrompt ? String(systemPrompt).trim() : "";
    const finalUserPrompt = userPrompt ? String(userPrompt).trim() : "";
    
    if (!finalUserPrompt) {
      return res.status(400).json({ error: "User prompt is required." });
    }

    const aiResponse = await aiService.runLLM(finalSystemPrompt, finalUserPrompt, model);
    
    res.status(200).json({ success: true, output: aiResponse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "AI execution failed" });
  }
};

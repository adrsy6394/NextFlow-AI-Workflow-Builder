exports.runLLM = async (systemPrompt, userPrompt, model, imageUrl = null) => {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("Missing OpenRouter API Key");

  // Map model name
  let mappedModel = "google/gemini-2.0-flash-001";
  if (model === "claude-3") mappedModel = "anthropic/claude-3-haiku";
  if (model === "gemini-flash") mappedModel = "google/gemini-2.0-flash-001";

  const executeFetch = async (modelStr) => {
    let finalUserContent = userPrompt || "";
    
    // Multimodal Vision Format
    if (imageUrl) {
      if (imageUrl.match(/\.(mp4|webm|mov|avi|mkv)$/i)) {
         throw new Error("Video formatting is not supported directly by OpenRouter Vision APIs yet. Please connect an Image Node instead.");
      }

      finalUserContent = [
        { type: "text", text: userPrompt || "Please analyze this image based on my system instructions." },
        { type: "image_url", image_url: { url: imageUrl } }
      ];
    }

    return await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: modelStr,
        messages: [
          { role: "system", content: systemPrompt || "You are a helpful assistant." },
          { role: "user", content: finalUserContent }
        ]
      })
    });
  };

  let response = await executeFetch(mappedModel);

  // Automatic Model Fallback for Google/Gemini endpoints which fluctuate wildly on OpenRouter limits
  if (!response.ok && model === "gemini-flash") {
     console.warn("Primary Gemini route failed, cascading to Gemma 2 9B Free...");
     response = await executeFetch("google/gemma-2-9b-it:free");
     
     if (!response.ok) {
       console.warn("Gemma route failed, cascading to Google Gemini Pro 1.5...");
       response = await executeFetch("google/gemini-pro-1.5");
     }
  }

  if (!response.ok) {
    let errorMsg = "Failed to fetch from OpenRouter";
    try {
      const errorData = await response.json();
      console.error("OpenRouter Error:", errorData);
      errorMsg = errorData?.error?.message || JSON.stringify(errorData);
    } catch (e) {
      console.error("OpenRouter Text Parse Error");
    }
    throw new Error(`OpenRouter Error: ${errorMsg}`);
  }

  const data = await response.json();
  return data.choices[0].message.content;
};

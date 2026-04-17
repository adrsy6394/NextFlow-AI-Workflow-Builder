const mediaService = require('../services/mediaService');
const pdfParse = require('pdf-parse');

exports.uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file provided" });
    }

    // Optional PDF Text Extraction Native Parsing
    let extractedText = null;
    if (req.file.mimetype === 'application/pdf') {
       try {
         const pdfData = await pdfParse(req.file.buffer);
         extractedText = pdfData.text;
       } catch (err) {
         console.warn("Failed to parse PDF text automatically", err);
       }
    }

    // Determine explicitly if video or auto scale (image etc)
    let resourceType = 'auto';
    if (req.file.mimetype.startsWith('video/')) {
        resourceType = 'video';
    } else if (req.file.mimetype === 'application/pdf') {
        resourceType = 'raw';
    }

    // Upload using buffer to Cloudinary
    let url = "";
    try {
        url = await mediaService.uploadMedia(req.file.buffer, resourceType);
    } catch (uploadErr) {
        console.warn("Cloudinary upload failed, but parsing might have succeeded.", uploadErr);
        url = "local_memory_pdf"; // Fallback identifier so frontend continues processing extracted text
    }

    res.status(200).json({ success: true, url, text: extractedText });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "File upload failed" });
  }
};

const express = require('express');
const cors = require('cors');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Helper to cleanup
const cleanup = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error('Error deleting file:', err);
  });
};

app.get('/', (req, res) => {
  res.send('PixEdit API v1.0 - Active');
});

// Heavy processing endpoint (Fallback for massive files or specific complex ops)
app.post('/process', upload.single('image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image provided' });
  }

  const { width, height, format = 'jpeg', quality = 80, rotation = 0 } = req.body;
  
  try {
    let pipeline = sharp(req.file.path);

    if (rotation) {
      pipeline = pipeline.rotate(parseInt(rotation));
    }

    if (width || height) {
      pipeline = pipeline.resize(
        width ? parseInt(width) : null, 
        height ? parseInt(height) : null,
        { fit: 'inside' }
      );
    }

    pipeline = pipeline.toFormat(format, { quality: parseInt(quality) });

    const outputBuffer = await pipeline.toBuffer();

    res.set('Content-Type', `image/${format}`);
    res.send(outputBuffer);

  } catch (err) {
    console.error('Processing error:', err);
    res.status(500).json({ error: 'Image processing failed' });
  } finally {
    // Always cleanup temp upload
    cleanup(req.file.path);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

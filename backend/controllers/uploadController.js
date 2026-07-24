const cloudinary = require('../config/cloudinary');

const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const buffer = req.file.buffer.toString('base64');
    const dataUri = `data:${req.file.mimetype};base64,${buffer}`;

    const uploadResult = await cloudinary.uploader.upload(dataUri, {
      folder: 'ai-resume-builder/profiles',
      transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
    });

    res.json({
      url: uploadResult.secure_url,
      publicId: uploadResult.public_id,
    });
  } catch (error) {
    res.status(500).json({ message: 'Image upload failed', error: error.message });
  }
};

module.exports = { uploadProfileImage };

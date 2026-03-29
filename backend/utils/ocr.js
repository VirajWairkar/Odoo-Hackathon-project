const Tesseract = require('tesseract.js');

exports.scanReceipt = async (imagePath) => {
  const result = await Tesseract.recognize(imagePath, 'eng');
  return result.data.text;
};
const mongoose = require('mongoose');
const User = require('./models/User');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path'); // Import path module
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

const generateResumePDF = (user) => {
  return new Promise((resolve, reject) => {
    try {
      // Create temp-storage directory if it doesn't exist
      const storageDir = path.join(__dirname, 'temp-storage');
      if (!fs.existsSync(storageDir)) {
        fs.mkdirSync(storageDir);
      }
      
      const doc = new PDFDocument();
      // Use UUID consistently
      const filePath = path.join(storageDir, `${user.id}_resume.pdf`);
      const stream = fs.createWriteStream(filePath);

      // Pipe the PDF document to the write stream
      doc.pipe(stream);

      doc.fontSize(20).text(user.name, { align: 'center' });
      doc.fontSize(12).text(`${user.email} `, { align: 'center' });
      doc.moveDown();

      // About Section
      doc.fontSize(14).text('About', { underline: true });
      doc.fontSize(12).text(user.about);
      doc.moveDown();
      doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
      doc.moveDown();

      // Education Section
      doc.fontSize(14).text('Education', { underline: true });
      user.education.split(',').forEach(edu => {
        doc.fontSize(12).text(edu.trim());
      });
      doc.moveDown();
      doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
      doc.moveDown();

      // Skills Section
      doc.fontSize(14).text('Skills', { underline: true });
      user.skills.split(',').forEach(skill => {
        doc.fontSize(12).text(skill.trim());
      });
      doc.moveDown();
      doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
      doc.moveDown();

      // Projects Section
      doc.fontSize(14).text('Projects', { underline: true });
      user.projects.split(',').forEach(project => {
        doc.fontSize(12).text(project.trim());
      });
      doc.moveDown();
      doc.moveTo(doc.page.margins.left, doc.y).lineTo(doc.page.width - doc.page.margins.right, doc.y).stroke();
      doc.moveDown();

      // Social Media Section
      doc.fontSize(14).text('Social Media', { underline: true });
      doc.fontSize(12).text(`Instagram: ${user.instagram}`);
      doc.fontSize(12).text(`LinkedIn: ${user.linkedin}`);
      doc.fontSize(12).text(`GitHub: ${user.github}`);

      doc.end();

      stream.on('finish', () => {
        console.log(`Resume PDF generated at ${filePath}`);
        resolve();
      });

      stream.on('error', (err) => {
        console.error('Error writing PDF:', err);
        reject(err);
      });
    } catch (error) {
      console.error('Error generating PDF:', error);
      reject(error);
    }
  });
};

module.exports = {
  generateResumePDF
};

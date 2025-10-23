const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name:"dh3kzbrfs",
  api_key:"233933452417181",
  api_secret: "x3s54HklAQt0ELPT991QQO1eK04",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bharatskill-connect',
    allowed_formats: ['jpeg', 'png', 'jpg', 'mp4', 'mov'],
  },
});

const upload = multer({ storage: storage });

module.exports = { cloudinary, upload };
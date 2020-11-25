const multer = require("multer");
const path = require("path");
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key : process.env.CLOUDINARY_API_KEY,
  api_secret : process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: async (req,file) =>{
      return "files"
    },
    public_id: async (req, file) =>{
      return await Date.now().toString();
    }
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg' || file.mimetype == 'image/png' || file.mimetype == 'audio/mpeg' || file.mimetype == 'audio/mp4') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const fileUploader = multer({ storage: storage, fileFilter: fileFilter });


const UploadSingleFile = async (req,res)=>{
    const uploadSingle = fileUploader.single("file");
    uploadSingle(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).json({
          status : false,
          message: "File upload failed.",
          image: []
        });
      }
      console.log(req.file);
      return res.status(200).json({
        status : true,
        message : "File uploaded successfully",
        fileURL : req.file.path,
        fileId :  req.file.filename.slice(-13)
      })
    });
}

const UploadMultipleFiles = async (req,res)=>{
  const uploadMultipleFiles = fileUploader.array("files");
  uploadMultipleFiles(req, res, async (err) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        status : false,
        message: "Files upload failed.",
        url : []
      });
    }
    console.log(req.files);
    const files = req.files.map(file => {
      return { 
        "fileURL": file.path,
        "fileId": file.filename.slice(-13)
      }
    });

    return res.status(200).json({
      status : true,
      message : "Files uploaded successfully",
      files : files
    })
  });
}

module.exports = {
  fileUploader,
  cloudinary,
  UploadSingleFile,
  UploadMultipleFiles
}
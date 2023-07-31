import AWS from "aws-sdk"
import withProtect from '../../middleware/auth.js'
import dbConnect from '../../utils/dbConnect'
import UserModal from '../../models/user.js'
import mongoose from 'mongoose';

const { S3Client } = require('@aws-sdk/client-s3');
const multer = require('multer');
const multerS3 = require('multer-s3');


 
let s3 = new S3Client({
    region: "us-east-1",
    credentials: {
        accessKeyId:'AKIAQZTISBXDP35ZF6WW',
        //secretAccessKey: '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',
        secretAccessKey: '7bn2LWz/EsNMfSeIgnYIbPUyWzpIH6O6bnvoGLWF',
    },
    sslEnabled: false,
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
  });

const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'nilarkudai',
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, Date.now().toString()+file.originalname)
      }
    })
  })
  export const config = {
    api: {
      bodyParser: false
    }
  }
  const singleUpload = upload.single('image')





const handler = async (req, res) => {
   

try{

  await dbConnect();
  if (req.method !== "POST")
  return res.status(405).json({ message: 'Method not allowed' })

try {
    singleUpload(req, res, async(err, some) =>{
      console.log("request data : ", req.file)
        if (err) {
          return res.status(422).send({errors: [{title: 'Image Upload Error', detail: err.message}] });
        }
    const id = mongoose.Types.ObjectId(req.userId)
        
        await UserModal.findByIdAndUpdate(id, {profilepicurl:req.file.location}, { new: true });
    
        return res.json({'imageUrl': req.file.location});
      });
}
catch(err){
    console.log(err)
    res.status(400).json({message:err})
}
}catch (error) {
  res.status(404).json({ message: error.message });
}

  }
  export default withProtect(handler)

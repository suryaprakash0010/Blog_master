import fs from 'fs'
import imagekit from '../configs/imageKit';

export const addBlog = async(req,res)=>{
    try{
          const {title , subTitle , description,category,isPublished} =JSON.parse
          (req.body.blog);
          const imageFile= req.file;

          //check if all fields are present
          if(!title || !description||!category || !imageFile){
            return res.json({success: false, message: "Missing required fields"})
          }

          const fileBuffer = fs.readFileSync(imageFile.path)


          //upload image to imageKit
          const response = await imagekit.upload({
            file: fileBuffer,
            fileName:imageFile.originalname,
            folder:"/blogs"
          })

          //optimization through imageKit URL transformation
       const optimizedImageUrl = imagekit.url({
        path: response.filePath,
        transformation: [
            {quality:'auto'},
            {format:'webp'},
            {width:'1280'}
        ]

       });

       const image = optimizedImageUrl;

       await Blog.create({title,subTitle,description,category,image,isPublished})

       res.json({success: true , message: "Blog added Successfully"})

    } catch (error){

       res.json({success: false , message: error.message})
    }
}
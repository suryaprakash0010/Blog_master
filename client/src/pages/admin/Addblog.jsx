import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const Addblog = () => {

      const [image,setImage]=useState(false);
      const [title,setTitle]=useState('');
      const [subTitle,setSubTitle]=useState('');
      const [isPublished,setIsPublished]=useState(false);
      const [category,setCategory]=useState('Startup');


      const onSubmitHandler = async(e)=>{
        e.preventDefault();
      }
  return (
  <form onSubmit={onSubmitHandler} className='flex-1 bg-blue-50/50 text-gray-600 h-full overflow-scroll'>
    <div className='bg-white w-full max-w-3xl p-4 md:p-10 sm:m-10 shadow rounded'>
          <p>Upload thumbnail</p>
          <label htmlFor="image">
      <img src={!image ? assets.upload_area :URL.createObjectURL(image)} alt="" className='mt-2 h-16 rounded cursor-pointer' />
      <input  onChange={(e)=> setImage(e.target.files[0])} type="file" id='image' hidden required />
    </label>
    <p>Blog title</p>
    </div>
  </form>
  )
}

export default Addblog
import { useToast } from '@/hooks/use-toast'
import React from 'react'
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from '../ui/button';

function MediaUploader() {
    const { toast } = useToast()

    const onUploadSuccessHandler = (result :any) =>{
        toast({
            title: "Image Uploaded Successfully",
            description: "1 credit was deducted from your account",
            duration:5000,
            className:"success-toast"
          })
    }

    const onUploadErrorHandler= () =>{
        toast({
            title: "Something went wrong while uploading",
            description: "Please try again",
            duration:5000,
            className:"error-toast"
          })
    }
  return (
    <CldUploadWidget 
    
        uploadPreset="nayan_imaginify"
        options={{
            multiple:false,
            resourceType:"image"
        }}
        onSuccess={onUploadSuccessHandler}
        onError={onUploadErrorHandler}
    >
        {({ open }) => {
        return (
        <Button onClick={() => open()}>
        Upload an Image
        </Button>
        );
    }}
    </CldUploadWidget>
  )
}

export default MediaUploader
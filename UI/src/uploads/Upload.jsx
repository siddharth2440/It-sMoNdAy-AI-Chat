import React , {useRef} from 'react'
import { IKContext, IKImage,IKUpload } from 'imagekitio-react';
import { AttachFile } from '@mui/icons-material'

const urlEndpoint = import.meta.env.VITE_IMAGE_KIT_ENDPOINT;
const publicKey = import.meta.env.VITE_IMAGE_KIT_PUBLIC_KEY;

const authenticator =  async () => {
    try {
        const response = await fetch('http://localhost:7865/upload');
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Request failed with status ${response.status}: ${errorText}`);
        }
        const data = await response.json();
        const { signature, expire, token } = data;
        return { signature, expire, token };
    } catch (error) {
        throw new Error(`Authentication request failed: ${error.message}`);
    }
};

const Upload = ({setImage}) => {
  const IkUploadRef = useRef()
    const onError = err => {
        console.log("Error", err);
      };
      
      const onSuccess = res => {
        setImage(prev=>({...prev,isLoading:false,dbData:res}))
        console.log("Success", res);
      };
      
      const onUploadProgress = progress => {
        console.log("Progress", progress);
      };
      
      const onUploadStart = evt => {
        // console.log("Start", evt);
        const file = evt.target.files[0];
        const reader = new FileReader();
        console.log(reader);
        console.log(reader.result);

        reader.onloadend = () => {
          setImage((prev)=>({...prev,isLoading:true,aiData:{
            inlineData:{
              data:reader.result.split(",")[1],
              mimeType:file.type
            }
          }}))
        }
        reader.readAsDataURL(file)
      };

  return (
    <IKContext
        urlEndpoint={urlEndpoint}
        publicKey={publicKey}
        authenticator={authenticator}
      >
        <IKUpload
          fileName="test-upload.png"
          onError={onError}
          onSuccess={onSuccess}
          useUniqueFileName={true}
          onUploadProgress={onUploadProgress}
          onUploadStart={onUploadStart}
          style={{display:"none"}}
          ref={IkUploadRef}
        />
        {
          <label htmlFor="file" onClick={() => IkUploadRef.current.click()} > <AttachFile className='text-white cursor-pointer ' /> </label>
        }
      </IKContext>
  )
}

export default Upload
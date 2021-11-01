import React, {useState} from 'react'
import ImageUploader from 'react-images-upload';
import { ModalBody,Modal,ModalHeader } from 'reactstrap';
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import decryptResponse from '../../lib/decryptResponse';
import Response from '../../lib/Response';

function ImageUpload(props) {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('')

  //function to get upload URL for image
  const getUploadURL = async (extention) => {
    let res = await apiClient('/uploadUrl', 'POST',  props.accessToken, { file_extension: extention});
    if (res.responseCode === Response.STATUS_OK) {
      res = decryptResponse(res.responseData)
      return { upload_url: res.upload_url, key: res.image_id };
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setError(true);
    }
  }

  const onDrop = async(pictureFiles,pictureDataURLs) => {
    let extension = pictureFiles[0].name.split('.')[pictureFiles[0].name.split('.').length - 1];

    //making api call inside promise to avoid loading delay
    const [uploadUrl] = await Promise.all([
      (typeof extension !== "undefined" && extension !== '' ) ? getUploadURL(extension) : undefined,
    ]);

    var requestOptions = {};
    if (typeof uploadUrl !== "undefined") {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", pictureFiles[0].type);

      //building up request data
      requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: pictureFiles[0],
        redirect: 'follow'
      };
    }

    //making api call to fetch image url
    await Promise.all([
      typeof uploadUrl !== "undefined" ? fetch(uploadUrl.upload_url, requestOptions).then(response => response.text()) : ''
    ]);


    let updatedData = {player_user_id:props.userId, action_type:Constants.ACTION_UPDATE_PROFILE_PIC}
    if (typeof uploadUrl !== "undefined") {
      updatedData.profile_picture = 1;
      updatedData.avatar_id = 1;

    };

    let res = await apiClient('/admin/user/action', 'POST', props.accessToken, updatedData);
    if (res.responseCode === Response.STATUS_OK) {
      props.toggle();
    } else if (res.responseCode === Response.TOKEN_EXPIRED) {
      props.resetAccessToken();
    } else {
      setErrorMessage(res.responseMessage);
    }
  }
  
  return (
    <Modal  
    isOpen={props.isOpen}   
    size="lg"
    centered>
      <ModalHeader toggle={props.toggle}></ModalHeader>
       <ModalBody>
        {error && <h1 className="text-center">Error. Try Refreshing.</h1>}
       
        <ImageUploader
          withIcon={true}
          buttonText='Select Image'
          onChange={onDrop}
          imgExtension={['.jpg', '.png', '.jpeg']}
          maxFileSize={5242880}
          singleImage	={true}
          withPreview={true}
          withLabel={false}
        />
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}
       </ModalBody>
    </Modal>
    
  )
}

export default ImageUpload
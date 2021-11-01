import React, {useState, useEffect} from 'react'
import { MdAddCircleOutline } from 'react-icons/md'
import { Row, Col, Card, CardBody, CardHeader,Modal, Button} from 'reactstrap'
import apiClient from '../../lib/apiClient';
import Constants from '../../lib/constant';
import Response from '../../lib/Response';
import ImageUpload from './ImageUpload'
import $ from 'jquery'

//profile image style
const profileImg = {
  'display': 'block',
  'padding': '2px',
  'margin':  '0 auto',
  'width': 'auto',
  'height': 'auto',
  'maxWidth':'100px',
  'maxHeight':'100px'
}

function AvatarList(props) {
  const [uploadModal, setUploadModal] = useState(false);
  const [profilePicture, setProfilePicture] = useState('');
  const [avatarId, setAvatarId] = useState('')
  const [errorMessage, setErrorMessage] = useState('');
  const [totalImageCount, setTotalImageCount] = useState('')

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  const images = importAll(require.context('../../assets/profile', false, /\.(png|jpe?g|svg)$/));
  var result = Object.keys(images).map((key) => [(key), images[key]]);

  useEffect(() => {
   if(result !=='') setTotalImageCount(result.length)
  }, [result]);


  const handleProfileEdit = (id) => {
    props.setProfileId(id)
    setProfilePicture(id);
    setAvatarId(id)
    $('.profile').removeClass('active-image')
    $('.image'+id).addClass('active-image')
  }

  const submitImage = async () => {
    if(profilePicture === '' && avatarId === '') {setErrorMessage('Please select an image'); return;}

    let updatedData = {player_user_id:props.userId, action_type:Constants.ACTION_UPDATE_PROFILE_PIC}
     updatedData.profile_picture = profilePicture;
     updatedData.avatar_id = avatarId;


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
    size="md"
    centered>
    <Card>
      <CardHeader  style={{color:"purple",textAlign:'center'}} >
        <span style={{fontSize:"30px", textAlign:'center'}}> Select Avatar</span> 
        <Button style={{float:'left'}}  onClick={()=>props.toggle()}>x</Button>
      </CardHeader>

      <CardBody>
        {result.map((item, index) => (
        <Row key={index} style={{marginBottom:'10px'}}>
        <Col sm="4" className={`text-center profile image${index+1}`}  style={{margin:'0 auto'}}>
          <img style={profileImg} alt="Player Profile"
          onClick={() => handleProfileEdit(index+1)}
            src={require(`../../assets/profile/${item[0]}`)}/>
        </Col> 
        </Row>
        ))}
          <br/>
          {/* <Row>
              <Col sm="4" className='text-center' style={{margin:'0 auto', fontSize:'50px', color:'green'}}>
                <MdAddCircleOutline onClick={()=>setUploadModal(true) } />
             </Col> 
          </Row> */}

          <br/>
          <Row>
            <Col md={4} style={{margin:'0 auto'}}>
              <Button block color="success" onClick={() => submitImage()}>OK</Button>
            </Col>
          </Row>
        </CardBody>
        {errorMessage && <p className="mt-2 text-danger text-center">{errorMessage}</p>}

    </Card>

    <ImageUpload 
          isOpen={uploadModal}
          resetAccessToken={() => { props.resetAccessToken() }}
          toggle = {() => setUploadModal(false)}
          refresh = {()=>{ setUploadModal(false); props.toggle();}}
          userId = {props.userId}
          accessToken = {props.accessToken}
          totalImageCount={totalImageCount}
    />
  </Modal>
  )
}

export default AvatarList

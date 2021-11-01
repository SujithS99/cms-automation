import React from 'react'
import { useHistory } from 'react-router-dom';
import { Container, CardBody, Card, Row, Col} from 'reactstrap';
import Constants from '../../lib/constant';

function PlayerCard({ data, ...props }) {
  let history = useHistory();

  const displayPlayerDetail = (name,i) => {
    let path = `/player_detail/${name}`;
    props.setRouteBreadCrumbs([{route: '/player_search', title: 'Player\'s Management'}, {route: path, 'title': name}]);
    data[i].search_text = props.searchText;
    
    history.push(path,data[i]);
  }

  return (
    <Container>
      {data.map(({ profile_picture, username}, index) => (
        <div  key={index}>
          <Row>
            <Col sm="12">
              <Card onClick={()=> {displayPlayerDetail(username,index)}}>
                <CardBody>
                  <Row>
                    <Col md={2} />
                    <Col md={4} style={{margin:'0 auto'}}>
                      <img style={{borderRadius:'50%', width:'100px', height:'100px'}}  alt="Player Profile" src={profile_picture?require(`../../assets/profile/${profile_picture}.png`):Constants.DEFAULT_PROFILE} />
                    </Col>
                    <Col md={4} style={{margin:'0 auto'}}>
                      <p style={{margin:'30px 0'}}>{username}</p>
                    </Col>
                    <Col md={2} />
                  </Row>
                  
                </CardBody>
              </Card>
            </Col>
          </Row><br/>
        </div>
      ))}
   </Container>
  )
}

export default PlayerCard

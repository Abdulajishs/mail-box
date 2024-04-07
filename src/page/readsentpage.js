import {Container, Col, Row } from 'react-bootstrap';
import MailBox from "../component/MailBox/MailBox";
import ReadSent from '../component/Sent/ReadSent';


const ReadSentpage = (props) =>{
    return (
        <Container fluid className=" h-100 p-0">
            <Row style={{ height: "100vh" }}>
                <Col xs={2} className='p-0'><MailBox /></Col>
                <Col xs={10}> <ReadSent/></Col>
            </Row>
        </Container>
    )
} 

export default ReadSentpage;
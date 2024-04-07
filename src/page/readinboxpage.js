import {Container, Col, Row } from 'react-bootstrap';
import MailBox from "../component/MailBox/MailBox";
import ReadInbox from "../component/Inbox/ReadInbox";


const ReadInboxpage = (props) =>{
    return (
        <Container fluid className=" h-100 p-0">
            <Row style={{ height: "100vh" }}>
                <Col xs={2} className='p-0'><MailBox /></Col>
                <Col xs={10}> <ReadInbox/></Col>
            </Row>
        </Container>
    )
} 

export default ReadInboxpage;
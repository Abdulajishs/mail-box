import Inbox from "../component/Inbox/Inbox"
import {Container, Col, Row } from 'react-bootstrap';
import MailBox from "../component/MailBox/MailBox";

const InboxPage = (props) => {
    return (
        <Container fluid className=" h-100 p-0">
            <Row style={{ height: "100vh" }}>
                <Col xs={2} className='p-0'><MailBox /></Col>
                <Col xs={10}> <Inbox /></Col>
            </Row>
        </Container>
    )
}

export default InboxPage;
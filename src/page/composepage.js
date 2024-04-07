import {Container, Col, Row } from 'react-bootstrap';
import ComposeMail from "../component/Mail/ComposeMail";
import MailBox from "../component/MailBox/MailBox";

const InboxPage = () => {
    return (
        <Container fluid className=" h-100 p-0">
            <Row style={{ height: "100vh" }}>
                <Col xs={2}><MailBox /></Col>
                <Col xs={10}> <ComposeMail /></Col>
            </Row>
        </Container>
    )
}

export default InboxPage;
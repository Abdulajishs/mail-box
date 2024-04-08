import { useSelector } from "react-redux";
import { Col, Row, Container } from "react-bootstrap";
import { useParams } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';
import useFetch from "../fetch";

const ReadSent = () => {
    const { id } = useParams()
    const emailId = useSelector(state => state.token.email);
    const userId = emailId.replace(/\./, "")
    let url = `https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/sent/${userId}/${id}.json`
    let mail = useFetch(url)
    console.log(mail);

    if (!mail) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    return (
        <Container>
            <Row>
                <Col xs={4}>
                    <p className=" fw-bold">From: {mail.sender}</p>
                </Col>
                <Col xs={{ offset: 4, span: 4 }}>
                    {mail.timestap}
                </Col>
            </Row>
            <p className=" fw-bold">To: {mail.receiver}</p>
            <p className=" fw-bold">Subject:{mail.subject}</p>
            <p> {mail.message}</p>
        </Container>
    )
}

export default ReadSent;

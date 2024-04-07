import { useSelector } from "react-redux";
import SentItem from "./SentItem";
import { ListGroup } from "react-bootstrap";
import { Col, Row } from 'react-bootstrap';
import { SendTwoTone } from "@mui/icons-material";


const Sent = () => {
    const sent = useSelector(state => state.mail.sent)
    // console.log(sent);
    return (
        <ListGroup>
            <Row >
                <Col className="text-bg-secondary d-flex justify-content-center align-items-center">
                    <SendTwoTone /> {" "}
                    <h2 >Sent Box</h2>
                </Col>
            </Row>
            {sent.length === 0 &&
                <h2 className=" d-flex justify-content-center mt-3">Your Sent box Empty</h2>
            }
            {sent.length !== 0 &&
                sent.map((mail) => (
                    <SentItem key={mail.id} mail={mail} />
                ))}
        </ListGroup>
    )
}

export default Sent;
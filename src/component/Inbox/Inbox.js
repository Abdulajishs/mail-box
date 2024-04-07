import { useSelector } from "react-redux";
import InboxItem from "./InboxItem";
import { ListGroup } from "react-bootstrap";
import { InboxTwoTone } from "@mui/icons-material";
import { Col, Row } from 'react-bootstrap';

const Inbox = () => {
    const received = useSelector(state => state.mail.received);
    return (
        <ListGroup>
            <Row >
                <Col className="text-bg-secondary d-flex justify-content-center align-items-center">
                    <InboxTwoTone /> {" "}
                    <h2 > Inbox</h2>
                </Col>
            </Row>

            {received.length === 0 &&
                <h2 className=" d-flex justify-content-center mt-3">Your Inbox Empty</h2>
            }
            {received.length !== 0 && received.map((mail) => (
                <InboxItem key={mail.id} mail={mail} />
            ))}
        </ListGroup>
    )
}

export default Inbox;
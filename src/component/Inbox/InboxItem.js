import { useState } from "react";
import { Badge, Col, Collapse, Container, FormCheck, ListGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/mail-slice";
import { updateReceived } from "../../store/mail-actions";

const InboxItem = (props) => {
    const { mail } = props
    const email = useSelector(state => state.token.email)
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
   

    const itemClickHandler = () => {
        dispatch(mailAction.saveRecieved(mail));
        dispatch(updateReceived(email,mail))
        setOpen(!open)
    };

    return (
        <div>
            <ListGroup.Item key={mail.id} action  onClick={itemClickHandler}>
                <Row>
                    <Col xs={1}>
                        <FormCheck
                            inline   
                            type="checkbox"
                            id={`checkbox-${mail.id}`}
                        />
                    </Col>
                    <Col xs={4}>
                        <span className="d-flex align-items-center">
                            {mail.hasRead ? (
                                <Badge bg="secondary" variant="secondary">
                                    Read
                                </Badge>
                            ) : (
                                <Badge bg="primary" variant="primary">
                                    Unread
                                </Badge>
                            )}
                            <span className="ms-2">{mail.sender}</span>
                        </span>
                    </Col>
                    <Col xs={7}>
                        <span className=" d-inline-block text-muted text-truncate w-100"  >
                            {mail.subject}{mail.message}
                        </span>
                    </Col>
                </Row>
            </ListGroup.Item>
            <Collapse in={open}>
                    <Container>
                        <Row>
                            <Col xs={4}>
                                <p>From: {mail.sender}</p>
                            </Col>
                            <Col xs={{ offset: 4, span: 4 }}>
                                {mail.timestap}
                            </Col>
                        </Row>
                        <Row>
                            <p>Subject:{mail.subject}</p>
                        </Row>
                        <Row>
                            <p>Body: {mail.message}</p>
                        </Row>
                    </Container>
            </Collapse>
        </div >
    )
}

export default InboxItem;
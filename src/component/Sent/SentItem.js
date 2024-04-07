import { useNavigate } from "react-router-dom";
import {  Col, Row, FormCheck, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/mail-slice";
import {  deleteSent } from "../../store/mail-actions";
import DeleteIcon from '@mui/icons-material/Delete';

const SentItem = (props) => {
    const { mail } = props
    const email = useSelector(state => state.token.email)
    const dispatch = useDispatch();
    const history = useNavigate()


    const itemClickHandler = () => {
        history(`/sent/${mail.id}`)
    };

    const deleteHandler = () => {
        dispatch(mailAction.deleteSentMail(mail.id));
        dispatch(deleteSent(email,mail))
    }
    return <>
    <div>
            <div className="d-flex flex-nowrap " >
                <ListGroup.Item key={mail.id} action  >
                    <Row>
                        <Col xs={1}>
                            <FormCheck
                                inline
                                type="checkbox"
                                id={`checkbox-${mail.id}`}
                            />
                        </Col>
                        <Col xs={10} onClick={itemClickHandler}>
                            <Row>
                                <Col xs={4} >
                                        <span className="ms-2">To: {mail.receiver}</span>
                                </Col>
                                <Col xs={8}>
                                    <span className=" d-inline-block text-muted text-truncate w-100"  >
                                        {mail.subject}{mail.message}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1} className="text-end" onClick={deleteHandler}>
                            {<DeleteIcon />}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </div>
            {/* <Collapse in={open}>
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
                        <p>To: {mail.receiver}</p>
                    </Row>
                    <Row>
                        <p>Subject: {mail.subject}</p>
                    </Row>
                    <Row>
                        <p>Body: {mail.message}</p>
                    </Row>
                </Container>
            </Collapse> */}
        </div >
    </>
}

export default SentItem;
import { useNavigate } from "react-router-dom";
import { Badge, Col, Row, FormCheck, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { mailAction } from "../../store/mail-slice";
import { deleteReceived, updateReceived } from "../../store/mail-actions";
import DeleteIcon from '@mui/icons-material/Delete';


const InboxItem = (props) => {
    const { mail } = props
    const email = useSelector(state => state.token.email)
    const dispatch = useDispatch();
    const history = useNavigate()
    

    const itemClickHandler = () => {
        dispatch(mailAction.saveRecieved(mail));
        dispatch(updateReceived(email, mail))
        history(`/inbox/${mail.id}`)
    };

    const deleteHandler = () => {
        dispatch(mailAction.deleteReceivedMail(mail.id));
        dispatch(deleteReceived(email, mail))
    }

    return (
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
                                <Col xs={8}>
                                    <span className=" d-inline-block text-muted text-truncate w-100"  >
                                        {mail.subject}{mail.message}
                                    </span>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={1} className="text-end" onClick={deleteHandler}>
                            <DeleteIcon />
                        </Col>
                    </Row>
                </ListGroup.Item>

            </div>
        </div >
    )
}

export default InboxItem;
import { Badge, Button, Col, Container, Row } from 'react-bootstrap';
import { useEffect } from 'react';
import { tokenAction } from '../../store/token-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReceived, fetchSent } from '../../store/mail-actions';
import { InboxTwoTone, SendTwoTone } from '@mui/icons-material';

const MailBox = () => {
    const dispatch = useDispatch();
    const emailId = useSelector(state => state.token.email);
    const total = useSelector(state => state.mail.total);

    useEffect(() => {
        dispatch(fetchReceived(emailId))
        dispatch(fetchSent(emailId))
    }, [emailId, dispatch])

    const history = useNavigate()


    const sentHandler = () => {
        history("/sent")
    }

    const receiveHandler = () => {
        history("/inbox")
    }
    const composeHandler = () => {
        history("/compose")
    }

    const logOutHandler = () => {
        dispatch(tokenAction.removeEmail());
        dispatch(tokenAction.removeToken());
        history("/login")
    }

    return (
        <Container fluid className='h-100' >
            <Row  style={{ height: "100vh" }}>
                <Col className='d-flex flex-column align-content-center bg-secondary-subtle p-0 '>
                    <h2 className=' d-flex justify-content-center p-3 bg-primary-subtle mb text-white'>Mail Box</h2>

                    <Button variant="primary" onClick={composeHandler} className=' m-3'>
                        Compose
                    </Button>
                    <Button variant="light" className=' border-0 rounded-0' onClick={receiveHandler}> <InboxTwoTone />Inbox {" "}
                        <Badge pill bg="primary">
                            {total}
                        </Badge>
                    </Button>
                    <Button variant="light" className=' border-0 rounded-0' onClick={sentHandler}> <SendTwoTone />sent</Button>
                    <Button variant="danger" className=' m-3 mt-5' onClick={logOutHandler}>Log out</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default MailBox;
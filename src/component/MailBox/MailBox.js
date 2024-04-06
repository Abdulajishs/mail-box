import { Badge, Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import Sent from '../Sent/Sent';
import Inbox from '../Inbox/Inbox';
import { useState, useEffect } from 'react';
import ComposeMail from '../Mail/ComposeMail';
import { tokenAction } from '../../store/token-slice';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchReceived, fetchSent } from '../../store/mail-actions';

const MailBox = () => {
    const [isSent, setIsSent] = useState(false)
    const [isReceived, setIsReceived] = useState(true)
    const [isCompose, setIsCompose] = useState(false)

    const dispatch = useDispatch();
    const emailId = useSelector(state => state.token.email);
    const total = useSelector(state => state.mail.total);

    useEffect(() => {
        dispatch(fetchReceived(emailId))
        dispatch(fetchSent(emailId))
    }, [emailId, dispatch])

    const history = useNavigate();


    const sentHandler = () => {
        setIsSent(true)
        setIsReceived(false)
        setIsCompose(false)
    }

    const receiveHandler = () => {
        setIsReceived(true)
        setIsSent(false)
        setIsCompose(false)

    }
    const composeHandler = () => {
        setIsReceived(false)
        setIsSent(false)
        setIsCompose(true)
    }

    const logOutHandler = () => {
        dispatch(tokenAction.removeEmail());
        dispatch(tokenAction.removeToken());
        history("/login")
    }

    return (
        <Container fluid className='h-100' >
            <Row className=" p-3 bg-primary-subtle mb">
                <Col xs={2} className=' text-white'>
                    <h2>Mail Box</h2>
                </Col>
                <Col xs={6}>
                    <InputGroup className="mb-3">
                        <Form.Control
                            placeholder="Find messages,documents,photos or people"
                            aria-label="Search box"
                            aria-describedby="basic-addon1"
                        />
                        <Button variant="info" id="button-addon1" >
                            Search
                        </Button>
                    </InputGroup>
                </Col>
            </Row>
            <Row style={{ height: "90vh" }}>
                <Col xs={2} className='d-flex flex-column align-content-center bg-secondary-subtle '>
                    <Button variant="primary" onClick={composeHandler} className=' m-3'>
                        Compose
                    </Button>
                    <Button variant="light" className=' border-0 rounded-0' onClick={receiveHandler}>Inbox{' '}
                        <Badge pill bg="primary">
                            {total}
                        </Badge>
                    </Button>
                    <Button variant="light" className=' border-0 rounded-0' onClick={sentHandler}>sent</Button>
                    <Button variant="danger" className=' m-3 mt-5' onClick={logOutHandler}>Log out</Button>
                </Col>
                <Col xs={10}>
                    {isCompose && <ComposeMail />}
                    {isSent && <Sent />}
                    {isReceived && <Inbox />}
                </Col>
            </Row>
        </Container>
    );
}

export default MailBox;
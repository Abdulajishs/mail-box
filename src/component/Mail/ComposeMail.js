import React, { useRef, useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';


import './ComposeMail.css';
import axios from 'axios';

const ComposeMail = () => {
  const toRef = useRef("");
  const subjectRef = useRef("");
  const sender = useSelector(state => state.token.email);
  const timestap = new Date().toISOString();
  
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  const editorStateChangeHandler = (newEditorState) => {
    setEditorState(newEditorState);
  };
  
  const sendEmail = async (receiver,subject,message) => {
    const senderId = sender.replace(/\./g,"");
    // console.log(senderId);
    const receivedId = receiver.replace(/\./g,"");

    const emaildata = {
      sender : sender,
      subject : subject,
      message : message,
      timestap : timestap
    }

    try {
      // Store email in receiver's inbox
      const response1 = await axios.post(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/received/${receivedId}.json`,emaildata)
      // Store email in sender's sentbox
      const response2 =await axios.post(`https://mail-box-feaa3-default-rtdb.firebaseio.com/emails/sent/${senderId}.json`,
      {
        ...emaildata,
        receiver : receiver
      })
      console.log(response1,response2);
      // console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email: ', error);
    }
  };


  const onSubmitHandler = (event) => {  
    event.preventDefault()
    const receiver = toRef.current.value;
    const subject = subjectRef.current.value;
    const message = editorState.getCurrentContent().getPlainText();
    sendEmail(receiver,subject,message);

    toRef.current.value ="";
    subjectRef.current.value ="";
    setEditorState(EditorState.createEmpty());
  };

  return (
    <Container className="compose-mail-container">
      <Form onSubmit={onSubmitHandler} className="p-3">
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon1">To</InputGroup.Text>
          <Form.Control
            placeholder="example@example.com"
            aria-label="Username"
            aria-describedby="basic-addon1"
            ref={toRef}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon2">Subject</InputGroup.Text>
          <Form.Control
            placeholder=""
            aria-label="Subject"
            aria-describedby="basic-addon2"
            ref={subjectRef}
            required
          />
        </InputGroup>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Editor
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            editorState={editorState}
            onEditorStateChange={editorStateChangeHandler}
          />
        </Form.Group>
        <div >
          <Button type="submit" variant="info" className=" bg-gradient shadow px-4">Send</Button>
        </div>
      </Form>
    </Container>
  );
};

export default ComposeMail;





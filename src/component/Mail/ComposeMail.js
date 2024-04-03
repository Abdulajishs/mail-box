import React, { useRef, useState } from 'react';
import { Form, Button, InputGroup, Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'; // Import necessary Firestore functions
import firestore from '../../firebase'; // Import Firebase initialization

import './ComposeMail.css';

const ComposeMail = () => {
  const toRef = useRef("");
  const subjectRef = useRef("");
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const sender = useSelector(state => state.token.email);

  const sendEmail = async () => {
    const senderEmail = sender;
    const receiverEmail = toRef.current.value;
    const subject = subjectRef.current.value;
    const message = editorState.getCurrentContent().getPlainText();

    try {
        // Add email to sender's sentbox
        const senderDocRef = collection(firestore, "users", senderEmail, "sentbox");
        await addDoc(senderDocRef, {
            receiver: receiverEmail,
            subject,
            message,
            timestamp: serverTimestamp()
        });

        // Add email to receiver's inbox
        const receiverDocRef = collection(firestore, "users", receiverEmail, "inbox");
        await addDoc(receiverDocRef, {
            sender: senderEmail,
            subject,
            message,
            timestamp: serverTimestamp()
        });

        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email: ', error);
    }
};


  const sendHandler = () => {
    sendEmail();
    console.log('Sending email:', {
      to: toRef.current.value,
      subject: subjectRef.current.value,
      content: editorState.getCurrentContent().getPlainText()
    });
  };

  return (
    <Container className="compose-mail-container">
      <Form>
        <InputGroup className="mb-3">
          <InputGroup.Text>To:</InputGroup.Text>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={toRef}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Subject:</InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Enter subject"
            ref={subjectRef}
          />
        </InputGroup>
      </Form>
      <div className="compose-mail-content">
        <Editor
          editorState={editorState}
          onEditorStateChange={setEditorState}
        />
      </div>
      <div className="compose-mail-footer">
        <Button variant="primary" onClick={sendHandler}>Send</Button>
      </div>
    </Container>
  );
};

export default ComposeMail;

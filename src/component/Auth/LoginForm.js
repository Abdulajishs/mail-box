import { useRef, useState } from "react";
import { Button, Card, CardBody, FloatingLabel, Form, Spinner } from "react-bootstrap";

import classes from "./LoginForm.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { tokenAction } from "../../store/token-slice";

const LoginForm = () => {
    const [isLoading ,setIsLoading] = useState(false)
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const dispatch = useDispatch()

    const history = useNavigate();
    const apiKey = process.env.REACT_APP_API_KEY;

    const getOobConfirmationCode = async (email) => {
        setIsLoading(true)
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${apiKey}`,
                {
                    requestType: "PASSWORD_RESET",
                    email: email
                })
            if (response.status === 200) {
                console.log(response.data);
                setIsLoading(false);
            } else {
                throw new Error("Unable to reset password")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const loginUser = async (email, password) => {
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })
            if (response.status === 200) {
                // console.log(response.data.idToken);
                history("/home")
                dispatch(tokenAction.addToken(response.data.idToken))
                dispatch(tokenAction.addEmail(email))
                const userId = email.replace(/\./g, "")
                dispatch(tokenAction.addUserId(userId))
            } else {
                throw new Error("User login failed...")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        loginUser(email, password)
        emailRef.current.value = ""
        passwordRef.current.value = ""
    }

    const signupHandler = () => {
        history("/")
    }

    const resetPasswordHandler = () => {
        const email = emailRef.current.value;
        getOobConfirmationCode(email)

    }
    return (
        <div className={`${classes.backgroundImage} d-flex flex-column justify-content-center align-items-center `}>
            <Card className={`mb-3 ${classes.card}`}>
                <CardBody className="border-1 p-3 d-flex flex-column align-items-center justify-content-around" >
                    <h2 className="mb-4">Login</h2>
                    <Form onSubmit={submitHandler}>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                        </FloatingLabel>

                        <Button variant="primary" className="w-100 border rounded-5 mb-3" type="submit" >Login</Button>
                    </Form>
                    {!isLoading &&
                        <Link to="#" className="mb-3" onClick={resetPasswordHandler} >Forgot password</Link>
                    }
                    {isLoading &&
                        <Spinner animation="border" variant="primary" />
                    }
                </CardBody>
            </Card>
            <Button variant="outline-success" className={classes.button} onClick={signupHandler} >Don't have an account?Sign up</Button>
        </div>
    )
}

export default LoginForm;
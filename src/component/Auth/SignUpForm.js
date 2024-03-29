import { Button, Card, CardBody, FloatingLabel, Form } from "react-bootstrap";
import classes from "./SignUpForm.module.css"
import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const confirmPasswordRef = useRef("");

    const history = useNavigate()

    const apiKey = process.env.REACT_APP_API_KEY;
    // console.log(apiKey);

    const addSignupUser = async (email, password) => {
        console.log(email, password);
        try {
            const response = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`,
                {
                    email: email,
                    password: password,
                    returnSecureToken: true
                })

            console.log(response.data);
            if (response.status === 200) {
                console.log("User has successfully signed up");
                history("/login")
            } else {
                throw new Error("Authentication is failed")
            }
        } catch (error) {
            alert(error.message)
        }
    }

    const submitHandler = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            alert("password doesn't match")
            return
        }
        addSignupUser(email, password)

        emailRef.current.value = ""
        passwordRef.current.value = ""
        confirmPasswordRef.current.value = ""
    }

    const loginHandler =()=>{
        history("login")
    }

    return (
        <div className={`${classes.backgroundImage} d-flex flex-column justify-content-center align-items-center `}>
            <Card className={`mb-3 ${classes.card}`}>
                <CardBody className="border-1 p-3 d-flex flex-column align-items-center justify-content-around" >
                    <h2 className="mb-4">SignUp</h2>
                    <Form onSubmit={submitHandler}>
                        <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                            <Form.Control type="email" placeholder="name@example.com" ref={emailRef} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                            <Form.Control type="password" placeholder="Password" ref={passwordRef} required />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingConfirmPassword" label="Confirm Password" className="mb-4">
                            <Form.Control type="password" placeholder="Confirm Password" ref={confirmPasswordRef} required />
                        </FloatingLabel>
                        <Button variant="primary" className="w-100 border rounded-5 mb-3" type="submit" >SignUp</Button>
                    </Form>
                </CardBody>
            </Card>
            <Button variant="outline-success" className={classes.button} onClick={loginHandler}>Have an account?Login</Button>
        </div>
    )
}

export default SignUpForm
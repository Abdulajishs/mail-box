import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Home from "./page/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mailAction } from "./store/mail-slice";


function App() {
  const received = useSelector(state => state.mail.received);
  const dispatch = useDispatch();
    // console.log(received);
    useEffect(()=>{
      const total = received.reduce((acc,mail) => acc + Number(mail.count),0);
      dispatch(mailAction.updateTotal(total))
    },[dispatch,received])
    
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;

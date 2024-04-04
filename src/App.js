import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Home from "./page/Home";
import ComposeMail from "./component/Mail/ComposeMail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
      <Route path="/compose" element={<ComposeMail/>} />
    </Routes>
  );
}

export default App;

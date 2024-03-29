import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Home from "./page/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/home" element={<Home/>} />
    </Routes>
  );
}

export default App;

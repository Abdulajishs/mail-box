import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignUp/>} />
    </Routes>
  );
}

export default App;

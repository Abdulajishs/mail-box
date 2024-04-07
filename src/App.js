import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Home from "./page/Home";
import InboxPage from "./page/inboxpage";
import ComposePage from "./page/composepage";
import SentPage from "./page/sentpage";
import ReadInboxpage from "./page/readinboxpage";
import ReadSentpage from "./page/readsentpage";


function App() {

  return (
    <Routes>
      <Route path="/" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/compose" element={<ComposePage />} />
      <Route path="/inbox" element={<InboxPage />} />
      <Route path="/sent" element={<SentPage />} />
      <Route path="/inbox/:id" element={<ReadInboxpage />} />
      <Route path="/sent/:id" element={<ReadSentpage />} />
    </Routes>
  );
}

export default App;

import { Route, Routes } from "react-router-dom";
import SignUp from "./page/SignUp";
import Login from "./page/Login";
import Home from "./page/Home";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { mailAction } from "./store/mail-slice";
import InboxPage from "./page/inboxpage";
import ComposePage from "./page/composepage";
import SentPage from "./page/sentpage";
import ReadInboxpage from "./page/readinboxpage";
import ReadSentpage from "./page/readsentpage";


function App() {
  const received = useSelector(state => state.mail.received);
  const dispatch = useDispatch();
  // console.log(received);
  useEffect(() => {
    const total = received.reduce((acc, mail) => acc + Number(mail.count), 0);
    dispatch(mailAction.updateTotal(total))
  }, [dispatch, received])

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

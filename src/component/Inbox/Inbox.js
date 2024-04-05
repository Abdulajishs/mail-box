import { useSelector } from "react-redux";
import InboxItem from "./InboxItem";

const Inbox = () => {
    const received = useSelector(state => state.mail.received);
    return (
        <>
            <h2 className="text-bg-secondary d-flex justify-content-center">Inbox</h2>
            {received.length === 0 &&
                <h2 className=" d-flex justify-content-center mt-3">Your Inbox Empty</h2>
            }
            {received.length !== 0 && received.map((mail) => (
                <InboxItem key={mail.id} mail={mail} />
            ))}
        </>
    )
}

export default Inbox;
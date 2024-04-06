import { useSelector } from "react-redux";
import SentItem from "./SentItem";

const Sent = () => {
    const sent = useSelector(state => state.mail.sent)
    // console.log(sent);
    return (
        <>
            <h2 className="text-bg-secondary d-flex justify-content-center">Sent Box</h2>
            {sent.length === 0 &&
                <h2 className=" d-flex justify-content-center mt-3">Your Sent box Empty</h2>
            }
            {sent.length !== 0 &&
                sent.map((mail) => (
                    <SentItem key={mail.id} mail={mail} />
                ))}
        </>
    )
}

export default Sent;
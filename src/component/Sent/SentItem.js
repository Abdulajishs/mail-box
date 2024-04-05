import { Badge, ListGroup } from "react-bootstrap";

const SentItem = (props) => {
    const { mail } = props
    return <>
        <ListGroup>
            <ListGroup.Item
                className="d-flex justify-content-between align-items-start"
            >
                <div className="ms-2 me-auto">
                    <div className="fw-bold">{mail.receiver}</div>
                    <span>subject:{mail.subject}</span>
                    <span>message:{mail.message}</span>
                </div>
                <Badge bg="secondary" pill>
                {mail.timestap}
                </Badge>
            </ListGroup.Item>
        </ListGroup>
    </>
}

export default SentItem;
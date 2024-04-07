import MailBox from "../component/MailBox/MailBox";

const RootLayout = (props) =>{
    return(
        <>
        <MailBox>
            <main>
            {props.children}
            </main>
        </MailBox>
        </>
    )
}

export default RootLayout;
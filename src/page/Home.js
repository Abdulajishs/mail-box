import { Fragment } from "react";
import HomeContent from "../component/Home/HomeContent"
import ComposeMail from "../component/Mail/ComposeMail";

const Home = () => {
    return (
        <Fragment>
            <HomeContent />
            <ComposeMail />
        </Fragment>
    )
};

export default Home;
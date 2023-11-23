import ProfileCard from "./ProfileCard"
import Container from "react-bootstrap/Container";
import "./ProfilePage.css"
const ProfilePage = (props) => {
    // console.log(props.user)
    return (<Container className="profile"><ProfileCard user={props.user} setUser={props.setUser}/></Container>)
};

export default ProfilePage;

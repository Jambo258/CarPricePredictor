import ProfileCard from "./ProfileCard";
import "./AdminPage.css"
const AdminPage = (props) => {
  return (
    <div className="grid">
      {props.users.map((element) => (
        <ProfileCard key={element.id} user={element} setUsers={props.setUsers}></ProfileCard>
      ))}
    </div>
  );
};

export default AdminPage;

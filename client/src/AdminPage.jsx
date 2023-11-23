import ProfileCard from "./ProfileCard";
import "./AdminPage.css"
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
const AdminPage = (props) => {
  return (
    <Container>
      <Row>
        {props.users.map((element) => (
          <Col className="mb-3 mt-3" key={element.id}>
            <ProfileCard
              key={element.id}
              user={element}
              setUsers={props.setUsers}
            ></ProfileCard>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AdminPage;

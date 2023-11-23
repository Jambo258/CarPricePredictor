import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { useAuth } from "./Auth";
import { useNavigate } from "react-router-dom";
const ModalComponent = (props) => {
  const [show, setShow] = useState(false);
  const { token, role, removeUserToken } = useAuth();
  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/user/${props.id}`,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      console.log(response.data);
      if(role === "admin"){
        props.setUsers((prev) => prev.filter((element) => element.id !== props.id));
      } else if(role === "user"){
        removeUserToken();
        navigate("/");
      }

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button
        style={{ marginLeft: "30%" }}
        variant="danger"
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>User Deletion Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete account ? {props.id}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            data-testid="confirm-delete"
            onClick={() => {
              handleClose();
              handleDelete();
            }}
          >
            Confirm Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;

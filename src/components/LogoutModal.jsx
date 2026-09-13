import { useState, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import AuthContext from './../AuthContext.jsx';

function LogoutModal() {
    // Initialize context
    const setIsLoggedIn = useContext(AuthContext).setIsLoggedIn;
    const setUserSession = useContext(AuthContext).setUserSession;
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // When logging out, remove the logged in user's data from localStorage
    // And set loggedIn flag to false
    function handleLogOut(){
        setIsLoggedIn(false);
        setUserSession(null);
        navigate('/login');
    }

    return (
        <>
        <Button className="btn-danger ms-auto" onClick={handleShow}>
            Log out
        </Button>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>Log Out</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to log out?
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Cancel
            </Button>
            <Button variant="danger" onClick={handleLogOut}>Log out</Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default LogoutModal;
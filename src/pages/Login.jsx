import { Button, Form, Container, Image } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './../assets/Titanite.png'
import AuthContext from './../AuthContext.jsx';
import { USERS } from './../data/users.js';
export default function Login(){
    const setIsLoggedIn = useContext(AuthContext).setIsLoggedIn;
    const setUserSession = useContext(AuthContext).setUserSession;
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    function handleSubmit(event){
        // Prevents the form from refreshing the page
        event.preventDefault();
        // Reset error message
        setError('');
        // Input validation
        if(!email || !password){
            setError('Please enter your email or password.');
        }else{
            // In the USERS data file, loop through it
            for(const user of USERS){
                // If matching email and password is found
                if(user.email === email && user.password === password){
                    // Clear input fields
                    setEmail('');
                    setPassword('');
                    // Clear error message
                    setError('');
                    // Set the loggedIn flag to true and add the user data to the context
                    setIsLoggedIn(true);
                    setUserSession(user);
                    // Navigate the user to the dashboard
                    navigate("/dashboard");
                    break;
                }else{
                    // Display error in the login box
                    setError('Invalid credentials. Please try again.');
                }
            }
        }
    }

    return(
        <>
            <div className="login-background d-flex flex-row align-items-center">
                <Container className="p-3 shadow rounded-4 w-25 bg-white" style={{ marginRight: '180px', marginTop: '-250px' }}>
                    <Image src={logo} alt="Titanite Logo" className="w-75 mb-3"/>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Email Address <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={(event) => setEmail(event.target.value)}/>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Password <span className="text-danger">*</span></Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)}/>
                        </Form.Group>
                        <Form.Text className="text-danger">{error ?? ''}</Form.Text>
                        <br/>
                        <Button className="mt-3" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Container>
            </div>
        </>
    )
}
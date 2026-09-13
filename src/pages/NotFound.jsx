import { Button, Container, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import logo2 from './../assets/TitaniteFavicon.png';

export default function NotFound(){
    const navigate = useNavigate();
    function handleReturn(){
        navigate('/dashboard');
    }

    return(
        <>
            <div className="d-flex flex-column align-items-center justify-content-center p-5">
                <Container className="bg-white shadow rounded-4 d-flex flex-column align-items-center justify-content-center p-5">
                    <Image src={logo2} alt="Titanite logo" height="200px" className="mb-3"/>
                    <h1 className="font-blinker">Page not found.</h1>
                    <h2 className="font-blinker">Looks like you're lost.</h2>
                    <Button className="mt-4" onClick={handleReturn}>Go Back</Button>
                </Container>
            </div>
        </>
    )
}
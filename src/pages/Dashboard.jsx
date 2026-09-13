import { Button, Container, Image, Row, Navbar } from 'react-bootstrap';
import { useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import logo from './../assets/Titanite.png'
import house from './../assets/HouseWireframe.jpg'
import AuthContext from './../AuthContext.jsx';
import LogoutModal from './../components/LogoutModal.jsx';
import { APPLIANCES } from './../data/appliances.js';

const statusToggle = {
    On: 'Off',
    Off: 'On',
    Open: 'Closed',
    Closed: 'Open',
};

// 'On' and 'Open' both count as the active states, used for status toggling
function isActiveStatus(status){
    return status === 'On' || status === 'Open';
}

export default function Dashboard(){
    const user = useContext(AuthContext).userSession;
    // The state that holds the appliance object data
    const [appliances, setAppliances] = useLocalStorage('appliances', APPLIANCES);

    // Toggles appliance states
    // Based on the appliance object data, it takes in the id of the specific appliance
    // If the chosen id matches the id from the appliances.js file
    // Create a new object where the chosen id's status is changed to a different state based on the statusToggle object
    function toggleAppliance(id){
        setAppliances((prev) => prev.map((appliance) =>
            appliance.id === id
                ? { ...appliance, status: statusToggle[appliance.status] }
                : appliance
        ));
    }

    // Flags for each of the appliance cards 
    // It checks whether each appliance's status is active or not by each of their id
    // It either returns true (refers to "Open" or "On") or false (refers to "Closed" or "Off")
    const appliance1IsActive = isActiveStatus(appliances.find((appliance) => appliance.id === 1).status);
    const appliance2IsActive = isActiveStatus(appliances.find((appliance) => appliance.id === 2).status);
    const appliance3IsActive = isActiveStatus(appliances.find((appliance) => appliance.id === 3).status);
    const appliance4IsActive = isActiveStatus(appliances.find((appliance) => appliance.id === 4).status);
    const appliance5IsActive = isActiveStatus(appliances.find((appliance) => appliance.id === 5).status);
    const appliance6IsActive = isActiveStatus(appliances.find((appliance) => appliance.id === 6).status);

    return(
        <>
            <Navbar className="bg-white shadow p-3">
                <Image src={logo} alt="Titanite Logo" height="65px"/>
                <LogoutModal>Log Out</LogoutModal>
            </Navbar>
            <Container className="mt-5 font-blinker">
                <h1>Welcome, {user.name}!</h1>
                <hr/>
            </Container>
            <Container className="align-items-center justify-content-center">
                <Image src={house} alt="House wireframe" className="house"/>
            </Container>
            <div className="d-flex w-100 align-items-start">
                <Container className="bg-white shadow mt-5 rounded-3 p-4 column-left d-flex flex-column gap-3">
                    {appliances.slice(0, 3).map((appliance) => (
                        <Row key={appliance.id} style={{ width: '350px' }}>
                            <div className={isActiveStatus(appliance.status) ? 'appliance-card-on' : 'appliance-card-off'}>
                                <h3 className="font-blinker">{appliance.name}</h3>
                                <hr/>
                                <span className={`fw-bold ps-2 pe-2 p-1 rounded-3 ${isActiveStatus(appliance.status) ? 'is-on' : 'is-off'}`}>{appliance.status}</span>
                                <div className="d-flex flex-row justify-content-center mt-3">
                                    {user.role === 'admin' ? <Button className={isActiveStatus(appliance.status) ? 'btn-success' : 'btn-danger'} onClick={() => toggleAppliance(appliance.id)}>Toggle</Button> : <Button className="btn-secondary">You need admin access to toggle</Button>}
                                </div>
                            </div>
                        </Row>
                    ))}
                </Container>
                <Container className="bg-white shadow mt-5 rounded-3 p-4 column-right d-flex flex-column gap-3">
                    {appliances.slice(3, appliances.length).map((appliance) => (
                        <Row key={appliance.id} style={{ width: '350px' }}>
                            <div className={isActiveStatus(appliance.status) ? 'appliance-card-on' : 'appliance-card-off'}>
                                <h3 className="font-blinker">{appliance.name}</h3>
                                <hr/>
                                <span className={`fw-bold ps-2 pe-2 p-1 rounded-3 ${isActiveStatus(appliance.status) ? 'is-on' : 'is-off'}`}>{appliance.status}</span>
                                <div className="d-flex flex-row justify-content-center mt-3">
                                    {user.role === 'admin' ? <Button className={isActiveStatus(appliance.status) ? 'btn-success' : 'btn-danger'} onClick={() => toggleAppliance(appliance.id)}>Toggle</Button> : <Button className="btn-secondary">You need admin access to toggle</Button>}
                                </div>
                            </div>
                        </Row>
                    ))}
                </Container>
            </div>
            <div className={`pointer-1 ${appliance1IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`dot-1 ${appliance1IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`pointer-2 ${appliance2IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`dot-2 ${appliance2IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`pointer-3 ${appliance3IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`dot-3 ${appliance3IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`pointer-4 ${appliance4IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`dot-4 ${appliance4IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`pointer-5 ${appliance5IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`dot-5 ${appliance5IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`pointer-6 ${appliance6IsActive ? 'is-on' : 'is-off'}`}></div>
            <div className={`dot-6 ${appliance6IsActive ? 'is-on' : 'is-off'}`}></div>
        </>
    )
}
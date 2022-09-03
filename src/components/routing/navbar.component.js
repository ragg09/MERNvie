import React, {useEffect, useState} from 'react';
import {Navbar, Container, Nav, NavDropdown, Image} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleAuth } from '../auth/GoogleAuth';
import { getAllAction } from '../../redux/actions/MyAction';

// import { CheckRole } from '../frontend_middleware/MyMiddleware'



export default function MyNavbar(){
    const dispatch = useDispatch();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    //console.log(user);
    // CheckRole();
    //getting the data of users
    useEffect(()=>{
        dispatch(getAllAction("/user"));
    },[dispatch]);
    const getAll = useSelector((state) => state.data);
    //console.log(getAll);

    const userData = getAll.find(
        (kuha) => kuha.email === user?.result.email
    );

    // if(userData){
    //     console.log("ito");
    //     console.log(userData.email);
    // }


    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')))
    },[]);
    
    const handleLogout = () =>{
        dispatch({type: 'LOGOUT'});
        window.location = '/';
        setUser(null);
    }

    return(
        <div>
            {/* <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item> */}
        {userData?.role !== "" ? (
            <Navbar className="navbar-dark bg-dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">MERNVie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {user ? (
                    <>
                    <Nav className="me-auto">
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                        <Nav.Link href="/producer">Producer</Nav.Link>
                        <Nav.Link href="/actor">Actor</Nav.Link>
                        <Image src={user.result.imageUrl} roundedCircle style={{ maxWidth: '50px' }}/>
                        <NavDropdown title="" id="basic-nav-dropdown">
                            <NavDropdown.Item>{user.result.email}</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                    </>    
                ):(
                    <Nav className="me-auto">
                        <GoogleAuth/>
                    </Nav>
                )}
                </Navbar.Collapse>
                
            </Container>
            </Navbar>
        ):(
            <Navbar className="navbar-dark bg-dark" expand="lg">
            <Container>
                <Navbar.Brand href="/">MERNVie</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                {user ? (
                    <>
                    <Nav className="me-auto">
                        <Image src={user.result.imageUrl} roundedCircle style={{ maxWidth: '50px' }}/>
                        <NavDropdown title="" id="basic-nav-dropdown">
                            <NavDropdown.Item>{user.result.email}</NavDropdown.Item>
                            <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                        
                    </Nav>
                    </>    
                ):(
                    <Nav className="me-auto">
                        <GoogleAuth/>
                    </Nav>
                )}
                </Navbar.Collapse>
                
            </Container>
            </Navbar>
        )}
        
        </div>

            
    );
    
}
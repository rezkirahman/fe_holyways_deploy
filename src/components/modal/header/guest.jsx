import { React } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import Logo from '../../../assets/logo.png'
import Auth from '../../auth'

const primaryColor = "#C32424"
export default function GuestNavsbar({ show, setShow }) {

    return (
        <>
            <Navbar expand="lg" fixed="top" style={{ backgroundColor: primaryColor }}>
                <Container>
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={Logo} alt='Logo' width={80} />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: "white" }} />
                    <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                        <Nav.Link>
                            <Auth show={show} setShow={setShow} />
                        </Nav.Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

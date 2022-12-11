import { React, useState, useContext, useRef } from 'react'
import { UserContext } from '../../../context/UserContext';
import { Container, Nav, Navbar, Popover, Overlay } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Altphoto from '../../../assets/profilephoto.jpg'
import Logo from '../../../assets/logo.png'
import { FaSignOutAlt as Logout, FaUser, FaPlaneDeparture as Raise } from "react-icons/fa";



export default function UserNavsbar() {
   const primaryColor = "#C32424"
   const navigate = useNavigate()
   const [show, setShow] = useState(false);
   const [dispatch] = useContext(UserContext);
   const [target, setTarget] = useState(null);
   const ref = useRef(null);

   const handleClick = (event) => {
      setShow(!show);
      setTarget(event.target);
   }

   const logout = () => {
      localStorage.removeItem("token")
      dispatch({
         type: 'LOGOUT',
      });
      navigate("/");
   }

   return (
      <>
         <Navbar bg="" expand="lg" fixed="top" style={{ backgroundColor: primaryColor }}>
            <Container>
               <Navbar.Brand>
                  <Link to="/">
                     <img src={Logo} alt={"logo"} width={80} />
                  </Link>
               </Navbar.Brand>
               <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ color: "white" }} />
               <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                  <Nav>
                     <Nav.Link ref={ref}>
                        <img src={Altphoto}
                           alt={Altphoto}
                           width={48}
                           height={48}
                           className='rounded-circle border border-2 border-white my-auto text-center'
                           onClick={handleClick}
                        >
                        </img>
                     </Nav.Link>
                     <Overlay
                        show={show}
                        target={target}
                        placement="bottom"
                        container={ref}
                        containerPadding={30}
                     >
                        <Popover id="popover-contained" className='py-3' style={{ boxShadow: "2px 4px 30px 0px gray", border: "none" }} offset="">
                           <Popover.Body>
                              <div>
                                 <Link to="/profile" style={{ textDecoration: "none" }}>
                                    <FaUser className='fs-3 text-black' />
                                    <text className='fw-bold mx-3 text-dark'>Profile</text>
                                 </Link>
                              </div>
                           </Popover.Body>
                           <hr />
                           <Popover.Body>
                              <div>
                                 <Link to="/charity-profile" style={{ textDecoration: "none" }}>
                                    <Raise className='fs-3 text-black' />
                                    <text className='fw-bold mx-3 text-dark'>Raise Fund</text>
                                 </Link>
                              </div>
                           </Popover.Body>
                           <hr />
                           <Popover.Body>
                              <div>
                                 <Link onClick={logout} style={{ textDecoration: "none" }}>
                                    <Logout className='fs-3' style={{ color: primaryColor }} />
                                    <text className='fw-bold mx-3 text-dark'>Log Out</text>
                                 </Link>
                              </div>
                           </Popover.Body>
                        </Popover>
                     </Overlay>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>
      </>
   )
}
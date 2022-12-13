import { React, useState, useContext } from 'react'
import { Button, Container, Card, ProgressBar } from 'react-bootstrap'
import Hero1 from '../assets/heroimage1.png'
import Hero2 from '../assets/heroimage2.png'
import { UserContext } from '../context/UserContext'
import { formatIDR } from '../components/format/format-number'
import NavbarGuest from '../components/modal/header/guest'
import NavbarUser from '../components/modal/header/user'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { API } from '../config/api'

const primaryColor = "#C32424"
export default function LandingPage() {
    document.title = "Holyways"
    const [show, setShow] = useState(false)
    const [state] = useContext(UserContext);
    const navigate = useNavigate()
    const handleClick = () => setShow(true);

    //get charity data
    let { data: charities } = useQuery("CharitiesCache", async () => {
        const response = await API.get("/charities");
        return response.data.data;
    });

    const GoToDetail = (id) => {
        navigate(`detail/${id}`)
    };
    return (
        <>
            {localStorage.token ? <NavbarUser /> : <NavbarGuest setShow={setShow} show={show} />}
            <section>
                <div style={{ paddingTop: "55px" }} className="position-relative mb-5">
                    <div style={{ paddingBottom: "24px", backgroundColor: primaryColor }} className='py-5 mb-5'>
                        <Container className='my-5'>
                            <div style={{ width: "700px" }} className='mb-5 mx-5'>
                                <p className='text-white h1 fw-bold'>While you are still standing, try to reach out to the people who are falling.</p>
                                <p className='text-white mt-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. </p>
                                <Button
                                    variant='light fw-bold mt-4 px-5'
                                    style={{ color: primaryColor }}
                                    onClick={localStorage.token ? "":handleClick}
                                >
                                    Donate Now
                                </Button>
                            </div>
                        </Container>
                    </div>
                    <div className='pt-5'>
                        <Container className='my-5' align="right">
                            <div style={{ width: "700px" }} className="mx-5">
                                <p className='h1 fw-bold mb-4' align="left">Your donation is very helpful for people affected by forest fires in Kalimantan.</p>
                                <div className='d-flex justify-content-start' align="left">
                                    <p className='me-3' style={{ width: "300px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                                    <p style={{ width: "300px" }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</p>
                                </div>
                            </div>
                        </Container>
                    </div>
                    <div className='position-absolute top-0 end-0'>
                        <img src={Hero1} alt='heroimage' width={515} className='img-fluid' />
                    </div>
                    <div className='position-absolute top-50 start-0'>
                        <img src={Hero2} alt='heroimage' width={423} className='img-fluid' />
                    </div>
                </div>
            </section>
            <section id="Donate">
                <Container style={{ paddingTop: "150px" }}>
                    <div align="center">
                        <p className='fw-bold h1' style={{ color: primaryColor }}>Donate Now</p>
                    </div>
                    <div className='mt-5 pb-5 d-flex justify-content-center flex-wrap gap-4'>
                        {charities?.map((item, index) => (
                            <Card style={{ width: '20rem' }} key={index} className="">
                                <Card.Img variant="top" src={item.image} alt={Hero1} height="400px" />
                                <Card.Body>

                                    <Card.Title className='fw-bold'>{item.title}</Card.Title>
                                    <Card.Text className="mb-3 text-secondary d-inline-block text-truncate" style={{ width: "260px" }}>{item.description}</Card.Text>
                                    <ProgressBar animated now={(item.donation / item.goal) * 100} variant="danger" className="progress mb-3" style={{ height: "8px" }} />
                                    <div className='d-flex justify-content-between'>
                                        <div className=''>
                                            <p className='fw-bold'>{formatIDR.format(item.goal)}</p>
                                        </div>
                                        <div className='' align="right">
                                            <Button
                                                className='fw-bold'
                                                style={{ backgroundColor: primaryColor, border: "none" }}
                                                onClick={state.isLogin ? () => { GoToDetail(item.id) } : handleClick}
                                            >
                                                Donate
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}

                    </div>
                </Container>
            </section>
        </>
    )
}

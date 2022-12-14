import { React, useContext } from "react";
import { Container, Card, ProgressBar, Button } from "react-bootstrap";
import NavUser from '../components/modal/header/user'
import Photo from '../assets/profilephoto.jpg'
import { UserContext } from "../context/UserContext"
import { formatIDR } from "../components/format/format-number";
import { useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { useQuery } from "react-query";

export default function ProfileCharity() {
    document.title = "Holyways | My Charity"
    const primaryColor = "#C32424"
    const navigate = useNavigate()
    const [state] = useContext(UserContext)

    let { data: charity,refetch } = useQuery("CharityCaches", async () => {
        const response = await API.get(`/charity-user/${state.user.id}`);
        return response.data.data;
    });

    if(charity?.length === 0){
        refetch()
    }

    return (
        <>
            <NavUser />
            <Container style={{ paddingTop: "150px" }}>
                <div className="mx-5 pb-5">
                    <div className="mb-5 d-flex justify-content-between">
                        <div>
                            <text className="fw-bold fs-2">My Fund</text>
                        </div>
                        <div>
                            <Button
                                className='fw-bold'
                                style={{ backgroundColor: primaryColor, border: "none" }}
                                onClick={() => navigate('/add-charity')}
                            >
                                Make Raise Fund
                            </Button>
                        </div>
                    </div>
                    <div className="d-flex gap-4 flex-wrap">
                        {charity?.map((item, index) => (
                            <Card style={{ width: '20rem' }} key={index}>
                                <Card.Img variant="top" src={item.image} alt={Photo} height="400px" />
                                <Card.Body>
                                    <Card.Title className='fw-bold'>{item.title}</Card.Title>
                                    <Card.Text className="mb-3 text-secondary d-inline-block text-truncate" style={{width:"260px"}}>{item.description}</Card.Text>
                                    <ProgressBar animated now={(item.donation/item.goal)*100} variant="danger" className="progress mb-3" style={{ height: "8px" }} />
                                    <div className='d-flex justify-content-between'>
                                        <div className=''>
                                            <p className='fw-bold'>{formatIDR.format(item.goal)}</p>
                                        </div>
                                        <div className='' align="right">
                                            <Button
                                                className='fw-bold'
                                                style={{ backgroundColor: primaryColor, border: "none" }}
                                                onClick={() => {navigate(`detail/${item.id}`)}}
                                            >
                                                View Fund
                                            </Button>
                                        </div>
                                    </div>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}
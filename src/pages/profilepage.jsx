import { React, useContext } from "react";
import { Container } from "react-bootstrap";
import NavUser from '../components/modal/header/user'
import Photo from '../assets/profilephoto.jpg'
import { UserContext } from "../context/UserContext"
import { formatIDR } from "../components/format/format-number";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function Profile() {
    document.title = "Holyways | Profile"
    const primaryColor = "#C32424"
    const [state] = useContext(UserContext)

    let { data: trans } = useQuery("TransCache", async () => {
        const response = await API.get(`/transactions-user/${state.user.id}`);
        return response.data.data;
    });

    return (
        <>
            <NavUser />
            <Container style={{ paddingTop: "150px", paddingBottom: "300px" }}>
                <div className="mx-5 pb-5">
                    <div className="row">
                        <div className="col">
                            <p className="fw-bold fs-2 ">My Profile</p>
                            <div className="d-flex gap-5 pt-5">
                                <div>
                                    <img src={Photo} alt={Photo} width={180} className="img-fluid" />
                                </div>
                                <div>
                                    <div className="mb-3">
                                        <text className="fw-bold" style={{ color: primaryColor }}>Full Name</text><br />
                                        <text>{state.user.name}</text>
                                    </div>
                                    <div className="mb-3">
                                        <text className="fw-bold" style={{ color: primaryColor }}>Email</text><br />
                                        <text>{state.user.email}</text>
                                    </div>
                                    <div>
                                        <text className="fw-bold" style={{ color: primaryColor }}>Phone</text><br />
                                        <text>084393959358</text>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <p className="fw-bold fs-2">History Donation</p>
                            <div className="pt-5">
                                {/*----------------------CARD-----------------------*/}
                                {trans?.map((item, index) => (
                                    <div className="bg-white p-3 rounded mb-3" key={index}>
                                        <div>
                                            <p className="fs-4 fw-bold">{item.charity.title}</p>
                                        </div>
                                        <div className="mb-3">
                                            <text className="fw-bold">Saturday, </text>
                                            <text>12 April 2021</text>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <div style={{ color: primaryColor }} className="fw-bold">
                                                <text>Total : </text>
                                                <text>{formatIDR.format(item.donation)}</text>
                                            </div>
                                            <div
                                                className={item.status === "success" ?
                                                    "bg-success py-1 px-4 rounded" : item.status === "failed" ?
                                                        "bg-danger py-1 px-4 rounded" : "bg-warning py-1 px-4 rounded"}
                                            >
                                                <text className="fw-bold text-white">{item.status}</text>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
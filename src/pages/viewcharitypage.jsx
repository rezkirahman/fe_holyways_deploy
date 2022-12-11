import { React, useState } from "react";
import { ProgressBar, Container, Button } from "react-bootstrap";
import NavbarUser from '../components/modal/header/user'
import DummyPhoto from '../assets/heroimage1.png'
import { formatIDR } from "../components/format/format-number";
import ModalTransaction from "../components/modal/transaction";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../config/api";

export default function DetailCharity() {
    document.title = "Holyways | Detail Charity"
    const primaryColor = "#C32424"
    const [modalShow, setModalShow] = useState(false);
    const { id } = useParams()

    let { data: charity } = useQuery('charityCache', async () => {
        const respCharity = await API.get(`/charity/${id}`)
        console.log(respCharity);
        return respCharity.data.data
    })

    let { data: trans } = useQuery('transCache', async () => {
        const respTrans = await API.get(`/transactions-charity/${id}`)
        console.log(respTrans);
        return respTrans.data.data
    })


    let totalTrans = trans?.reduce((a, b) => {
        return a + b.donation
    }, 0)

    let percentage = (totalTrans / charity?.goal) * 100

    return (
        <>
            <NavbarUser />
            <Container style={{ paddingTop: "150px" }}>
                <div className="mx-5 pb-5">
                    <div className="d-flex row mb-5">
                        <div className="col">
                            <img src={charity?.image} alt={DummyPhoto} width="500px" className='img-fluid rounded' />
                        </div>
                        <div className="col">
                            <h1 className="fw-bold mb-5">{charity?.title}</h1>
                            <div className="d-flex justify-content-between mb-3 gap-2">
                                <text style={{ color: primaryColor }} className='fw-bold h4'>{formatIDR.format(totalTrans > 0 ? totalTrans : 0)}</text>
                                <text className="fs-6 text-secondary">gathered from</text>
                                <text className='fw-bold h4'>{formatIDR.format(charity?.goal)}</text>
                            </div>
                            <div>
                                <ProgressBar animated now={percentage} variant="danger" className="progress mb-3 bg-light" style={{ height: "8px" }} />
                            </div>
                            <div className="d-flex justify-content-between mb-5">
                                <div>
                                    <text className="fw-bold">{trans?.length} </text>
                                    <text className="text-secondary">Donation</text>
                                </div>
                                <div>
                                    <text className="fw-bold">180 </text>
                                    <text className="text-secondary">more day</text>
                                </div>
                            </div>
                            <div className="mb-5">
                                <p className="text-secondary">{charity?.description}</p>
                            </div>
                            <div className='d-grid gap-2'>
                                <Button
                                    className="fw-bold"
                                    style={{ backgroundColor: primaryColor, border: "none" }}
                                    onClick={() => setModalShow(true)}
                                    disabled
                                >
                                    Donate
                                </Button>
                                <ModalTransaction
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                />
                            </div>
                        </div>
                    </div>
                    {/* -----------------------LIST DONATION---------------------- */}
                    <div className="pt-3">
                        <div>
                            <p className="fs-2 fw-bold">List Donation ({trans?.length})</p>
                        </div>
                        {trans?.map((item, index) => (
                            <div className="bg-white p-3 rounded mb-3" key={index}>
                                <div>
                                    <p className="fw-bold fs-4">{item.funder?.name}</p>
                                </div>
                                <div className="mb-2">
                                    <text className="fw-bold fs-6">Saturday, </text>
                                    <text className="fs-6">12 April 2021</text>
                                </div>
                                <div style={{ color: primaryColor }} className="fw-bold">
                                    <text>Total : </text>
                                    <text>{formatIDR.format(item.donation)}</text>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </>
    )
}
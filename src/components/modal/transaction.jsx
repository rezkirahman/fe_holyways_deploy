import { React, useEffect, useState } from 'react'
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { API } from '../../config/api';

const primaryColor = "#C32424"
export default function ModalTransaction(props) {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        donation: 0,
        charity_id: parseInt(props.charityID),
        fundraiser_id: parseInt(props.fundraiserID),
        funder_id: parseInt(props.funderID),
    });

    const handleSubmit = useMutation(async (e) => {
        e.preventDefault()
        try {
            const config = {
                header: {
                    "content-type": "application/json"
                }
            }

            const body = JSON.stringify(form)
            const response = await API.post("/transaction", body, config)
            console.log(response.data.data.token);
            const token = response.data.data.token;

            window.snap.pay(token, {
                onSuccess: function (result) {
                    console.log(result)
                    navigate("/profile")
                },
                onPending: function (result) {
                    console.log(result);
                    navigate("/profile")
                },
                onError: function (result) {
                    console.log(result);
                },
                onClose: function () {
                    alert("you closed the popup without finishing the payment");
                },
            })
        }
        catch (error) {
            console.log(error);
            console.log(form);
        }
    })

    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-c2bc8ynN7yxUd99M"

        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);

        document.body.appendChild(scriptTag);
        return () => {
            document.body.removeChild(scriptTag);
        };
    }, []);


    return (
        <>
            <Modal
                show={props.show}
                onHide={props.onHide}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <div className='p-3'>
                        <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                            <FloatingLabel label="Donation" className="mb-5">
                                <Form.Control
                                    name="donation"
                                    type="text"
                                    placeholder="donation"
                                    onChange={(e) => setForm({ ...form, donation: parseInt(e.target.value) })}
                                    autoFocus
                                />
                            </FloatingLabel>
                            <div className='d-grid gap-2'>
                                <Button
                                    className='fw-bold'
                                    style={{ backgroundColor: primaryColor, border: "none" }}
                                    onClick={(e) => handleSubmit.mutate(e)}
                                >
                                    Donate
                                </Button>
                            </div>
                        </Form>
                    </div>

                </Modal.Body>
            </Modal>
        </>
    )
}
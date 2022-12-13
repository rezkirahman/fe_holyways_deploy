import { React, useState } from "react";
import { Container, Button, Form, FloatingLabel } from "react-bootstrap";
import NavbarUser from '../components/modal/header/user'
import { useMutation } from "react-query";
import { API } from "../config/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function AddCharity() {
    document.title = "Holyways | Add Charity"
    const primaryColor = "#C32424"
    const [preview, setPreview] = useState(null)
    const [state] = useContext(UserContext)
    const navigate = useNavigate()

    const [form, setForm] = useState({
        title: "",
        goal: "",
        image: "",
        description: "",
    });


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.type === 'file' ? e.target.files : e.target.value,
        });

        //PREVIEW IMAGE
        if (e.target.type === 'file') {
            let url = URL.createObjectURL(e.target.files[0]);
            setPreview(url);
        }
    }

    const handleSubmit = useMutation(async (e) => {
        try {
            e.preventDefault()

            //config
            const config = {
                header: {
                    "cotent-type": "multipart/form-data"
                }
            }

            //store data with form-data
            const formData = new FormData()
            formData.set('title', form.title)
            formData.set('goal', parseInt(form.goal))
            formData.set('image', form.image[0], form.image[0].name)
            formData.set('description', form.description)
            formData.set('user_id', state.user.id)

            const response = await API.post('/charity', formData, config)
            console.log(response);

            navigate('/charity-profile')

        } catch (error) {
            console.log(error);

        }
    })

    return (
        <>
            <NavbarUser />
            <Container style={{ paddingTop: "150px" }}>
                <div className="mx-5 pb-5">
                    <div className="mb-5">
                        <p className="fw-bold fs-2">Make Raise Fund</p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6 col-md-8 mb-3">
                            <Form onSubmit={(e) => handleSubmit.mutate(e)}>
                                <FloatingLabel label="Title" className="mb-3">
                                    <Form.Control
                                        placeholder="Title"
                                        type="text"
                                        id="title"
                                        name="title"
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="Goal Donation" className="mb-3">
                                    <Form.Control
                                        placeholder="Goal Donation"
                                        type="text"
                                        id="goal"
                                        name="goal"
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="Description" className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        style={{ height: '100px' }}
                                        placeholder="Description"
                                        type="textarea"
                                        id="description"
                                        name="description"
                                        onChange={handleChange}
                                    />
                                </FloatingLabel>
                                <Form.Control
                                    className="mb-5"
                                    placeholder="image"
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={handleChange}
                                    required
                                />
                                <div className="d-grid gap-2">
                                    <Button
                                        className="fw-bold py-3"
                                        style={{ backgroundColor: primaryColor, border: "none" }}
                                        onClick={(e) => handleSubmit.mutate(e)}
                                    >
                                        Publish Fundraising
                                    </Button>
                                </div>
                            </Form>
                        </div>
                        <div className="col-6 col-md-4">
                            {preview && (<img src={preview} alt={preview} width={500} className="img-fluid rounded" />)}
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}
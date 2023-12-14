import React, { useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const ReviewForm = ({ productId, showModal, handleClose }) => {
    const [formData, setFormData] = useState({
        rating: 1,
        title: '',
        comment: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post('/api/v1/reviews/', {
                ...formData,
                product: productId,
            });

            // You can handle additional logic after successful submission
            // For example, fetching updated reviews and closing the modal
            handleClose();
        } catch (error) {
            console.error('Error adding review:', error);
            // Handle error if needed
        }
    };

    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group as={Row} controlId="formStars">
                        <Form.Label column sm="2">
                            Stars:
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                as="select"
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                            >
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </Form.Control>
                        </Col>
                    </Form.Group>

                    <Form.Group controlId="formTitle">
                        <Form.Label>Title:</Form.Label>
                        <Form.Control
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formComment">
                        <Form.Label>Comment:</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="comment"
                            value={formData.comment}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Post
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewForm;

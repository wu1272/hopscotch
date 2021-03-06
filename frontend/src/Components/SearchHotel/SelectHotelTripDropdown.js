import React, { useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios'
import { Dropdown, DropdownButton } from 'react-bootstrap'
import { useHistory } from 'react-router';
import { Modal, Button, ListGroup, Col, Form, Container, Row } from 'react-bootstrap'
import DatePicker from "react-datepicker";

export default function SelectTripDropdown(props) {

    const {user, getAccessTokenSilently} = useAuth0();
    const trips = useState({items: []});
    const history = useHistory();
    const [show, setShow] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [tripSelected, setTripSelected] = useState(-1)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleTripChange = async (trip) => {
        
        console.log("trip if: " + trip.TripId)
        setTripSelected(trip.TripId)
        
        console.log(tripSelected)
    }

    const handleSelect = (item) => {
        console.log(item.TripId)

        const newFeature = {
            FeatureId: props.hotelOption.place_id,
            FeatureType: "Hotel",
            TripId: tripSelected,
            StartDateTime: startDate,
            EndDateTime: endDate,
            BookingUrl: props.hotelOption.website,
            FeatureName: props.hotelOption.name,
            Address: props.hotelOption.formatted_address
        }

        setShow(false)

        

        getAccessTokenSilently({ audience: "https://hopscotch/api" }).then((res) => {
            const authToken = res;
            axios.post('/api/hotel/selectHotel', newFeature, {
                headers: {
                Authorization: `Bearer ${authToken}`,
                },
            }).then((res2) => {
                console.log(res2.data);
                axios.post("/api/trips/vote", {
                    tripid: tripSelected,
                    userid: user.sub,
                    featureid: props.hotelOption.place_id,
                    isflight: 0,
                    score: 1
                }, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                }).then(res3 => {
                    history.push({
                        pathname: `/editview/${tripSelected}`
                    });
                }).catch((err) =>{
                    console.log(err);
                });
            }).catch((err) => {
                console.log(err);
            });
        });

    }

    return (
        <>
        <Button variant="primary" onClick={handleShow}>
            Add to trip
        </Button>

        <Modal show={show} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
            <Modal.Title>Please select trip, date, and time</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* <DropdownButton id="dropdown-item-button" title="Select">
                    <Dropdown.Header>Add dining to trip</Dropdown.Header>
                    {props.trips.map((item) => (
                        <Dropdown.Item onClick={() => handleSelect(item)} as="button">{item.Name}</Dropdown.Item>
                        ))}
                </DropdownButton> */}
                <Container>
                    <Row>
                        <Col xs={6} md={4}>
                            <ListGroup>
                                <ListGroup.Item variant="primary"><strong>Choose Trip</strong></ListGroup.Item>
                                {props.trips.map((item) => (
                                    !item.IsLocked ?
                                    <div><ListGroup.Item action variant="light" onClick={() => handleTripChange(item)} as="button">{item.Name}</ListGroup.Item></div> :
                                    <div><ListGroup.Item disabled><del>{item.Name}</del></ListGroup.Item></div>
                                ))}
                            </ListGroup>
                        </Col>
                        <Col>
                            <Form.Group controlId="tripStartDate">
                                <Form.Label><strong>Start Date and Time</strong></Form.Label><br />
                                <DatePicker selected={startDate} showTimeSelect onChange={(date) => setStartDate(date)} dateFormat="MM/dd/yyyy" />
                            </Form.Group>
                            <Form.Group controlId="tripEndDate">
                                <Form.Label><strong>End Date and Time</strong></Form.Label><br />
                                <DatePicker selected={endDate} showTimeSelect onChange={(date) => setEndDate(date)} dateFormat="MM/dd/yyyy" />
                            </Form.Group>
                        </Col>
                        
                    </Row>
                    <Row>
                        <Col >
                            <Form.Group controlId="disclaimer" >
                                <Form.Label>This is not a reservation, it's just a tool to help you organize your trip</Form.Label><br />
                                
                            </Form.Group>
                           
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary" onClick={handleSelect}>
                Save
            </Button>
            </Modal.Footer>
        </Modal>
        {/* <DropdownButton id="dropdown-item-button" title="Select">
            <Dropdown.Header>Add dining to trip</Dropdown.Header>
            {props.trips.map((item) => (
                !item.IsLocked ?
                   <div><Dropdown.Item onClick={() => handleSelect(item)} as="button">{item.Name}</Dropdown.Item></div> :
                   <div><Dropdown.Item disabled>{item.Name}</Dropdown.Item></div>
                ))}
        </DropdownButton> */}
        </>
        // <DropdownButton id="dropdown-item-button" title="Select Trip to add to">
        //     <Dropdown.Header>Add hotel to trip</Dropdown.Header>
        //     {props.trips.map((item) => (
        //            <Dropdown.Item onClick={() => handleSelect(item)} as="button">{item.Name}</Dropdown.Item>
        //         ))}
        // </DropdownButton>
    );
  }

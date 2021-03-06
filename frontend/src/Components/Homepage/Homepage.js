import { useAuth0 } from "@auth0/auth0-react";
import React from 'react';
import TripCards from '../TripCard/TripCard';
import axios from "axios";
import Profile from "../ProfileInfo/Profile";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Homepage() {
    const { user, getAccessTokenSilently } = useAuth0();


    //If a new user is made, we add them to the database

    getAccessTokenSilently({
        audience: "https://hopscotch/api"

    }).then(res => {
        const headers = {
            "Authorization": "Bearer " + res,
        };
        axios.get(`/api/user/getbyuserid/${user.sub}`, { "headers": headers })
            .then(function (res, err) {
                if (err)
                    console.log(err);
                else if (res.data.length === 0) {
                    const newUser = { userId: `${user.sub}`, name: `${user.name}`, email: `${user.email}` }
                    axios.post('/api/user/postnewuser', newUser, { "headers": headers });
                }
            });
    });



    return (
        <div>
            <TripCards />
        </div>
    )
}

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { CardDeck, Spinner } from 'react-bootstrap';
import axios from "axios";
import VotingCard from "./VotingCard";



export default function Vote (props) {
    const { user, getAccessTokenSilently } = useAuth0();
    const [votes, setVotes] = useState([]);
    const [loading, setLoading] = useState(true)
    const [spinner, setSpinner] = useState((
        <div>
            <p><strong>Loading...</strong></p>
            <Spinner animation="border" role="status" variant="primary">
                <span className="sr-only">Loading...</span>
            </Spinner>
        </div>
      ));

    useEffect (() => {
        updateVotingCards()
    }, [])

    const updateVotingCards = async () => {

        let accessToken = null
        accessToken = await getAccessTokenSilently({audience: "https://hopscotch/api"})
        const token = `Bearer ${accessToken}`
        let res = null
    
        try {
            res = await axios.get(`/api/trips/${props.match.params.tripid}/votes`, {
                headers: {
                    Authorization: token,
                },
            })
    
            if (res.status === 200) {
                console.log(res.data);
                setVotes(res.data)
                setLoading(false)
                return res.data
            }
            else {
                console.log("Error: Can't fetch votes")
            }
            
        } catch (error) {
            console.log(error)
        }
        // getAccessTokenSilently({ audience: "https://hopscotch/api" }).then(res => {
        //   axios.get(`/api/trips/${props.match.params.tripid}/votes`, {
        //     headers: {
        //       Authorization: `Bearer ${res}`
        //     }
        //   }).then(res => {
        //     console.log(res.data);
        //     setVotes(res.data)
        //   }).catch(err => {
        //     console.log(err)
        //   })
        // })
      }

    return (
        <div>
            <h3>Voting</h3>
            {loading ? spinner :
              votes.length > 0 ? (
                <CardDeck className="ml-5 mr-5 mt-3 justify-content-center">
                  {votes.map((item, i) => {
                    return (<VotingCard
                      key={i}
                      title={item.FeatureName}
                      type={item.FeatureType}
                      score={item.Score}
                      voters={item.Voters.split(",")}
                      tripid={props.match.params.tripid}
                      featureid={item.FeatureId}
                      isflight={item.IsFlight}
                      bookingURL={item.BookingURL}
                      confirmed={item.Confirmed}
                      updateFunc={updateVotingCards}
                    />)
                  })}
                </CardDeck>
              ) : (
                <h6>No votes availible. Why not add something?</h6>
              )}
            <hr />
        </div>
    )

}


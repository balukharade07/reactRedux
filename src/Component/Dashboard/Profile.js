import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { Collapse } from 'antd'

const Profile = () => {
    const { userId } = useParams();
    const [profile, setProfile] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:5000/profile/${userId}`)
            .then((response) => {
                setProfile(response.data)
            })
    }, [])
    return (
        <div>
            <div style={{textAlign:'center'}}>
                <img style={{ width: '200px', height: '200px', border: '1px solid', borderRadius: '50%' }} src={`https://robohash.org/${(profile?.username || 'text')}.png`} />
                <h2>Name:- {profile?.username}</h2>
                <h3>Email:- {profile?.email}</h3>
            </div>
            <div style={{ marginTop: '10px' }}>
                <h3>Your Quotes</h3>
                <Collapse expandIcon={false} accordion={false} collapsible='header'>
                    {profile?.quotes?.map(item => {
                        return <Collapse.Panel key={item._id} showArrow={false} header={item.quote} extra={<span>~ {profile?.username}</span>} />
                    })}
                </Collapse>
            </div>
        </div>
    )
}

export default Profile;
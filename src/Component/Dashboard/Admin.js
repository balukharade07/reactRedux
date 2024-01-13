import React, { useEffect, useState } from "react";
import { Button, Collapse, message, Popconfirm } from "antd";
import { DeleteTwoTone } from '@ant-design/icons';
import axios from "axios";

const Admin = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        getAllUsers();
    }, []);

    const getAllUsers = () => {
        axios.get(`http://localhost:5000/users`)
            .then((response) => {
                return response.data;
            }).then((response) => {
                setUsers(response)
            })
    }

    const handleDelete = (_id) => {
        axios.delete(`http://localhost:5000/userDelete/${_id}`)
            .then((response) => {
                getAllUsers();
                message.success('Deleted Successfully...!!')
            })
    }

    const genExtra = (item) => (
        <>
            <Popconfirm disabled={item.userType} title="Sure to Delete?" onCancel={(event) => {
                event.stopPropagation();
            }} onConfirm={(event) => {
                event.stopPropagation();
                handleDelete(item._id)
            }}>
                <Button disabled={item.userType} onClick={(event) => {
                    event.stopPropagation();
                }}>
                    <DeleteTwoTone title="Delete" /> Delete
                </Button>
            </Popconfirm>
        </>


    );

    return (
        <>
            <div style={{ marginTop: '10px' }} className='admin-page'>
                <h2>List Of Users</h2>
                <Collapse collapsible='header' accordion expandIcon={false} >
                    {users?.map(item => {
                        return <Collapse.Panel key={item._id} showArrow={false} header={item.username} extra={genExtra(item)} >
                            <div>
                                <img style={{ width: '200px', height: '200px', border: '1px solid', borderRadius: '50%' }} src={`https://robohash.org/${(item.username)}.png`} />
                                <br />
                                Email:- {item.email}<br />
                                User Type: {item.userType || 'Client'}
                            </div>
                            {item?.quote?.length ? <div>
                                <h2>All Quote</h2>
                                {item?.quote?.map(q => <h3 key={q._id}>{q?.quote}</h3>)}
                            </div> : ''}
                        </Collapse.Panel>
                    })}
                </Collapse>
            </div>
        </>
    )
}

export default Admin;
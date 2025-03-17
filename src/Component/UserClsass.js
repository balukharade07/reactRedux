import React, { useEffect } from 'react'

function UserClsass({name }) {
    
    useEffect(() => {
        console.log("chaild useEffect called");
    },[])

  return (
    <div>UserClsass {name}</div>
  )
}

export default UserClsass
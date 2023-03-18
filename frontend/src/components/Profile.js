import React from "react";

const Profile=()=>{

    const auth = localStorage.getItem('user');

    return(
        <div className="profile">
            <img src="/avatar-2.png" alt="" />
           <h1>Name: <span> { JSON.parse(auth).name } </span> </h1> 
           <h1>Email Id: <span> { JSON.parse(auth).email } </span> </h1> 
            <h1>Your Id: <span>{ JSON.parse(auth)._id }</span></h1>
            <br />
        </div>
    )
}

export default Profile;
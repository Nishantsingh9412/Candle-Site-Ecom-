import React from 'react'
import { useParams } from 'react-router-dom';

const Account = () => {
    // const userProfile = JSON.parse(localStorage.getItem("Profile"));
    // Fallback to a default user ID if not found
    const { userId } = useParams();
    console.log("User ID:", userId);

  return (
    <div>
        <h1>Account Page</h1>
        <p>This is the account page where users can manage their account details.</p>
        <p>User ID: {userId}  </p>
        {/* Add more account management features here */}
    </div>
  )
}

export default Account

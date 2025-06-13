import React from 'react'
import { useParams } from 'react-router-dom'

const index = () => {
    const {slug} = useParams();
    console.log("slug", slug);
    console.log("params", useParams());
    // Here you can use the slug to fetch the collection data if needed
    
    return (
    <div>
      <h1>Single Collection</h1>
        <p>Collection Slug: {slug}</p>
        {/* You can add more details about the collection here */}
        {/* For example, you might want to fetch and display products in this collection */}
        {/* This is just a placeholder for now */}
    </div>
  )
}

export default index

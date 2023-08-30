import React from 'react'

const Food = ({ business }) => {

    const {
        id,
        image_url,
        is_closed,
        location,
        name, phone,
        price, rating,
        review_count,
        url } = business;
    
        const { address1, city, state, zip_code } = location

    return (
        <div id={id}>
            <a href={url}>
                <img src={image_url} />
            </a>
            <h2>Name: {name}</h2>
            <p>Phone: {phone}</p>
            <p>Price: {price}</p>
            <p>rating: {rating}</p>
            <p>Review: {review_count}</p>
            <p>Currently { is_closed ? 'closed' : 'open' }</p>
            <p>Address {address1}</p>
            <p>{city} {state} {zip_code}</p>

        </div>
    )
}

export default Food
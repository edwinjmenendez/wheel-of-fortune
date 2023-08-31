import React from 'react';
import './Food.css'; // Import your CSS file for styling

const Food = ({ business }) => {
  const {
    id,
    image_url,
    is_closed,
    location,
    name,
    phone,
    price,
    rating,
    review_count,
    url,
  } = business;

  const { address1, city, state, zip_code } = location;

  return (
    <div className="food-container" id={id}>
      <a className="food-image-link" href={url}>
        <img className="food-image" src={image_url} alt={name} />
      </a>
      <div className="food-details">
        <h2 className="food-name">
          <a href={url}>{name}</a>
        </h2>
        <p className="food-phone">Phone: {phone}</p>
        <p className="food-price">Price: {price}</p>
        <p className="food-rating">Rating: {rating}</p>
        <p className="food-review-count">Reviews: {review_count}</p>
        <p className="food-status">
          Currently {is_closed ? 'Closed' : 'Open'}
        </p>
        <div className="food-address">
          <p className="food-address-line">{address1}</p>
          <p className="food-address-line">
            {city}, {state} {zip_code}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Food;

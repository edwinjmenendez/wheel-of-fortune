import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import './Food.css'; // Import your CSS file for styling
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles(theme => ({
  customStarColor: {
    color: 'white',
  },
}));

const Food = ({ business }) => {

  const classes = useStyles();

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
  const ratingStars = [];
  for (let i = 0; i < 5; i++) {
    ratingStars.push(<StarIcon color={i < Math.floor(rating) ? 'primary' : ''} className={classes.customStarColor}/>)
  }

  return (
    <div className="food-container" id={id}>
      <a className="food-image-link" href={url}>
        <img className="food-image" src={image_url} alt={name} />
      </a>
      <div className="food-details">
        <h2 className="food-name">
          <a href={url}>{name}</a>
        </h2>
        <div className='review-rating-star'>
          {ratingStars}
          <div className='review-rating'>
            <p className="food-rating">{rating}</p>
            <p className="food-review-count">({review_count} reviews)</p>
          </div>
        </div>
        <p className="food-phone">Phone: {phone}</p>
        <p className="food-price">Price: {price}</p>
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

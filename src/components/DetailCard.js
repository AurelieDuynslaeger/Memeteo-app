import React from 'react';

const DetailCard = ({ iconSrc, description, value }) => {
  return (
    <div className='details-card'>
      <img src={iconSrc} alt="" width={40} height={40} />
      <p>{description} {value}</p>
    </div>
  );
};

export default DetailCard;

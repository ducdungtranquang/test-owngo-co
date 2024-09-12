import React from 'react';

const ProductCard = ({ name, price, toppings, trending, id }) => {
  return (
    <div className="product-card">
      <div>{`MT-${id}`}</div>
      <h3>{name}</h3>
      <div className='hr'></div>
      <p>
        <strong>Toppings: </strong>
        <span>
          {toppings}
        </span>
      </p>
      <div className="price-section">
        <div>{trending && <span className="trending">Trending</span>}</div>
        <span className="price">${price.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default ProductCard;

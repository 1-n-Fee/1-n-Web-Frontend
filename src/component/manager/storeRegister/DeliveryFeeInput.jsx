import React from "react";
import PropTypes from "prop-types";

const DeliveryFeeInput = ({ deliveryFee, setDeliveryFee }) => {
  const onDeliveryFeeChange = (e) => {
    const value = e.target.value;
    if (value.length !== 0)
      setDeliveryFee(parseInt(value.replace(/[^0-9]/gi, "")));
    else setDeliveryFee(0);
  };

  return (
    <>
      <input
        type="text"
        value={deliveryFee.toLocaleString()}
        onChange={onDeliveryFeeChange}
      />
      <span>원</span>
    </>
  );
};

DeliveryFeeInput.propTypes = {
  deliveryFee: PropTypes.number.isRequired,
  setDeliveryFee: PropTypes.func.isRequired,
};

export default DeliveryFeeInput;

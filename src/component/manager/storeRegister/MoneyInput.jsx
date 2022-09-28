import React from "react";
import PropTypes from "prop-types";
import { SignUpInputStyle } from "../../style/SignUpStyle";

const MoneyInput = ({ money, setMoney }) => {
  const onDeliveryFeeChange = (e) => {
    const value = e.target.value;
    if (value.length !== 0) setMoney(parseInt(value.replace(/[^0-9]/gi, "")));
    else setMoney(0);
  };

  return (
    <>
      <SignUpInputStyle
        width={"150px"}
        type="text"
        value={money.toLocaleString()}
        onChange={onDeliveryFeeChange}
      />
      <span>원</span>
    </>
  );
};

MoneyInput.propTypes = {
  deliveryFee: PropTypes.number.isRequired,
  setDeliveryFee: PropTypes.func.isRequired,
};

export default MoneyInput;

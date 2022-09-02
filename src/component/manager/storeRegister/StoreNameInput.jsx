import React from "react";
import PropTypes from "prop-types";
import { SignUpInputStyle } from "../../style/SignUpStyle";

const StoreNameInput = ({ name, setName }) => {
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <SignUpInputStyle type="text" value={name} onChange={onNameChange} />
    </>
  );
};

StoreNameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

export default StoreNameInput;

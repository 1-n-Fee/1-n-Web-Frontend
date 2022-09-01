import React from "react";
import PropTypes from "prop-types";

const StoreNameInput = ({ name, setName }) => {
  const onNameChange = (e) => {
    setName(e.target.value);
  };
  return (
    <>
      <input type="text" value={name} onChange={onNameChange} />
    </>
  );
};

StoreNameInput.propTypes = {
  name: PropTypes.string.isRequired,
  setName: PropTypes.func.isRequired,
};

export default StoreNameInput;

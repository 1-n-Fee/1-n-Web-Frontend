import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
const PlusIcon = ({ onClick }) => {
  return (
    <>
      <FontAwesomeIcon icon={faPlus} onClick={onClick} />
    </>
  );
};

export default PlusIcon;

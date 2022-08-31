import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { COLOR } from "../../../constants/colors";
import PropTypes from "prop-types";

const TriangleArrow = ({ isDown, onClick }) => {
  return (
    <ArrowWrapper>
      <FontAwesomeIcon
        icon={isDown ? faCaretDown : faCaretUp}
        onClick={onClick}
      />
    </ArrowWrapper>
  );
};

TriangleArrow.propTypes = {
  isDown: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

export default TriangleArrow;

const ArrowWrapper = styled.span`
  font-size: 13px;
  width: 100%;
  text-align: center;
  color: ${COLOR.DARKER_GRAY};
  opacity: 80%;
  &:hover {
    opacity: 100%;
  }
`;

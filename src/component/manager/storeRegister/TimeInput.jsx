import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { SignUpInputStyle } from "../../style/SignUpStyle";

const TimeInput = ({ typeKey, setTime }) => {
  const [times, setTimes] = useState({ start: "", end: "" });
  const onChange = (e) => {
    const value = e.target.value;
    const key = e.target.dataset.key;

    setTimes((cur) => ({ ...cur, [key]: value }));
  };

  useEffect(() => {
    if (times.start !== "" && times.end !== "") {
      setTime((cur) => ({
        ...cur,
        [typeKey]: `${times.start.replace(":", "")}-${times.end.replace(
          ":",
          ""
        )}`,
      }));
    }
  }, [times]);
  return (
    <>
      <SignUpInputStyle
        width={"130px"}
        type="time"
        onChange={onChange}
        data-key="start"
      />
      ~
      <SignUpInputStyle
        width={"130px"}
        type="time"
        data-key="end"
        onChange={onChange}
      />
    </>
  );
};

TimeInput.propTypes = {
  typeKey: PropTypes.string,
  timeKey: PropTypes.string,
  setTime: PropTypes.func.isRequired,
};

export default TimeInput;

import React, { useState } from "react";
import { useEffect } from "react";
import SignUpInputStyle from "../style/SignUpInputStyle";

const NameInput = ({ nameKey, setData }) => {
  const [name, setName] = useState("");
  const onChange = (e) => {
    let value = e.target.value;
    value = value.replace(/ /g, "");
    setName(value);
  };

  useEffect(() => {
    setData((cur) => ({ ...cur, [nameKey]: name }));
  }, [name]);
  return (
    <>
      <SignUpInputStyle type="text" value={name} onChange={onChange} />
    </>
  );
};

export default NameInput;

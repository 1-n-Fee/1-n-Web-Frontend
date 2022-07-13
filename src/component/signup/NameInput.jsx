import React, { useState } from "react";
import { useEffect } from "react";

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
      <input type="text" value={name} onChange={onChange} />
    </>
  );
};

export default NameInput;

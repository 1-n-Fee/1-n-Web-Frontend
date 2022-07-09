import React, { useEffect, useState } from "react";

const PwDupInput = ({ pw, dupCheckKey, setData }) => {
  const [pwDup, setPwDup] = useState("");
  const onChange = (e) => {
    const value = e.target.value;
    setData((cur) => ({ ...cur, [dupCheckKey]: value === pw }));
    setPwDup(value);
    console.log(pwDup);
  };

  return (
    <>
      <input type="password" value={pwDup} onChange={onChange} />
      <span>{pwDup !== pw || pwDup === "" ? "🔴" : "🟢"}</span>
    </>
  );
};

export default PwDupInput;

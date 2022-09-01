import React, { useEffect, useState } from "react";
import SignUpInputStyle from "../style/SignUpInputStyle";

const PwDupInput = ({ pw, dupCheckKey, setData }) => {
  const [pwDup, setPwDup] = useState("");
  const onChange = (e) => {
    const value = e.target.value;
    setData((cur) => ({ ...cur, [dupCheckKey]: value === pw }));
    setPwDup(value);
  };

  useEffect(() => {
    if (pw === "") {
      setPwDup("");
    }
  }, [pw]);

  return (
    <>
      <SignUpInputStyle
        type="password"
        value={pwDup}
        onChange={onChange}
        disabled={pw === ""}
      />
      <span>{pwDup !== pw || pwDup === "" ? "🔴" : "🟢"}</span>
    </>
  );
};

export default PwDupInput;

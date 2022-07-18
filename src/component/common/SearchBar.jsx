import React, { useState } from "react";

const SearchBar = ({ onSearchListener }) => {
  const [keyword, setKeyword] = useState("");
  const onChange = (e) => {
    setKeyword(e.target.value);
  };

  const onBtnClick = () => {
    onSearchListener(keyword);
  };

  return (
    <div>
      <input type="text" value={keyword} onChange={onChange} />
      <button onClick={onBtnClick}>🔎</button>
    </div>
  );
};

export default SearchBar;

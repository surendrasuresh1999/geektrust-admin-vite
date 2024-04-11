import React from "react";

const Searchbar = ({ text, setterFun }) => {
  return (
    <div className="search-div">
      <input
        type="text"
        value={text}
        onChange={(e) => setterFun(e.target.value)}
        className="input-div"
        placeholder="Search by name,email or role"
      />
    </div>
  );
};

export default Searchbar;

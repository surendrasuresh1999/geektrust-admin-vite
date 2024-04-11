import React from "react";
import nodataImg from "../assets/No data-pana.png";
const NodataFound = () => {
  return (
    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
      <img
        src={nodataImg}
        alt="cover-img"
        style={{ height: "200px", width: "200px" }}
      />
      <h1>No data found</h1>
    </div>
  );
};

export default NodataFound;

import React, { useState } from "react";
import img404 from "@/assets/images/404.jpg";
import Test from "./test.jsx";

const View404 = () => {
  const [count, setCount] = useState(1);
  const api = () => {
    console.log("------count:", count);
    return count;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <img src={img404} alt="" />
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        count:{count}
      </button>
      <Test api={api}></Test>
    </div>
  );
};

export default View404;

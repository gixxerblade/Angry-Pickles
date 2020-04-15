import React, { useContext } from "react";
import { OpenContext } from "./openContext";
import "../styles/burger.css";
const Burger = () => {
  const [opened, setOpened] = useContext(OpenContext);
  return (
    <>
      <button
        htmlFor="Menu"
        className={`burger ${opened ? "active" : ""}`}
        onClick={() => setOpened(!opened)}
      >
        <div />
        <div />
        <div />
      </button>
    </>
  );
};
export default Burger;

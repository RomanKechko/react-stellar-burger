import React from "react";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";

export default function Tabs({ currentTab, onClickTab }) {
  return (
    <div style={{ display: "flex" }} className="pt-5">
      <Tab value="buns" active={currentTab === "buns"} onClick={onClickTab}>
        Булки
      </Tab>
      <Tab value="mains" active={currentTab === "mains"} onClick={onClickTab}>
        Начинки
      </Tab>
      <Tab value="sauces" active={currentTab === "sauces"} onClick={onClickTab}>
        Соусы
      </Tab>
    </div>
  );
}

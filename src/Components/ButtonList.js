import React from "react";
import Button from "./Button";
const ButtonList = () => {
  const list = [
    "All",
    "Music",
    "Sports",
    "Learning",
    "Live",
    "Government",
    "Tour",
    "Coding",
    "React",
    "Javascript",
    "Java",
    "SpringBoot",
    "Microservices",
  ];
  return (
    <div className="flex m-2">
      {list.map((listItem) => {
        return <Button name={listItem} />;
      })}
    </div>
  );
};

export default ButtonList;

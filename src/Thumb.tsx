import React from "react";

const ROOT_CLASSNAME = "thumb";

const Thumb = ({ good }) => {
  const thumbClass = good === true ? "fa fa-thumbs-up" : "fa fa-thumbs-down";

  return (
    <span className={ROOT_CLASSNAME}>
      <span className="sr-only">{good ? "Pass" : "Fail"}</span>
      <i className={thumbClass} />
    </span>
  );
};

export default Thumb;

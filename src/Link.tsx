import React from "react";

const ROOT_CLASSNAME = "link";

const Link = ({ url, label }) => {
  return (
    <span className={ROOT_CLASSNAME}>
      <a target="_blank" rel="noopener noreferrer" href={url}>
        {label}
        <i className="fa fa-external-link" />
      </a>
    </span>
  );
};

export default Link;

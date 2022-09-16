import React from "react";
import Thumb from "./Thumb";

const ROOT_CLASSNAME = "result";

const Result = ({ passed, compliance, large }) => {
  return (
    <p className={ROOT_CLASSNAME} data-passed={passed}>
      <span className={`${ROOT_CLASSNAME}__text`}>
        <span className={`${ROOT_CLASSNAME}__line1`}>
          {large ? "Large text" : "Body text"}
        </span>{" "}
        <span className={`${ROOT_CLASSNAME}__line2`}>WCAG {compliance}</span>
      </span>
      <Thumb good={passed} />
    </p>
  );
};

export default Result;

import React from "react";
import Result from "./Result";
import { Compliance } from "./utils";

const ROOT_CLASSNAME = "example";

const Example = ({ result }) => {
  return (
    <li className={ROOT_CLASSNAME}>
      <h3>
        <code>
          {result.color1} / {result.color2}
        </code>
      </h3>
      <div>
        <div className={`${ROOT_CLASSNAME}__block`}>
          <p style={{ color: result.color1, backgroundColor: result.color2 }}>
            Some text
          </p>
          <p style={{ color: result.color2, backgroundColor: result.color1 }}>
            Some text
          </p>
        </div>
        <div className={`${ROOT_CLASSNAME}__result`}>
          <Result
            passed={result.aaLargePassed}
            compliance={Compliance.AA}
            large={true}
          />
          <Result
            passed={result.aaNormalPassed}
            compliance={Compliance.AA}
            large={false}
          />
          <Result
            passed={result.aaaLargePassed}
            compliance={Compliance.AAA}
            large={true}
          />
          <Result
            passed={result.aaaNormalPassed}
            compliance={Compliance.AAA}
            large={false}
          />
        </div>
      </div>
    </li>
  );
};

export default Example;

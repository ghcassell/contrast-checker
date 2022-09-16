import React from "react";
import Example from "./Example";
import { getResults } from "./utils";

const ROOT_CLASSNAME = "examples";

const Examples = () => {
  let results = [];

  try {
    results = getResults();
  } catch {
    // TODO Handle errors
    return null;
  }

  return (
    <section className={ROOT_CLASSNAME} aria-labelledby="eh">
      <h2 id="eh">Combinations</h2>
      {results.length === 0 ? (
        <p>Only one colour was specified, so no combinations are possible.</p>
      ) : (
        <ul>
          {results.map((value, index) => {
            return <Example key={index} result={value} />;
          })}
        </ul>
      )}
    </section>
  );
};

export default Examples;

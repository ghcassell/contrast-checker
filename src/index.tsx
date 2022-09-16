import * as React from "react";
import { render } from "react-dom";
import { validatePallette } from "./utils";
import Examples from "./Examples";
import "./index.scss";
import Notes from "./Notes";
import Palette from "./Palette";
import Link from "./Link";

function App() {
  return (
    <main>
      <h1>Colour palette contrast check</h1>
      <p>
        Use a query string <code>?p=</code> with a comma separated list of
        colour 6 character{" "}
        <Link
          label="hex codes"
          url="https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color"
        />{" "}
        (so excluding alpha channel) without the #. For example;
        <br />
        <code>
          ?p=FFFFFF,464131,E1E1E1,F9F9F9,FFDC14,009BBE,97D4E2,6EC3BA,A8DBD6
        </code>
      </p>

      {validatePallette() ? (
        <>
          <Palette />
          <Examples />
        </>
      ) : (
        <>
          <h2>An error occured</h2>
          <p>
            The query parameter is not in the expected format. Ensure it is a
            comma seprated list of 6 character{" "}
            <Link
              label="hex codes"
              url="https://developer.mozilla.org/en-US/docs/Web/CSS/hex-color"
            />{" "}
            without the #.
          </p>
        </>
      )}
      <Notes />
    </main>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);

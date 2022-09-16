import React from "react";
import { getPalette } from "./utils";

const ROOT_CLASSNAME = "pallette";

const Palette = () => {
  const paletteToUse = getPalette();

  return (
    <section aria-labelledby="ph">
      <h2 id="ph">Palette</h2>
      <ul className={ROOT_CLASSNAME}>
        {paletteToUse.map((value) => {
          return (
            <li key={value} title={value} style={{ backgroundColor: value }} />
          );
        })}
      </ul>
    </section>
  );
};

export default Palette;

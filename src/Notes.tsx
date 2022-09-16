import React from "react";
import Link from "./Link";

const ROOT_CLASSNAME = "notes";

const Notes = () => {
  return (
    <section className={ROOT_CLASSNAME} aria-labelledby="nh">
      <h2 id="nh">Notes</h2>
      <Link
        label="WCAG: Use of colour"
        url="https://www.w3.org/WAI/WCAG21/quickref/?showtechniques=143#use-of-color"
      />
      <table>
        <thead>
          <tr>
            <th>Type of content</th>
            <th>Minimum ratio (AA rating)</th>
            <th>Enhanced ratio (AAA rating)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Body text</td>
            <td>4.5 : 1</td>
            <td>7 : 1</td>
          </tr>
          <tr>
            <td>Large-scale text (120-150% larger than body text)</td>
            <td>3 : 1</td>
            <td>4.5 : 1</td>
          </tr>
          <tr>
            <td>
              Active user interface components and graphical objects such as
              icons and graphs
            </td>
            <td>3 : 1</td>
            <td>Not defined</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
};

export default Notes;

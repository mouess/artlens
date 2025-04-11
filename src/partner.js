import React from "react";
import "./partner.css";

const Partner = ({ data }) => {
  const filteredImages = data?.images?.filter(
    (img) =>
      img.category === "partners" &&
      !["partner9", "partner10", "partner11"].includes(img.name)
  );

  // Group images into rows of 4.
  const rows = [];
  const screenWidth = window.innerWidth; // Get the screen width

  if (filteredImages) {
    if (screenWidth <= 800) {
      for (let i = 0; i < filteredImages.length; i += 2) {
        rows.push(filteredImages.slice(i, i + 2));
      }
    } else {
      for (let i = 0; i < filteredImages.length; i += 4) {
        rows.push(filteredImages.slice(i, i + 4));
      }
    }
  }



  return (
    <>
      <h1>Partners & Clients</h1>      
      <table className="partner-table">
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((img) => (
                <td key={img.name} className="partner-cell">
                  <img src={img.src} alt={img.name} className="partner-logo" />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </>
  );
};

export default Partner;
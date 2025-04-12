import React from "react";
import "./partner.css";

const Partner = ({ data }) => {
  const filteredImages = data?.images
  ?.filter(
    (img) =>
      img.category === "partners" &&
      !["partner 13", "partner 14", "partner 15"].includes(img.name)
  )
  ?.sort((a, b) => {
    // Extraire le numéro depuis le nom "partnerX"
    const numA = parseInt(a.name.replace("partner", ""));
    const numB = parseInt(b.name.replace("partner", ""));
    return numA - numB;
  });

  // Group images into rows
  const rows = [];
  const screenWidth = window.innerWidth;

  if (filteredImages) {
    const step = screenWidth <= 800 ? 2 : 4;
    for (let i = 0; i < filteredImages.length; i += step) {
      rows.push(filteredImages.slice(i, i + step));
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
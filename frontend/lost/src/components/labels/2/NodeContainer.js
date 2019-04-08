import React from "react";
import "./labels.scss";
export default () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="labels-svg">
      <rect className="labels-rect" />
      <foreignObject className="labels-foreign-object">
        <div xmlns="http://www.w3.org/1999/xhtml" className="labels-xhtml">
          <button>Test</button>
        </div>
      </foreignObject>
    </svg>
  );
};

// '<foreignObject x="15" y="10" width="100%" height="100%">'

// '<svg  width="390" height="65">' +
// '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
// '<foreignObject x="15" y="10" width="100%" height="100%">' +
// '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:40px">' +
// " <em>I</em> am" +
// '<span style="color:white; text-shadow:0 0 20px #000000;">' +
// " HTML in SVG!</span>" +
// "</div>" +
// "</foreignObject>" +
// "</svg>";

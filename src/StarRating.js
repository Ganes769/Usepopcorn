import { useState } from "react";

const containertyle = {
  display: "flex",
  gap: "18px",
  alignItems: "center",
};
const starContainerStyle = {
  display: "flex",
  gap: "4px",
};

const starStyle = {
  height: "24px",
  width: "24px",
  display: "block",
  cursor: "pointer",
};
export default function StarRating({
  maxrating = 5,
  color = "#fcc419",
  size = 60,
  message = [],
  onsetRating,
}) {
  const [tempRating, setTempRating] = useState(0);
  function handleRating(rating) {
    setRating(rating);
    onsetRating(rating);
  }

  const [rating, setRating] = useState(0);
  const textStyle = {
    lineHeight: "1",
    margin: "-10px",
    color,
    fontSize: `${size / 1.5}px`,
    message: [],
  };
  return (
    <div style={containertyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxrating }, (_, i) => (
          <Star
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            key={i}
            color={color}
            size={size}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            onRate={() => handleRating(i + 1)}
          />
        ))}
      </div>
      <p style={textStyle}>
        {message.length === maxrating
          ? message[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  return (
    <span
      role="button"
      style={starStyle}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
      onClick={onRate}
    >
      {full ? (
        <svg
          scale={size}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          scale={size}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

// function StarRating({ maxrating = 5, color = "#fcc419", size = 48 }) {
//   const [rating, setRating] = useState(0);
//   const [tempRtaing, setTempRating] = useState(0);
//   const textStyle = {
//     lineHeight: "1",
//     margin: "0",
//     color,
//     fontSize: `${size / 1.5}px`,
//   };
//   return (
//     <div style={containertyle}>
//       <div style={starContainerStyle}>
//         {Array.from({ length: maxrating }, (_, i) => (
//           <Star
//             color={color}
//             size={size}
//             onHoverIn={() => setTempRating(i + 1)}
//             onHoverout={() => setTempRating(0)}
//             full={tempRtaing ? tempRtaing >= i + 1 : rating >= i + 1}
//             onRate={() => setRating(i + 1)}
//           />
//         ))}
//       </div>
//       <p style={textStyle}> {tempRtaing || rating || ""} </p>
//     </div>
//   );
// }
// function Star({ onRate, full, onHoverIn, onHoverout, color, size }) {
//   return (
//     <span
//       onMouseEnter={onHoverIn}
//       onMouseLeave={onHoverout}
//       onClick={onRate}
//       style={starStyle}
//     >
//       {full ? (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 20 20"
//           fill={color}
//           stroke={color}
//         >
//           <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
//         </svg>
//       ) : (
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke={color}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth="{2}"
//             d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
//           />
//         </svg>
//       )}
//     </span>
//   );
// }
// export default StarRating;

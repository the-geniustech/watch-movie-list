import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "24px",
};

const starsContainerStyle = {
  display: "flex",
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  messages: PropTypes.array,
  size: PropTypes.number,
  className: PropTypes.string,
  defaultRating: PropTypes.number,
  onSetRating: PropTypes.func,
};

export default function StarRating({
  maxRating = 5,
  color = "#fcc419",
  messages = [],
  size = 48,
  className = "",
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  function handleRating(rating) {
    setRating(() => rating);
    if (!onSetRating) return;
    onSetRating(rating);
  }

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}`,
  };

  return (
    <div className={className} style={containerStyle}>
      <div style={starsContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => i + 1).map((numStar) => (
          <Star
            key={numStar}
            color={color}
            size={size}
            onTempRating={setTempRating}
            numStar={numStar}
            onRating={handleRating}
            full={tempRating ? tempRating >= numStar : rating >= numStar}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating
          ? tempRating
          : rating || ""}
      </p>
    </div>
  );
}

function Star({ color, size, numStar, onTempRating, onRating, full }) {
  const starStyle = {
    display: "block",
    width: `${size}px`,
    hight: `${size}px`,
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      onMouseEnter={() => onTempRating(numStar)}
      onMouseLeave={() => onTempRating(null)}
      onClick={() => onRating(numStar)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill={full ? color : "none"}
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
    </span>
  );
}

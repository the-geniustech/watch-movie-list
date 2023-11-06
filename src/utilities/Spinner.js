export default function Spinner() {
  return (
    <p className="loader">
      <svg className="spinner" viewBox="0 0 50 50">
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
          stroke="#fcc419"
        ></circle>
      </svg>
    </p>
  );
}

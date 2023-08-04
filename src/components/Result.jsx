const keys = ["coord", "weather", "main", "rain", "wind"];

const Result = (props) => (
  <div>
    {keys.map((key, index) => (
      <span key={index}>
        {key.charAt(0) + key.slice(1)}: {props[key]}
      </span>
    ))}
  </div>
);

export default Result;

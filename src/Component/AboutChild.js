import React, {
  useEffect,
  useState,
} from "react";

/* useImperativeHandle Example */
// const AboutChild = forwardRef((props, ref) => {
//   const [count, setCount] = useState(0);
//   useImperativeHandle(ref, () => ({
//     onIncrement,
//   }));
//   const onIncrement = (value) => {
//     setCount(count + value);
//   };
//   return (
//     <div>
//       <Button onClick={() => onIncrement(1)}>Increment </Button>
//       <h2>count:{count}</h2>
//     </div>
//   );
// });

const AboutChild = ({ getValue }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    setCount(getValue(1));
  }, [getValue]);
  return (
    <span>{count}</span>
  );
};

export default AboutChild;

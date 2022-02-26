import { Button } from "antd";
import React, { useMemo, useState } from "react";

/* useImperativeHandle Example */
// const About = () => {
//   const ref = useRef();
//   return (
//     <div>
//       <AboutChild ref={ref} />
//       <Button onClick={() => ref.current.onIncrement(1)}>ParentCount</Button>
//     </div>
//   );
// };

/* useCallback Example */

// const About = () => {
//   const [count1, setCount1] = useState(0);
//   const [count2, setCount2] = useState(0);

//   const getValue = useCallback(
//     (value) => {
//       console.log("============Called");
//       return count2 + value;
//     },
//     [count2]
//   );

//   return (
//     <>
//       <h2>useCallBack Method</h2>
//       <span>count1:{count1}</span>
//       <br />
//       <span>count2:{count2}</span>
//       <br />
//       <Button onClick={() => setCount1(count1 + 1)}>count1</Button>
//       <Button onClick={() => setCount2(count2 + 1)}>count2</Button>
//       <AboutChild getValue={getValue} />
//     </>
//   );
// };

/* useMemo Example */

const About = () => {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const getEven = useMemo(() => {
    console.log("Even Function Call");
    return count1 % 2 === 0;
  }, [count1]);

  return (
    <>
      <h2>useMemo</h2>
      <h3>count1: {count1}</h3>
      <h3>count2: {count2}</h3>
      {getEven ? "Even" : "odd"}
      <Button onClick={() => setCount1(count1 + 1)}>count1</Button>
      <Button onClick={() => setCount2(count2 + 1)}>count2</Button>
    </>
  );
};

export default About;

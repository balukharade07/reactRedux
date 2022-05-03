import { Button } from "antd";
import React, { useContext } from "react";
import { MyContext } from "./Contact";

const ContactChild = () => {
  const myContext = useContext(MyContext);
    return (
      // <MyContext.Consumer>
      //   {({ userName, value, incrementAndDecrement }) => {
      //     return (
      //       <>
      //         <span>{userName}</span>
      //         <Button onClick={() => incrementAndDecrement(1, "Increment")}>
      //           Increment
      //         </Button>
      //         <span>{value}</span>
      //         <Button
      //           disabled={value === 0}
      //           onClick={() => incrementAndDecrement(1, "Decrement")}
      //         >
      //           Decrement
      //         </Button>
      //       </>
      //     );
      //   }}
      // </MyContext.Consumer>
      <>
        <h1>{myContext.userName}</h1>
        <Button onClick={() => myContext.setCount(myContext.count+1)}>Increment</Button>
        <span>{myContext.count}</span>
        <Button disabled={myContext.count===0} onClick={() => myContext.setCount(myContext.count-1)}>Decrement</Button>
      </>
    );
}

export default ContactChild;

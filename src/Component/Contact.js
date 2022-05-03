// import React, { useEffect, useState } from 'react'

// const Contact = () => {
//   const [value, setValue] = useState(null);
//   useEffect(() => {
//     const data = [4,3,2, 1, 1,2,3,4,5];
//     const duplicate = data.filter((item, index) => data.indexOf(item) !== index);
//     const sum = data.filter((item, index) => item % 2 === 0);
//     setValue(duplicate);
//   },[]);

//   return (
//     <div>
//       {value?.map((item,i) => {
//         return (
//           <span key={i}>{item}</span>
//         )
//       })}
//     </div>
//   )
// }

// export default Contact


// import React, { Component } from 'react'
// import ContactChild from './ContactChild';

// export const MyContext = React.createContext();
// class Contact extends Component {
//   constructor(){
//     super();
//     this.state = {
//       userName: 'Balu Kharade',
//       value: 0
//     }
//   }

//   incrementAndDecrement = (count, type) => {
//     if(type === "Increment"){
//       this.setState({
//         value: this.state.value +count
//       })
//     } else {
//       this.setState({
//         value: this.state.value-count
//       })
//     }
//   }

//   render() {
//     return (
//       <MyContext.Provider value={{...this.state, incrementAndDecrement:this.incrementAndDecrement}}>
//         <ContactChild />
//       </MyContext.Provider>
//     )
//   }
// }

// export default Contact


import { Button } from 'antd';
import React, { useState } from 'react'
import ContactChild from './ContactChild';
export const MyContext = React.createContext();
const Contact = () => {
  const [count, setCount] = useState(0);
  return (
    <MyContext.Provider value={{userName:'Balu Kharade',count, setCount}}>
      <ContactChild />
      <Button onClick={()=>setCount(count+1)}>Increment</Button>
    </MyContext.Provider>
  )
}

export default Contact;
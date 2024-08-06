import React, { useState } from 'react';

function Person() {
    const [person, setPerson] = useState({ firstName: "John", lastName: "Walker", age: 100 });
  
    const handleIncreaseAge = () => {
      console.log("in handleIncreaseAge (before setPerson call): ", person);
      setPerson({ ...person, age: person.age + 1 });
      // we've called setPerson, surely person has updated?
      console.log("in handleIncreaseAge (after setPerson call): ", person);
    };
  
    // this console.log runs every time the component renders
    // what do you think this will print?
    console.log("during render: ", person);
  
    return (
      <>
        <h1>{person.firstName}</h1>
        <h1>{person.lastName}</h1>
        <h2>{person.age}</h2>
        <input type='text' value={person.firstName}
            onChange={(event) => setPerson({...person, firstName: event.target.value})}>
        </input> 
        <input type='text' value={person.lastName} 
            onChange={(event) => setPerson({...person, lastName: event.target.value})}>
        </input> 
        <button onClick={handleIncreaseAge}>Increase age</button>
      </>
    );
  }
 
  export default Person
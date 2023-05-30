import React from "react";
import styled from 'styled-components';

// CSS in JS / styled-components
const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;

// style trên 1 component khác
const TomatoButton = styled(Button)`
  color: tomato;
  border-color: tomato;
`;

// style lồng con
const Test = ({className}) => {
  return (
    <div className={className}>
      <div className="test">Hello</div>
    </div>
  )
}
const Test2 = styled(Test)`
  .test {
    background-color: palegreen;
  }
`;

const UseStyledComp = () => {
  return (
    <>
      <TomatoButton>Hello</TomatoButton>
      <Test2/>
    </>
  );
};
export default UseStyledComp;
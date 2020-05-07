import styled, { keyframes } from "styled-components";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: .2rem solid grey;
  border-right: .2rem solid grey;
  border-bottom: .2rem solid grey;
  border-left: .4rem solid black;
  background: transparent;
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
`;

export default Spinner
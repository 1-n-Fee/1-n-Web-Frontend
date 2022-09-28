import React from "react";
import styled, { keyframes } from "styled-components";

const Loading = () => {
  return (
    <TotalStyle>
      <TotalWrapper>
        <Wrapper>
          <FoodWrapper>
            <Food delay={"-0.67s"}></Food>
            <Food delay={"-0.33s"}></Food>
            <Food delay={"0s"}></Food>
          </FoodWrapper>
          <PackManWrapper>
            <UpperJaw></UpperJaw>
            <LowerJaw></LowerJaw>
          </PackManWrapper>
        </Wrapper>
      </TotalWrapper>
    </TotalStyle>
  );
};

export default Loading;

const upperJawAnimation = keyframes`
0% { transform: rotate(0deg) }
50% { transform: rotate(-45deg) }
100% { transform: rotate(0deg) }

`;

const lowerJawAnimation = keyframes`
0% { transform: rotate(180deg) }
   50% { transform: rotate(225deg) }
  100% { transform: rotate(180deg) }
`;

const foodFadeAnimation = keyframes`
0% { transform: translate(190px,0); opacity: 0 }
20% { opacity: 1 }
100% { transform: translate(70px,0); opacity: 1 }
`;
const TotalWrapper = styled.div`
  width: 200px;
  height: 200px;
  display: inline-block;
  overflow: hidden;
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform: translateZ(0) scale(1);
  backface-visibility: hidden;
  transform-origin: 0 0;
`;

const PackManWrapper = styled.div`
  transform: translate(-7.5px, 0);
`;

const UpperJaw = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 30px;
  border-radius: 60px 60px 0 0;
  background: #ffc15c;
  animation: ${upperJawAnimation} 1s linear infinite;
  transform-origin: 30px 30px;
`;

const LowerJaw = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 60px;
  height: 30px;
  border-radius: 60px 60px 0 0;
  background: #ffc15c;
  animation: ${lowerJawAnimation} 1s linear infinite;
  transform-origin: 30px 30px;
`;

// const SideFace = styled.div`
//   position: absolute;
//   top: 40px;
//   left: 40px;
//   width: 120px;
//   height: 60px;
//   border-radius: 120px 120px 0 0;
//   background: #ffc15c;
//   transform: rotate(-90deg);
//   animation: none;
// `;

const FoodWrapper = styled.div`
  display: block;
`;

const Food = styled.div`
  position: absolute;
  top: 46px;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #f35a3c;
  animation: ${foodFadeAnimation} 1s linear infinite;
  animation-delay: ${({ delay }) => delay};
`;
const TotalStyle = styled.div`
  box-sizing: content-box;
`;

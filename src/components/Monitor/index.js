import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #1e1f21;
  color: #dcdddd;
  padding: 16px;
`;
const TextWrapper = styled.span`
  font-size: 32px;
`;
const TitleWrapper = styled(TextWrapper)`
  font-weight: 700;
  margin-right: 8px;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  align-items: center;
`;
const ButtonWrapper = styled.button`
  border: unset;
  background-color: #565759;
  height: 20px;
  margin-right: 2px;
  border-radius: 4px;
  color: #e6e6e6;
`;
const TodayButton = styled(ButtonWrapper)`
  font-weight: 700;
  padding-right: 16px;
  padding-left: 16px;
`;

const Monitor = ({ today }) => {
  return (
    <Wrapper>
      <div>
        <TitleWrapper>{today.format("MMMM")}</TitleWrapper>
        <TextWrapper>{today.format("YYYY")} </TextWrapper>
      </div>
      <ButtonsWrapper>
        <ButtonWrapper> &lt; </ButtonWrapper>
        <TodayButton>Today</TodayButton>
        <ButtonWrapper> &gt; </ButtonWrapper>
      </ButtonsWrapper>
    </Wrapper>
  );
};

export { Monitor };

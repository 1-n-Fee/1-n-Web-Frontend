import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import styled from "styled-components";
const AccordionLayout = ({
  title,
  activeIndex,
  index,
  children,
  handleSetIndex,
}) => {
  return (
    <LayoutWrapper>
      <TitleWrapper onClick={() => handleSetIndex(index)}>
        <div>{title}</div>
        {activeIndex !== index && (
          <div>
            <FontAwesomeIcon icon={solid("chevron-right")} />
          </div>
        )}
      </TitleWrapper>
      {activeIndex === index && <ChildWrapper>{children}</ChildWrapper>}
    </LayoutWrapper>
  );
};

export default AccordionLayout;

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 5px;
  border-bottom: solid rgba(1, 1, 1, 0.2);
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;
const LayoutWrapper = styled.div`
  width: 600px;
  border: solid rgba(1, 1, 1, 0.3);
`;

const ChildWrapper = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  padding: 5px;
  height: 150px;
  justify-content: space-between;
`;

import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FlexRowDiv } from "./Header";
import { SpanWrapper } from "../home/meal_detail";
import { searchDetailAtom } from "../../recoil/search/atom";
import { useRecoilState } from "recoil";
import axios from "axios";
import RequestStateTag from "../history/RequestStateTag";
const SearchItem = ({ post }) => {
  const [searchDetail, setSearchDetail] = useRecoilState(searchDetailAtom);
  const getDetail = async () => {
    const auth = localStorage.getItem("Authorization");
    await axios
      .get(`http://localhost:8080/post/${post.postId}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then((res) => {
        console.log(res);
        setSearchDetail({ isOpen: true, postId: post.postId, data: res.data });
      })
      .catch((e) => console.log(e));
  };
  return (
    <LiWrapper
      style={{ cursor: "pointer" }}
      onClick={() => {
        console.log(post);
        getDetail();
      }}
    >
      <DivWrapper>
        <StoreWrapper>{post.storeName}</StoreWrapper>
        <CurrentWrapper>
          <FontAwesomeIcon icon={solid("user")} />
          {post.currentNumber}/{post.limitNumber}
        </CurrentWrapper>

        <RequestStateTag state={post.state} />
        {/*post.state === "OWNER" && <OwnerWrapper>{post.state}</OwnerWrapper>*/}
        {/*!post.state && <StateWrapper>미참여</StateWrapper>*/}
      </DivWrapper>
      <InfoWrapper>
        <FlexRowDiv>
          <InfoSpan>마감시간</InfoSpan>
          <div>{post.closeTime}</div>
        </FlexRowDiv>
        <FlexRowDiv>
          <InfoSpan>배달비</InfoSpan>
          <div> {post.deliveryFee}</div>
        </FlexRowDiv>
      </InfoWrapper>
    </LiWrapper>
  );
};
export default SearchItem;
const InfoWrapper = styled.ul`
  padding: 0 7px;
  margin-top: 1rem;
`;

const InfoSpan = styled(SpanWrapper)`
  width: 3.5rem;
`;
const DivWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const LiWrapper = styled.li`
  width: 100%;
  height: 10rem;
  border: solid 1px rgba(0, 0, 0, 0.2);
  padding 0.3rem 0;
`;

const StoreWrapper = styled.span`
  display: block;
  font-weight: 700;
  font-size: 1.2rem;
  width: 60%;
`;
const CurrentWrapper = styled.span`
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  gap: 2px;
`;
const StateWrapper = styled.span`
  font-size: 0.8rem;
  display: block;
  text-align: center;
  line-height: 1.7rem;
  width: 3.4rem;
  height: 1.7rem;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border-radius: 1rem;
`;
const OwnerWrapper = styled(StateWrapper)`
  background-color: lightseagreen;
`;

import React, { useEffect } from "react";
import { useState } from "react";
import { SignUpSelectStyle } from "./../style/SignUpStyle";
// 뭰만하면 서버에서 받는 방식으로 바꾸기
const majorData = [
  {
    college: "문과대학",
    majors: [
      "국어국문학과",
      "영어영문학과",
      "중어중문학과",
      "철학과",
      "사학과",
      "미디어커뮤니케이션학과",
      "문화콘텐츠학과",
      "지리학과",
    ],
  },
  { college: "이과대학", majors: ["수학과", "물리학과", "화학과"] },
  { college: "건축대학", majors: ["건축학부", "건축학전공", "건축공학전공"] },
  {
    college: "공과대학",
    majors: [
      "사회환경공학부",
      "산업경영공학부",
      "기계항공공학부",
      "전기전자공학부",
      "화학공학부",
      "컴퓨터공학부",
      "K-뷰티산업공학과",
      "생물공학과",
    ],
  },
  {
    college: "사회과학대학",
    majors: [
      "정치외교학과",
      "행정학과",
      "경제학과",
      "국제무역학과",
      "응용통계학과",
      "융합인재학과",
      "글로벌비즈니스학과",
    ],
  },
  { college: "경영대학", majors: ["경영학과", "기술경영학과"] },
  { college: "부동산과학원", majors: ["부동산학과"] },
  {
    college: "KU융합과학기술원",
    majors: [
      "미래에너지공학과",
      "스마트운행체공학과",
      "스마트ICT융합공학과",
      "화장품공학과",
      "줄기세포재생공학과",
      "의생명공학과",
      "특성화학부",
      "시스템생명공학과",
      "융합생명공학과",
    ],
  },
  {
    college: "상허생명과학대학",
    majors: [
      "생명과학특성학과",
      "동물자원학과",
      "식량자원학과",
      "축산식품생명공학과",
      "식품유통공학과",
      "환경보건과학과",
      "산림조경학과",
    ],
  },
  { college: "수의과대학", majors: ["수의예과", "수의학과"] },
  {
    college: "예술디자인대학",
    majors: [
      "커뮤니케이션디자인학과",
      "산업디자인학과",
      "의상디자인학과",
      "리빙디자인학과",
      "현대미술학과",
      "영상영화학과",
    ],
  },
  {
    college: "사범대학",
    majors: [
      "영상영화학과",
      "일어교육과",
      "수학교육과",
      "체육교육과",
      "음악교육과",
      "영어교육과",
      "교육공학과",
    ],
  },
];

const DEFAULT = "학과를 선택하세요";

const MajorSelect = ({ majorKey, setData }) => {
  const onChange = (e) => {
    const value = e.target.value;
    value === DEFAULT
      ? setData((cur) => ({ ...cur, [majorKey]: "" }))
      : setData((cur) => ({ ...cur, [majorKey]: e.target.value }));
  };

  return (
    <>
      <SignUpSelectStyle width={"170px"} onChange={onChange}>
        <option name="placeholder" defaultValue={true}>
          {DEFAULT}
        </option>
        {majorData.map((md, mdKey) => (
          <optgroup label={md.college} key={`majorOptGroup_${mdKey}`}>
            {md.majors.map((m, key) => (
              <option key={`major_${key}`} value={m}>
                {m}
              </option>
            ))}
          </optgroup>
        ))}
      </SignUpSelectStyle>
    </>
  );
};

export default MajorSelect;

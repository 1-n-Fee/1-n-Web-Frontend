import React from "react";
import SideBar from "../component/home/sideBar";
import Map from "../component/home/map";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Home = (props) => {
  const [meals, setMeals] = useState([
    [
      {
        title: "영심이",
        endTime: "10:45",
        maxParty: 5,
        curParty: 1,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "버거킹",
        endTime: "10:45",
        maxParty: 5,
        curParty: 2,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "김가네",
        endTime: "10:45",
        maxParty: 5,
        curParty: 3,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "부리또피아",
        endTime: "10:45",
        maxParty: 6,
        curParty: 2,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "가츠시",
        endTime: "10:45",
        maxParty: 5,
        curParty: 4,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
    ],
    [
      {
        title: "콩불",
        endTime: "10:45",
        maxParty: 5,
        curParty: 2,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "부리또피아",
        endTime: "10:45",
        maxParty: 5,
        curParty: 2,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "nn네집밥",
        endTime: "10:45",
        maxParty: 5,
        curParty: 2,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
    ],
    [
      {
        title: "피자헛",
        endTime: "10:45",
        maxParty: 5,
        curParty: 1,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "ㄱㄱ치킨집",
        endTime: "10:45",
        maxParty: 5,
        curParty: 3,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
      {
        title: "ㅇㅇ네 분식",
        endTime: "10:45",
        maxParty: 5,
        curParty: 2,
        meetup: "예디대 레스티오 앞",
        description: "테스트용으로 제작한 설명입낟.",
      },
    ],
  ]);
  const [mealListEntry, setMealListEntry] = useState([
    {
      title: "영심이",
      endTime: "10:45",
      maxParty: 5,
      curParty: 1,
      meetup: "예디대 레스티오 앞",
      description: "테스트용으로 제작한 설명입낟.",
    },
    {
      title: "버거킹",
      endTime: "10:45",
      maxParty: 5,
      curParty: 2,
      meetup: "예디대 레스티오 앞",
      description: "테스트용으로 제작한 설명입낟.",
    },
    {
      title: "김가네",
      endTime: "10:45",
      maxParty: 5,
      curParty: 3,
      meetup: "예디대 레스티오 앞",
      description: "테스트용으로 제작한 설명입낟.",
    },
    {
      title: "부리또피아",
      endTime: "10:45",
      maxParty: 6,
      curParty: 2,
      meetup: "예디대 레스티오 앞",
      description: "테스트용으로 제작한 설명입낟.",
    },
    {
      title: "가츠시",
      endTime: "10:45",
      maxParty: 5,
      curParty: 4,
      meetup: "예디대 레스티오 앞",
      description: "테스트용으로 제작한 설명입낟.",
    },
  ]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [markers, setMarkers] = useState([
    {
      id: 0,
      loc: "예술디자인대학",
      lat: 37.54261173274716,
      lng: 127.07307481826922,
      cnt: 1,
    },
    {
      id: 1,
      loc: "신공학관",
      lat: 37.54058947998299,
      lng: 127.07929614255553,
      cnt: 2,
    },
    {
      id: 2,
      loc: "창의관",
      lat: 37.54120065704228,
      lng: 127.08150324977531,
      cnt: 3,
    },
    {
      loc: "공학관 C동",
      lat: 37.5412068046834,
      lng: 127.07908746549997,
      cnt: 4,
    },
    {
      loc: "공학관 B동",
      lat: 37.54205359946285,
      lng: 127.07930335082126,
      cnt: 5,
    },
    {
      loc: "공학관 A동",
      lat: 37.54168014268517,
      lng: 127.0786183825297,
      cnt: 6,
    },
    {
      loc: "학생회관",
      lat: 37.54202733146455,
      lng: 127.07816047726529,
      cnt: 7,
    },
    {
      loc: "제2학생회관",
      lat: 37.541140000824235,
      lng: 127.07792758999081,
      cnt: 8,
    },
    {
      loc: "법학관",
      lat: 37.541898777083645,
      lng: 127.07493548683621,
      cnt: 9,
    },
    {
      loc: "생명과학관",
      lat: 37.54105211721766,
      lng: 127.07449334834851,
      cnt: 10,
    },
    {
      loc: "건축관",
      lat: 37.543721074079144,
      lng: 127.07836592556212,
      cnt: 11,
    },
    {
      loc: "부동산학관",
      lat: 37.543428433182726,
      lng: 127.078088389104,
      cnt: 12,
    },
    {
      loc: "경영관",
      lat: 37.544398419769436,
      lng: 127.0759224514165,
      cnt: 13,
    },
    {
      loc: "레이크홀",
      lat: 37.53936550446862,
      lng: 127.07720724692878,
      cnt: 14,
    },
    {
      loc: "비전홀",
      lat: 37.53949104159542,
      lng: 127.07812388497706,
      cnt: 15,
    },
    {
      loc: "프론티어홀",
      lat: 37.5396346445722,
      lng: 127.07896134056534,
      cnt: 16,
    },
    {
      loc: "글로벌홀",
      lat: 37.539134801405076,
      lng: 127.07864399719243,
      cnt: 17,
    },
    {
      loc: "드림홀",
      lat: 37.538985572134216,
      lng: 127.07948679638467,
      cnt: 18,
    },
    {
      loc: "과학관",
      lat: 37.54162479414432,
      lng: 127.08053060054611,
      cnt: 19,
    },
    {
      loc: "인문학관",
      lat: 37.54247763202131,
      lng: 127.07846080471758,
      cnt: 20,
    },
  ]);
  //const [selectedMarker, setSelectedMarker] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const findEntry = (id) => {
    //const entry = { ...meals[id] };
    setMealListEntry(meals[id]);
    setIsDetailOpen(false);
  };

  return (
    <HomeWrapper>
      <SideBar
        meals={mealListEntry}
        onMealClick={setSelectedMeal}
        selectedMeal={selectedMeal}
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
      <Map
        markers={markers}
        //setSelectedMarker={setSelectedMarker}
        onMarkerClick={findEntry}
      />
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  box-sizing: border-box;
  margin: 0;
`;

/*global kakao*/
import React, { useEffect } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Map = ({ markers, selectedMarker, setSelectedMarker, onMarkerClick }) => {
  const mapRef = useRef();
  const options = {
    center: new kakao.maps.LatLng(37.54184788997097, 127.07700613166341),
    level: 3,
  };
  /*
  const markerPosititon = markers.map(
    (marker) => new kakao.maps.LatLng(marker.lat, marker.lng)
  );
*/
  /*
  new kakao.maps.LatLng(
    37.54184788997097,
    127.07700613166341
  );
*/
  useEffect(() => {
    const map = new kakao.maps.Map(mapRef.current, options);
    markers.forEach((item) => {
      const position = new kakao.maps.LatLng(item.lat, item.lng);
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);
      const content =
        '<div class="customoverlay">' +
        '  <a  target="_blank">' +
        `    <span class="title">${item.cnt}</span>` +
        "  </a>" +
        "</div>";

      const overlay = new kakao.maps.CustomOverlay({
        content,
        position,
        yAnchor: 0.1,
      });
      kakao.maps.event.addListener(marker, "mouseover", function () {
        overlay.setMap(map);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        overlay.setMap(null);
      });
      kakao.maps.event.addListener(marker, "click", function () {
        console.log("clicked marker");
        for (let i = 0; i < markers.length; i++) {
          // 서버 통신
          if (
            marker.getPosition().getLat() === markers[i].lat &&
            marker.getPosition().getLng() === markers[i].lng
          ) {
            console.log("found marker");
            console.log(markers[i]);
            const selMarker = { ...markers[i] };
            //setSelectedMarker(selMarker);
            onMarkerClick(i);
            break;
          }
        }
      });
      /*
      const iwContent = `<div style="padding:5px;">${item.cnt}</div>`;
      const infoWindow = new kakao.maps.InfoWindow({ content: iwContent });

      kakao.maps.event.addListener(marker, "mouseover", function () {
        infoWindow.open(map, marker);
      });
      kakao.maps.event.addListener(marker, "mouseout", function () {
        infoWindow.close();
      });
      */
    });
    /*
    markerPosititon.forEach((position) => {
      const marker = new kakao.maps.Marker({ position });
      marker.setMap(map);
      const iwContent = `<div style="padding:5px;">${position.cnt}</div>`
    });
    */
    /*
    const marker = new kakao.maps.Marker({ position: markerPosititon });
    marker.setMap(map);
    map.relayout(); // 필요한 지 고민 필요
    */
  }, []);

  return <MapWrapper ref={mapRef} id="map"></MapWrapper>;
};

export default Map;

const MapWrapper = styled.div`
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;
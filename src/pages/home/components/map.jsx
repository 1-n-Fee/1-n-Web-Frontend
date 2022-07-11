/*global kakao*/
import React, { useEffect } from "react";
import { useRef } from "react";

const Map = ({ markers, selectedMarker, onMarkerClick }) => {
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
        '  <a href="https://map.kakao.com/link/map/11394059" target="_blank">' +
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

  return (
    <div>
      <div
        ref={mapRef}
        id="map"
        style={{
          width: "100vw",
          height: "100vh",
        }}
      ></div>
    </div>
  );
};

export default Map;

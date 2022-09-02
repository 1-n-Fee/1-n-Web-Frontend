import React, { useState, useEffect } from "react";
import { useDaumPostcodePopup } from "react-daum-postcode";
import { SignUpCheckBtnStyle, SignUpInputStyle } from "../../style/SignUpStyle";

const AddressInput = ({ setAddress }) => {
  const open = useDaumPostcodePopup();
  const [briefAddress, setBriefAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    setBriefAddress(fullAddress); // e.g. '서울 성동구 왕십리로2길 20 (성수동1가)'
  };

  const handleClick = () => {
    open({ onComplete: handleComplete });
  };

  const onDetailAddressChange = (e) => {
    setDetailAddress(e.target.value);
  };

  useEffect(() => {
    setAddress(`${briefAddress} ${detailAddress}`);
  }, [briefAddress, detailAddress]);
  return (
    <div>
      <SignUpInputStyle
        width={"220px"}
        type="text"
        value={briefAddress}
        placeholder={"주소"}
      />
      <SignUpCheckBtnStyle type="button" onClick={handleClick}>
        주소 찾기
      </SignUpCheckBtnStyle>
      <div>
        <SignUpInputStyle
          width={"220px"}
          type="text"
          value={detailAddress}
          placeholder={"상세주소"}
          onChange={onDetailAddressChange}
        />
      </div>
    </div>
  );
};

export default AddressInput;

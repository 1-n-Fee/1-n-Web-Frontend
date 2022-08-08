import React, { useState } from "react";

const HistoryPartyList = () => {
  const [users, setUsers] = useState([
    {
      username: "닉닉넴",
      orderList: [
        { foodName: "참치 김밥", price: 3500 },
        { foodName: "우동", price: 6000 },
        { foodName: "돈까스", price: 9000 },
      ],
    },
    {
      username: "닉네힘",
      orderList: [
        { foodName: "안심돈까스", price: 10000 },
        { foodName: "냉모밀", price: 7000 },
      ],
    },
    {
      username: "닉네네",
      orderList: [{ foodName: "야채 김밥", price: 3000 }],
    },
  ]);

  const onMouseEnter = (e) => {
    const targetName = e.target.dataset.name;
    console.log(targetName);
  };

  const onMouseLeave = () => {
    console.log("ousts");
  };
  return (
    <div>
      <ul>
        {users.map((u, key) => (
          <li
            key={`user_${key}`}
            data-name={u.username}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <span data-name={u.username}>🍕</span>
            <strong data-name={u.username}>{u.username}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPartyList;

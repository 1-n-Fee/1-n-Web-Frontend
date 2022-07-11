import React from "react";

const MealItem = ({ meal, onMealClick }) => {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(280);

  const toggleMenu = () => {
    if (xPosition > 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(280);
      setOpen(false);
    }
  };

  const handleClose = async (e) => {
    let sideArea = detail.current;
    let sideCildren = detail.current.contains(e.target);
    if (isOpen && (!sideArea || !sideCildren)) {
      await setX(280);
      await setOpen(false);
    }
  };

  return (
    <li
      onClick={() => {
        onMealClick(meal);
        toggleMenu();
      }}
    >
      <div>
        <p>{meal.title}</p>
        <span>1/3</span>
        <span>미참여</span>
      </div>
      <ul>
        <li>마감시간</li>
        <li>장소</li>
        <li>배달비</li>
      </ul>
    </li>
  );
};

export default MealItem;

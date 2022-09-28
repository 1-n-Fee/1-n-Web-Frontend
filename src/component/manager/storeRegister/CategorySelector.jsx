import React from "react";
import { useState } from "react";
import { FOOD_CATEGORY } from "../../../constants/arrays";
import Tag from "../../common/Tag";
import PropTypes from "prop-types";

const CategorySelector = ({ setData }) => {
  const [selectedCategory, setSelectedCategory] = useState(
    FOOD_CATEGORY[0].ENG
  );
  const onTabClick = (e) => {
    const category = e.target.dataset.key;
    setSelectedCategory(category);
    setData(category);
  };

  return (
    <div>
      {FOOD_CATEGORY.map((f, key) => (
        <Tag
          isClicked={f.ENG === selectedCategory}
          title={f.KOR}
          onClick={onTabClick}
          dataKey={f.ENG}
        />
      ))}
    </div>
  );
};

CategorySelector.propTypes = {
  setData: PropTypes.func.isRequired,
};

export default CategorySelector;

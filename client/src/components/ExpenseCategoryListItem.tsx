import CategoryIconLookUp from "../utils/CategoryIconLookUp";
import classnames from "classnames";
interface Props {
  category: string;
  selectedCategory: string;
  handleToggle?: (category: string) => void;
  showLabel?: boolean;
}
const ExpenseCategoryListItem = ({
  category,
  handleToggle = () => {},
  selectedCategory,
  showLabel = true,
}: Props) => {
  return (
    <div
      className="expense-category-list-item-container"
      onClick={() => handleToggle(category)}
    >
      <CategoryIconLookUp
        category={category}
        className={classnames({
          "selected-category": selectedCategory === category,
          "category-icon": selectedCategory !== category,
        })}
      />
      {showLabel && <label>{category}</label>}
    </div>
  );
};

export default ExpenseCategoryListItem;

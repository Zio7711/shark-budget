import {
  AiFillCar,
  AiOutlineCoffee,
  AiOutlineGift,
  AiOutlineMoneyCollect,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import {
  BiBaseball,
  BiBed,
  BiBookOpen,
  BiBuildingHouse,
  BiCookie,
  BiPencil,
  BiWine,
} from "react-icons/bi";
import { BsCart2, BsPhone } from "react-icons/bs";
import {
  FaDog,
  FaHeadphonesAlt,
  FaHouseUser,
  FaRegHandshake,
  FaRegHospital,
  FaRegLemon,
  FaRegMoneyBillAlt,
  FaShippingFast,
} from "react-icons/fa";
import {
  GiAutoRepair,
  GiBananaBunch,
  GiBroccoli,
  GiMoneyStack,
  GiMountainCave,
  GiPartyPopper,
} from "react-icons/gi";
import {
  IoCashOutline,
  IoRestaurantOutline,
  IoSchoolOutline,
  IoShirtOutline,
  IoTrainOutline,
} from "react-icons/io5";
import { TbBabyCarriage, TbHeartHandshake } from "react-icons/tb";

import { CgGirl } from "react-icons/cg";
import { CgMoreO } from "react-icons/cg";
import { FiTool } from "react-icons/fi";

// import {

interface Props {
  category: string;
  fill?: string;
  size?: string;
  className?: string;
}

const CategoryIconLookUp = ({
  category,
  fill = "black",
  size = "1em",
  className = "category-icon",
}: Props) => {
  const iconProps = { fill, size, className };

  switch (category) {
    case "fruit":
      return <GiBananaBunch {...iconProps} />;

    case "restaurant":
      return <IoRestaurantOutline {...iconProps} />;

    case "groceries":
      return <BsCart2 {...iconProps} />;

    case "coffee":
      return <AiOutlineCoffee {...iconProps} />;

    case "transport":
      return <IoTrainOutline {...iconProps} />;

    case "veggies":
      return <GiBroccoli {...iconProps} />;

    case "exercise":
      return <BiBaseball {...iconProps} />;

    case "entertain":
      return <GiPartyPopper {...iconProps} />;

    case "comm":
      return <BsPhone {...iconProps} />;

    case "clothing":
      return <IoShirtOutline {...iconProps} />;

    case "beauty":
      return <CgGirl {...iconProps} />;

    case "rent":
      return <BiBuildingHouse {...iconProps} />;

    case "furniture":
      return <BiBed {...iconProps} />;

    case "kids":
      return <TbBabyCarriage {...iconProps} />;

    case "pets":
      return <FaDog {...iconProps} />;

    case "social":
      return <FaRegHandshake {...iconProps} />;

    case "travel":
      return <GiMountainCave {...iconProps} />;

    case "alcohol":
      return <BiWine {...iconProps} />;

    case "electronics":
      return <FaHeadphonesAlt {...iconProps} />;

    case "car":
      return <AiFillCar {...iconProps} />;

    case "medical":
      return <FaRegHospital {...iconProps} />;

    case "education":
      return <IoSchoolOutline {...iconProps} />;

    case "books":
      return <BiBookOpen {...iconProps} />;

    case "gifts":
      return <AiOutlineGift {...iconProps} />;

    case "utilities":
      return <GiAutoRepair {...iconProps} />;

    case "repair":
      return <FiTool {...iconProps} />;

    case "donation":
      return <TbHeartHandshake {...iconProps} />;

    case "lottery":
      return <IoCashOutline {...iconProps} />;

    case "delivery":
      return <FaShippingFast {...iconProps} />;

    case "family":
      return <FaHouseUser {...iconProps} />;

    case "other":
      return <CgMoreO {...iconProps} />;

    case "salary":
      return <AiOutlineMoneyCollect {...iconProps} />;

    case "bonus":
      return <AiOutlineShoppingCart {...iconProps} />;

    case "investment":
      return <GiMoneyStack {...iconProps} />;

    case "part-time":
      return <FaRegMoneyBillAlt {...iconProps} />;

    case "snacks":
      return <BiCookie {...iconProps} />;

    default:
      return <FaRegLemon {...iconProps} />;
  }
};

export default CategoryIconLookUp;

// todo: consider types
export const expenseCategories = [
  "fruit",
  "restaurant",
  "groceries",
  "coffee",
  "transport",
  "veggies",
  "snacks",
  "exercise",
  "entertain",
  "comm",
  "clothing",
  "beauty",
  "rent",
  "furniture",
  "kids",
  "pets",
  "social",
  "travel",
  "alcohol",
  "electronics",
  "car",
  "medical",
  "education",
  "books",
  "gifts",
  "utilities",
  "repair",
  "lottery",
  "family",
  "other",
];

export const incomeCategories = [
  "salary",
  "bonus",
  "gifts",
  "lottery",
  "investment",
  "other",
];

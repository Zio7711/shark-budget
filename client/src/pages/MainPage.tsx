import "../stylesheets/MainPage.scss";

import {
  BillingStatement,
  ExpenseChart,
  ExpenseDetails,
  MyProfile,
} from "../components/mainpage";
import { SyntheticEvent, useEffect, useRef, useState } from "react";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { AddExpenseDialog } from "../components/mainpage";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";

const MainPage = () => {
  const [value, setValue] = useState<string>("details");
  const [bottomNavOffsetHeight, setBottomNavOffsetHeight] = useState<
    number | undefined
  >(0);

  const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setBottomNavOffsetHeight(bottomRef?.current?.offsetHeight);
  }, [bottomRef]);

  return (
    <div className="main-page-container">
      {value === "details" && (
        <ExpenseDetails bottomNavOffsetHeight={bottomNavOffsetHeight} />
      )}
      {value === "billing" && <BillingStatement />}
      {value === "chart" && <ExpenseChart />}
      {value === "me" && <MyProfile />}

      <div className="bottom-nav-container" ref={bottomRef}>
        <BottomNavigation
          showLabels
          sx={{ width: "45vw" }}
          value={value}
          onChange={handleChangeTab}
        >
          <BottomNavigationAction
            label="Details"
            value="details"
            icon={<ArticleOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Billing"
            value="billing"
            icon={<AccountBalanceOutlinedIcon />}
          />
        </BottomNavigation>

        <AddExpenseDialog />

        <BottomNavigation
          showLabels
          sx={{ width: "45vw" }}
          value={value}
          onChange={handleChangeTab}
        >
          <BottomNavigationAction
            label="Chart"
            value="chart"
            icon={<PieChartOutlineOutlinedIcon />}
          />
          <BottomNavigationAction
            label="Me"
            value="me"
            icon={<AccountCircleOutlinedIcon />}
          />
        </BottomNavigation>
      </div>
    </div>
  );
};

export default MainPage;

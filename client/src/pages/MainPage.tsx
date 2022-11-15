import "../stylesheets/MainPage.scss";

import * as React from "react";

import {
  AboutUs,
  BillingStatement,
  ExpenseChart,
  ExpenseDetails,
} from "../components/mainpage";

import AccountBalanceOutlinedIcon from "@mui/icons-material/AccountBalanceOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";

const MainPage = () => {
  const [value, setValue] = React.useState("details");

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="main-page-container">
      {value === "details" && <ExpenseDetails />}
      {value === "billing" && <BillingStatement />}
      {value === "chart" && <ExpenseChart />}
      {value === "me" && <AboutUs />}

      <div className="bottom-nav-container">
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

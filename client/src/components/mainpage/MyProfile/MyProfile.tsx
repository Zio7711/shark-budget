import { useEffect, useMemo, useRef, useState } from "react";

import Avatar from "react-avatar";
import MyProfileBody from "./MyProfileBody";
import dayjs from "dayjs";
import { selectAuth } from "../../../store/authSlice";
import { selectExpense } from "../../../store/expenseSlice";
import { useAppSelector } from "../../../hooks/useAppSelector";

// dayjs.extend(relativeTime);

interface Props {
  bottomNavOffsetHeight: number | undefined;
}
const MyProfile = ({ bottomNavOffsetHeight }: Props) => {
  const { user } = useAppSelector(selectAuth);
  const { expenseList } = useAppSelector(selectExpense);

  const BKeepingDays = useMemo(() => {
    const resultDays = dayjs().diff(dayjs(user?.createdAt), "day");
    return resultDays;
  }, [user]);
  const BKeepingAmount = useMemo(() => expenseList.length, [expenseList]);

  const headerRef = useRef<HTMLDivElement | null>(null);

  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);
  useEffect(() => {
    setHeaderOffsetHeight(headerRef?.current?.offsetHeight);
  }, [headerRef]);

  return (
    <div className="my-profile-container">
      <div className="my-profile-header" ref={headerRef}>
        <h2>My Profile</h2>

        <div className="header-info">
          <div className="avatar-section">
            <Avatar
              name={user ? user.name : "Me"}
              className="my-profile-avatar"
              size="4em"
            />
            <h3 className="my-profile-name">{user ? user.name : "Me"}</h3>
          </div>

          <div className="header-right">
            <div className="total-days">
              <label>{BKeepingDays}</label>
              <p>
                B-Keeping <br /> Days
              </p>
            </div>
            <div className="total-quantities">
              <label>{BKeepingAmount}</label>
              <p>
                B-Keeping <br />
                Amount
              </p>
            </div>
          </div>
        </div>
      </div>

      {headerOffsetHeight && bottomNavOffsetHeight && (
        <MyProfileBody
          bottomNavOffsetHeight={bottomNavOffsetHeight}
          headerOffsetHeight={headerOffsetHeight}
        />
      )}
    </div>
  );
};

export default MyProfile;

import * as yup from "yup";

import { selectAuth, updateUser } from "../../../store/authSlice";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import AppBackDrop from "../../AppBackDrop";
import BillingStatementBody from "./BillingStatementBody";
import MonthPicker from "../ExpenseDetails/MonthPicker";
import Swal from "sweetalert2";
import { selectExpense } from "../../../store/expenseSlice";
import useAppDispatch from "../../../hooks/useAppDispatch";
import { useAppSelector } from "../../../hooks/useAppSelector";

export const budgetSchema = yup.object().shape({
  budget: yup.number().required("Budget is required"),
});

interface Props {
  bottomNavOffsetHeight: number | undefined;
}

const BillingStatement = ({ bottomNavOffsetHeight }: Props) => {
  const headerRef = useRef<HTMLDivElement | null>(null);

  const [headerOffsetHeight, setHeaderOffsetHeight] = useState<
    number | undefined
  >(0);
  useEffect(() => {
    setHeaderOffsetHeight(headerRef?.current?.offsetHeight);
  }, [headerRef]);

  const { totalExpense, totalIncome } = useAppSelector(selectExpense);
  const { user, isLoading } = useAppSelector(selectAuth);
  const budget = useMemo(() => user?.budget || 0, [user]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!budget) {
      Swal.fire({
        title: "Please set your monthly budget!",
        input: "number",
        confirmButtonText: "OK",
        allowOutsideClick: true,
        preConfirm: async (budget) => {
          const result = await budgetSchema
            .validate({ budget })
            .catch((err) => {
              Swal.showValidationMessage("Please enter a valid budget");
            });

          if (result) {
            dispatch(updateUser({ budget: Number(budget) }));
            return budget;
          } else {
            return false;
          }
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateBudget = useCallback(() => {
    Swal.fire({
      title: "Please update your monthly budget!",
      input: "number",
      confirmButtonText: "Save",
      allowOutsideClick: true,
      preConfirm: async (budget) => {
        const result = await budgetSchema.validate({ budget }).catch((err) => {
          Swal.showValidationMessage("Please enter a valid budget");
        });

        if (result) {
          dispatch(updateUser({ budget: Number(budget) }));
          return budget;
        } else {
          return false;
        }
      },
    });
  }, [dispatch]);

  return (
    <div className="billing-statement-container">
      <div className="billing-statement-header" ref={headerRef}>
        <h2>Billing Statement</h2>

        <div className="summary">
          <div className="date">
            <MonthPicker />
          </div>
          <div className="summary-right">
            <div onClick={updateBudget}>
              <label>Budget</label>
              <p className="price">{budget}</p>
            </div>
            <div>
              <label>Savings</label>
              <p className="price">{totalIncome - totalExpense}</p>
            </div>
          </div>
        </div>
      </div>

      {headerOffsetHeight && bottomNavOffsetHeight && (
        <BillingStatementBody
          bottomNavOffsetHeight={bottomNavOffsetHeight}
          headerOffsetHeight={headerOffsetHeight}
          budget={budget}
        />
      )}

      <AppBackDrop open={isLoading} />
    </div>
  );
};

export default BillingStatement;

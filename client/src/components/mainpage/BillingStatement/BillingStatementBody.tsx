import BudgetRuleCard from "./BudgetRuleCard";
import MyBudgeCard from "./MyBudgeCard";
import MyStatementCard from "./MyStatementCard";
import { useMemo } from "react";

interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
  budget: number | null;
}

const BillingStatementBody = ({
  bottomNavOffsetHeight,
  headerOffsetHeight,
  budget,
}: Props) => {
  // calculate body height
  const bodyHeight = useMemo(() => {
    const totalHeight = window.innerHeight;
    return (
      bottomNavOffsetHeight &&
      headerOffsetHeight &&
      totalHeight - bottomNavOffsetHeight - headerOffsetHeight
    );
  }, [bottomNavOffsetHeight, headerOffsetHeight]);

  return (
    <div
      className="billing-statement-body-container"
      style={{
        marginTop: `${headerOffsetHeight}px`,
        overflow: "scroll",
        height: bodyHeight,
      }}
    >
      <MyStatementCard />
      <BudgetRuleCard budget={budget} />
      <MyBudgeCard />
    </div>
  );
};

export default BillingStatementBody;

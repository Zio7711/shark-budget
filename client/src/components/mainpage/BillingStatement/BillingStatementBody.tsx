import { useMemo } from "react";

interface Props {
  bottomNavOffsetHeight: number | undefined;
  headerOffsetHeight: number | undefined;
}

const BillingStatementBody = ({
  bottomNavOffsetHeight,
  headerOffsetHeight,
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
      BillingStatementBody
    </div>
  );
};

export default BillingStatementBody;

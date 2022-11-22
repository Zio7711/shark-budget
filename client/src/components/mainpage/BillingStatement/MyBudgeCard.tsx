import { Card, CardContent, Typography } from "@mui/material";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";

import { styled } from "@mui/material/styles";

const BorderLinearProgress: any = styled(LinearProgress)(({ theme }) => ({
  height: 30,
  borderRadius: 15,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
  },
}));

const MyBudgeCard = () => {
  return (
    <Card className="billing-statement-card">
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          My Budget Condition
        </Typography>
        <BorderLinearProgress variant="determinate" value={100} />
      </CardContent>
    </Card>
  );
};

export default MyBudgeCard;

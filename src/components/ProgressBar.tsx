import { theme } from "../constants/theme";

interface ProgressBarProps {
  percentage: number;
}

export const ProgressBar = ({
  percentage,
}: ProgressBarProps): React.ReactNode => {
  return (
    <div style={{ width: "100%", backgroundColor: theme.bgMain}}>
      <div
        style={{
          width: `${percentage}%`,
          backgroundColor: theme.progressBgColor,
          padding: "1px",
        }}
      ></div>
    </div>
  );
};

import { theme } from "../constants/theme";

interface PaperProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export const Paper = ({ children, style }: PaperProps): React.ReactNode => {
  const customStyles: React.CSSProperties = {
    boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
    borderRadius: "10px",
    padding: "30px",
    // position: "fixed",
    // left: "50%",
    // top: "15%",
    // transform: "translateX(-50%)",
    backgroundColor: theme.bgCard
  };

  return <div style={{ ...style, ...customStyles }}>{children}</div>;
};

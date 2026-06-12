import { useState } from "react";
import { theme } from "../constants/theme";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "submit" | "reset" | "button";
  variant?: "outlined" | "contained" | "text";
  style?: React.CSSProperties;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const Button = ({
  children,
  type,
  variant,
  style,
  disabled,
  onClick,
}: ButtonProps): React.ReactNode => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const customStyles: React.CSSProperties = {
    padding: "15px",
    border: disabled
      ? theme.primaryDisabled
      : variant == "outlined"
        ? isHovered
          ? "1px solid" + theme.primaryHover
          : "1px solid" + theme.borderColor
        : "1px solid transparent",
    borderRadius: "10px",
    cursor: "pointer",
    backgroundColor: disabled
      ? theme.primaryDisabled
      : !variant || variant == "contained"
        ? isHovered
          ? theme.primaryHover
          : theme.primary
        : "transparent",
    color: theme.textMain,
    fontWeight: "bold",
    width: "100%",
  };

  return (
    <button
      type={type}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ ...customStyles, ...style }}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

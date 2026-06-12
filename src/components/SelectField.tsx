import { theme } from "../constants/theme";

interface InputFieldProps {
  label: string;
  value: any;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export const SelectField = ({
  label,
  value,
  name,
  onChange,
  errorMessage,
  style,
  children,
}: InputFieldProps): React.ReactNode => {
  const customStyles: Record<string, React.CSSProperties> = {
    component: {
      maxWidth: "100%",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      padding: "8px",
      fontSize: "15px",
      borderRadius: "10px",
      backgroundColor: theme.bgMain,
      border: "1px solid" + theme.borderColor,
      color: theme.textMain,
    },
    errorMessage: {
      fontSize: "13px",
      color: theme.textError,
      fontWeight: "bold",
    },
  };

  return (
    <div style={{ ...customStyles.component, ...style }}>
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        value={value}
        name={name}
        onChange={onChange}
        style={customStyles.input}
      >
        {children}
      </select>
      {errorMessage && (
        <span style={customStyles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

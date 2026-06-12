import { theme } from "../constants/theme";

interface InputFieldProps {
  label: string;
  value: string;
  type: string;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage: string;
}

export const InputField = ({
  label,
  value,
  type,
  name,
  onChange,
  errorMessage,
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
    <div style={customStyles.component}>
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        value={value}
        type={type}
        name={name}
        onChange={onChange}
        style={customStyles.input}
      />
      {errorMessage && (
        <span style={customStyles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

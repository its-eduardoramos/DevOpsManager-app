import { theme } from "../constants/theme";

interface InputFieldProps {
  label?: string;
  value: string;
  type: string;
  name: string;
  placeholder?: string;
  style?: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  errorMessage?: string;
}

export const InputField = ({
  label,
  value,
  type,
  name,
  placeholder,
  style,
  onChange,
  errorMessage,
}: InputFieldProps): React.ReactNode => {
  const customStyles: Record<string, React.CSSProperties> = {
    component: {
      maxWidth: "100%",
      display: "flex",
      flexDirection: "column",
      gap:"5px"
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
        placeholder={placeholder}
        onChange={onChange}
        style={{ ...customStyles.input, ...style}}
      />
      {errorMessage && (
        <span style={customStyles.errorMessage}>{errorMessage}</span>
      )}
    </div>
  );
};

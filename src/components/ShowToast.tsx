import { useEffect } from "react";
import { useTimer } from "../hooks/useTimer";
import { theme } from "../constants/theme";

export interface ShowToastProps {
  seconds: number;
  title: string;
  message: string;
  type: "success" | "error" | "info";
  onClose?: () => void;
}

export const ShowToast = ({
  seconds,
  title,
  message,
  type,
  onClose,
}: ShowToastProps): React.ReactNode => {
  const { timerIsDone } = useTimer(seconds);
  const typeColors = {
    success: {
      text: theme.textSuccess,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill={theme.textSuccess}
          className="bi bi-check-circle"
          viewBox="0 0 16 16"
        >
          <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
          <path d="m10.97 4.97-.02.022-3.473 4.425-2.093-2.094a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05" />
        </svg>
      ),
    },
    error: {
      text: theme.textError,
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill={theme.textError}
          className="bi bi-exclamation-triangle"
          viewBox="0 0 16 16"
        >
          <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.15.15 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.2.2 0 0 1-.054.06.1.1 0 0 1-.066.017H1.146a.1.1 0 0 1-.066-.017.2.2 0 0 1-.054-.06.18.18 0 0 1 .002-.183L7.884 2.073a.15.15 0 0 1 .054-.057m1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767z" />
          <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
        </svg>
      ),
    },
    info: {
      text: "#0b4364",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill={theme.textInfo}
          className="bi bi-info-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
        </svg>
      ),
    },
  };

  const customStyles: Record<string, React.CSSProperties> = {
    toast: {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      top: "20px",
      padding: "15px",
      paddingLeft: "15px",
      paddingRight: "15px",
      maxWidth: "550px",
      minWidth: "400px",
      borderRadius: "10px",
      backgroundColor: theme.bgCard,
      boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "10px",
    },
    title: {
      fontWeight: "bold",
    },
    close: {
      position: "absolute",
      left: "95%",
      top: "5%",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    if (timerIsDone == true) {
      if (onClose) onClose();
    }
  }, [timerIsDone]);

  return (
    !timerIsDone && (
      <div style={customStyles.toast}>
        <div>{typeColors[type].icon}</div>
        <div>
          <p>{title}</p>
          <p style={{ whiteSpace: "pre-wrap"}}>{message}</p>
          <div style={customStyles.close} onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill={theme.textMain}
              className="bi bi-x-lg"
              viewBox="0 0 16 16"
            >
              <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
            </svg>
          </div>
        </div>
      </div>
    )
  );
};

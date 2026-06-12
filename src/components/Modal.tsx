import { theme } from "../constants/theme";

interface ModalProps {
  children?: React.ReactNode;
  open: boolean;
  onClose?: () => void;
}

export const Modal = ({
  children,
  open,
  onClose,
}: ModalProps): React.ReactNode => {
  const customStyles: Record<string, React.CSSProperties> = {
    modal: {
      position: "fixed",
      left: "50%",
      transform: "translateX(-50%)",
      top: "5%",
      padding: "20px",
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
      top: "2%",
      cursor: "pointer",
    },
  };

  return (
    open == true && (
      <div style={customStyles.modal}>
        {/* Close modal button */}
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
        {children}
      </div>
    )
  );
};

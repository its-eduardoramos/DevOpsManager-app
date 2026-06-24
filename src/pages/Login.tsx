import { useContext, useState } from "react";
import { useForm } from "../hooks/useForm";
import { ShowToast } from "../components/ShowToast";
import { InputField } from "../components/InputField";
import { Paper } from "../components/Paper";
import { Button } from "../components/Button";
import { AuthContext, type Auth } from "../context/AuthContext";

export interface User {
  username: string;
  password: string;
}

export interface ToastInfo {
  seconds: number;
  title: string;
  message: string;
  type: "success" | "error" | "info";
  onClose: () => void;
}

export default function Login(): React.ReactNode {
  const authContext: Auth | null = useContext(AuthContext);
  const initialFormValues: User = {
    username: "",
    password: "",
  };
  const { form, handleChange, isValid, errors } = useForm(initialFormValues);
  const [openToast, setOpenToast] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<ToastInfo>({
    seconds: 5,
    title: "Welcome",
    message: "Redirecting to the home page",
    type: "success",
    onClose: () => {
      setOpenToast(false);
    },
  });

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (isValid()) {
      try {
        const data = await authContext?.login(form);
        console.log(data);
      } catch (error: any) {
        setToastInfo({
          seconds: 5,
          title: "Login error",
          message: error.message || "There was a problem triyng to login.",
          type: "error",
          onClose: () => {
            setOpenToast(false);
          },
        });
        setOpenToast(true);
      }
    } else {
      setToastInfo({
        seconds: 5,
        title: "Form error",
        message: "Fill the required fields.",
        type: "error",
        onClose: () => {
          setOpenToast(false);
        },
      });
      setOpenToast(true);
    }
  };

  return (
    <>
      <Paper
        style={{
          width: "300px",
          position: "fixed",
          left: "50%",
          top: "15%",
          transform: "translateX(-50%)",
        }}
      >
        <h2 style={{ textAlign: "center" }}>Login</h2>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <InputField
            label="Username:"
            value={form.username}
            type="text"
            name="username"
            onChange={handleChange}
            errorMessage={errors.username}
          />
          <InputField
            label="Password:"
            value={form.password}
            type="password"
            name="password"
            onChange={handleChange}
            errorMessage={errors.password}
          />
          <Button>Login</Button>
        </form>
      </Paper>
      {openToast && (
        <ShowToast
          seconds={toastInfo.seconds}
          title={toastInfo.title}
          message={toastInfo.message}
          type={toastInfo.type}
          onClose={toastInfo.onClose}
        />
      )}
    </>
  );
}

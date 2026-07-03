import { useState } from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { useForm } from "../../hooks/useForm";
import type { User } from "../../interfaces/Users";
import { ShowToast, type ShowToastProps } from "../../components/ShowToast";
import { SelectField } from "../../components/SelectField";
import { accountService } from "../../services/account.service";
import type { ApiResponse } from "../../interfaces/ApiResponse";

interface UserModalProps {
  openModal: boolean;
  userData: User | null;
  onClose: (action?: string, error?: ApiResponse<null>) => void;
  close: () => void;
}

export const UserModal = ({
  openModal,
  userData,
  onClose,
  close,
}: UserModalProps): React.ReactNode => {
  const formInitialValues: User = {
    userName: userData?.userName || "",
    password: userData?.password || "",
    email: userData?.email || "",
    roles: userData?.roles || "",
  };
  const { form, errors, handleChange, isValid } = useForm(formInitialValues);
  // It stores the toast info
  const [toastInfo, setToastInfo] = useState<ShowToastProps | null>(null);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValid()) {
      if (userData) {
        await accountService
          .update(form)
          .then(() => {
            onClose("update");
            close();
          })
          .catch((e: ApiResponse<null>) => {
            onClose("error", e);
            close();
          });
      } else {
        await accountService
          .register(form)
          .then(() => {
            onClose("add");
            close();
          })
          .catch((e: ApiResponse<null>) => {
            onClose("error", e);
            close();
          });
      }
    } else {
      setToastInfo({
        seconds: 5,
        title: "Form error",
        message: "Fill the required fields",
        type: "error",
        onClose: () => {
          setToastInfo(null);
        },
      });
    }
  };

  return (
    <>
      <Modal open={openModal} onClose={close}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            {userData ? "Edit" : "Create"} new user
          </h3>
          <form
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            {/* Username */}
            <InputField
              label="Username:"
              value={form.userName}
              type="text"
              name="userName"
              onChange={handleChange}
              errorMessage={errors.userName}
            />
            {/* Email */}
            <InputField
              label="Email:"
              value={form.email}
              type="text"
              name="email"
              onChange={handleChange}
              errorMessage={errors.email}
            />
            {/* Password */}
            <InputField
              label="Password:"
              value={form.password ?? ""}
              type="password"
              name="password"
              onChange={handleChange}
              errorMessage={errors.password}
            />
            {/* Roles */}
            <SelectField
              label={"Roles"}
              value={form.roles}
              name={"roles"}
              onChange={handleChange}
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </SelectField>

            <Button type="submit">Save user</Button>
          </form>
        </div>
      </Modal>
      {/* Toast */}
      {toastInfo && (
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
};

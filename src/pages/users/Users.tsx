import React, { useEffect, useState } from "react";
import { theme } from "../../constants/theme";
import { accountService } from "../../services/account.service";
import type { ApiResponse } from "../../interfaces/ApiResponse";
import type { User } from "../../interfaces/Users";
import { ShowToast, type ShowToastProps } from "../../components/ShowToast";
import { InputField } from "../../components/InputField";
import { Button } from "../../components/Button";
import { UserModal } from "./UserModal";
import { DeleteModal } from "./DeleteModal";

export const Users = (): React.ReactNode => {
  // Stores the full list of users
  const [users, setUsers] = useState<ApiResponse<User[]>["data"] | null>(null);
  // It contains the toast info
  const [toastInfo, setToastInfo] = useState<ShowToastProps | null>(null);
  // query to filter the user list
  const [userFilter, setUserFilter] = useState<string>("");
  // Filtered list of users by filter (username)
  const filteredList: User[] | null | undefined = userFilter
    ? users?.filter((user: User) => user.userName.includes(userFilter))
    : users;
  // Open/closes the modal
  const [openModal, setOpenModal] = useState<boolean>(false);
  // Stores the user to delete
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  // Open / closes the delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);

  useEffect(() => {
    getUsers();
  }, []);

  /**
   * Function that brings the user list from the API
   */
  const getUsers = async (): Promise<void> => {
    await accountService
      .getAllUsers()
      .then((response: ApiResponse<User[]>) => {
        setUsers(response.data);
      })
      .catch((e: ApiResponse<null>) => {
        setToastInfo({
          seconds: 5,
          title: "Error " + e.status,
          message: e.message,
          type: "error",
          onClose: () => setToastInfo(null),
        });
      });
  };

  /**
   * Function that executes when the UserModal is closed
   * @param action? {string} "add" | "update" | "delete" | null representing the action ocurred in the modal
   * @param error? {ApiResponse<null>} Nullable in case that the API returns error
   */
  const handleCloseModal = (action?: string, error?: ApiResponse<null>) => {
    if (action) {
      // If an error ocurred
      if (error) {
        console.log(error.message);
        let errorMessage: string = "";
        if (Array.isArray(error.message)) {
          error.message.map((error: any, index: number) => {
            errorMessage += `${index + 1}. ${error.description.replace(/Passwords/g, "The password")} \n`;
          });
        }
        setToastInfo({
          seconds: errorMessage ? 10 : 5,
          title: "Error",
          message: errorMessage || error.message,
          type: "error",
          onClose: () => {
            setToastInfo(null);
          },
        });
      } else {
        setToastInfo({
          seconds: 5,
          title: "Success",
          message: `User ${
            action == "add"
              ? "added"
              : action == "updated"
                ? "updated"
                : "deleted"
          } successfully.`,
          type: "success",
          onClose: () => {
            setToastInfo(null);
          },
        });
        getUsers();
      }
    }
  };

  return (
    <>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          padding: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            padding: "10px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "10px",
              width: "400px",
            }}
          >
            {/* Search bar */}
            <InputField
              style={{ height: "100%", flex: 1 }}
              value={userFilter}
              placeholder="Search user"
              type="text"
              name="user"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setUserFilter(e.target.value)
              }
            />
            <Button onClick={() => setOpenModal(true)}>Add user</Button>
          </div>
        </div>
        {/* Users container */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
            gap: "10px",
          }}
        >
          {/* Users */}
          {filteredList &&
            filteredList.map((user: User) => (
              <div
                key={user.id}
                style={{
                  backgroundColor: theme.bgCard,
                  flex: 1,
                  borderRadius: "5px",
                  padding: "15px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <div
                  style={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="60"
                    height="60"
                    fill="currentColor"
                    className="bi bi-person-circle"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                    <path
                      fillRule="evenodd"
                      d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                    />
                  </svg>
                  {/* Username and email */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {/* Username */}
                    <span style={{ color: theme.textMain }}>
                      {user.userName}
                    </span>
                    {/* Email */}
                    <span style={{ color: theme.textMuted }}>{user.email}</span>
                  </div>
                </div>
                <hr
                  style={{
                    width: "100%",
                    border: "none",
                    height: "1px",
                    backgroundColor: theme.bgMain,
                  }}
                />
                {/* Role & status */}
                <div style={{ display: "flex", gap: "10px" }}>
                  {/* Role */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <span>Role</span>
                    <span>[{user.roles}]</span>
                  </div>
                  {/* Status */}
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      flex: 1,
                    }}
                  >
                    <span>Status</span>
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill={theme.badges["active"].iconColor}
                        className="bi bi-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <circle cx="8" cy="8" r="8" />
                      </svg>
                      <span>Active</span>
                    </div>
                  </div>
                  {/* Actions */}
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "end",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        width: "50px",
                      }}
                    >
                      {/* Delete button */}
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setUserToDelete(user.id!);
                          setOpenDeleteModal(true);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          fill="currentColor"
                          className="bi bi-trash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      {/* Toast info */}
      {toastInfo && (
        <ShowToast
          seconds={toastInfo.seconds}
          title={toastInfo.title}
          message={toastInfo.message}
          type={toastInfo.type}
          onClose={toastInfo.onClose}
        />
      )}
      {/* User modal */}
      {openModal && (
        <UserModal
          openModal={openModal}
          onClose={handleCloseModal}
          close={() => setOpenModal(false)}
        />
      )}
      {/* Delete modal */}
      {openDeleteModal && (
        <DeleteModal
          open={openDeleteModal}
          userId={userToDelete!}
          onClose={handleCloseModal}
          close={() => setOpenDeleteModal(false)}
        />
      )}
    </>
  );
};

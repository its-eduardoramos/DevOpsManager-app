import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import type { ApiResponse } from "../../interfaces/ApiResponse";
import { accountService } from "../../services/account.service";

interface DeleteModalProps {
  open: boolean;
  userId: string;
  onClose: (action?: string, error?: ApiResponse<null>) => void;
  close: () => void;
}

export const DeleteModal = ({
  open,
  userId,
  onClose,
  close,
}: DeleteModalProps): React.ReactNode => {
  const handleDelete = async (): Promise<void> => {
    await accountService
      .delete(userId)
      .then(() => {
        onClose("delete");
      })
      .catch((e: ApiResponse<null>) => {
        onClose("error", e);
      })
      .finally(() => close());
  };

  return (
    <Modal open={open} onClose={close}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          width: "100%",
          gap: "15px",
        }}
      >
        <div
          style={{
            flex: 1,
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>
            Do you want to permanently delete this user and all the resources
            related with it?
          </span>
          <span>(This action can not be undone)</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <div style={{ flex: 1 }}>
            <Button variant="contained" onClick={handleDelete}>
              Yes
            </Button>
          </div>
          <div style={{ flex: 1 }}>
            <Button variant="outlined" onClick={close}>
              No
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

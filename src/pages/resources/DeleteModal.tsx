import { Button } from "../../components/Button";
import { Modal } from "../../components/Modal";
import { resourceService } from "../../services/resources.service";

interface DeleteModalProps {
  open: boolean;
  id: number;
  close: () => void;
  onClose: (action: string, response: any) => void;
}

export const DeleteModal = ({
  open,
  id,
  close,
  onClose,
}: DeleteModalProps): React.ReactNode => {
  const handleDelete = async (): Promise<void> => {
    await resourceService
      .delete(id)
      .then((res: any) => {
        onClose("delete", res);
      })
      .catch((e: any) => {
        onClose("delete" ,e);
      })
      .finally(() => {
        close(); //Closes the modal
      });
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
          <span>Do you want to permanently delete this resource?</span>
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

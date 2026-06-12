import { useState } from "react";
import { Button } from "../../components/Button";
import { InputField } from "../../components/InputField";
import { Modal } from "../../components/Modal";
import { SelectField } from "../../components/SelectField";
import { ShowToast } from "../../components/ShowToast";
import { useForm } from "../../hooks/useForm";
import type { Resource } from "../../interfaces/Resource";
import { resourceService } from "../../services/resources.service";

interface ResourceModalProps {
  resourceData?: Resource | null;
  open: boolean;
  close: () => void;
  onClose: (action?: string, response?: any) => void;
}

export const ResourceModal = ({
  open,
  close,
  resourceData,
  onClose,
}: ResourceModalProps) => {
  const formInitialValues: Resource = {
    name: resourceData?.name ?? "",
    type: resourceData?.type ?? "",
    ipAddress: resourceData?.ipAddress ?? "",
    status: resourceData?.status ?? "active",
  };

  const { form, handleChange, errors, isValid, touched } =
    useForm(formInitialValues);
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastInfo, setToastInfo] = useState<any>({});

  const handleSubmit = async (
    e: React.SubmitEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();

    if (isValid()) {
      try {
        //Update
        if (resourceData?.id) {
          await resourceService
            .update(resourceData.id, form)
            .then((res: any) => {
              onClose("update", res); //Passes the success message to the onClose function.
            })
            .catch((e: any) => {
              onClose("error", e); //Passes the error to the onClose function.
            })
            .finally(() => close()); //Closes the modal
        }
        //Add
        else {
          await resourceService
            .create(form)
            .then((res: any) => {
              onClose("add", res); //Passes the success message to the onClose function.
            })
            .catch((e: any) => {
              onClose("error", e); //Passes the error to the onClose function.
            })
            .finally(() => close()); //Closes the modal
        }
      } catch (e: any) {
        onClose("error", e);
        close();
      }
    } else {
      setToastInfo({
        seconds: 5,
        title: "Form error",
        message: "Fill the required fields.",
        type: "error",
        onClose: () => {
          setShowToast(false);
        },
      });
      setShowToast(true);
    }
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          onClose();
          close();
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            paddingBottom: "10px",
          }}
        >
          <h3 style={{ textAlign: "center" }}>
            {resourceData ? "Edit" : "Add new"} resource
          </h3>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flex: 1,
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <InputField
              label="Name:"
              value={form.name}
              type="text"
              name="name"
              onChange={handleChange}
              errorMessage={errors.name}
            />
            <InputField
              label="Type:"
              value={form.type}
              type="text"
              name="type"
              onChange={handleChange}
              errorMessage={errors.type}
            />
            <InputField
              label="Ip Address:"
              value={form.ipAddress}
              type="text"
              name="ipAddress"
              onChange={handleChange}
              errorMessage={errors.ipAddress}
            />
            <SelectField
              label={"Status:"}
              value={form.status}
              name={"status"}
              onChange={handleChange}
              errorMessage={errors.status}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="maintenance">Maintenance</option>
            </SelectField>
            <Button type="submit" disabled={!touched}>
              Save
            </Button>
          </form>
        </div>
      </Modal>
      {showToast && (
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

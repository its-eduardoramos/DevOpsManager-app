import { useEffect, useState } from "react";
import { resourceService } from "../../services/resources.service";
import type { Resource } from "../../interfaces/Resource";
import { theme } from "../../constants/theme";
import { ProgressBar } from "../../components/ProgressBar";
import { Button } from "../../components/Button";
import { ResourceModal } from "./ResourceModal";
import { DeleteModal } from "./DeleteModal";
import { ShowToast, type ShowToastProps } from "../../components/ShowToast";
import type { ApiResponse } from "../../interfaces/ApiResponse";
import { routesDict } from "../../routes/routes";
import { useNavigate, type NavigateFunction } from "react-router-dom";

export const Resources = (): React.ReactNode => {
  //This const will help to redirect to different routes.
  const navigate: NavigateFunction = useNavigate();
  //Stores the full list of resources
  const [resources, setResources] = useState<
    ApiResponse<Resource[]>["data"] | null
  >(null);
  //Stores the amount of active, inactive and maintenance resources
  const [resourceStatus, setResourceStatus] = useState<any>({
    active: 0,
    inactive: 0,
    maintenance: 0,
  });
  //Opens/closes the modal
  const [openResourceModal, setOpenResourceModal] = useState<boolean>(false);
  //Stores the info of the selected resource
  const [resourceInfo, setResourceInfo] = useState<Resource | null>(null);
  //Opens/closes the delete modal
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  //It stores the id of the resource to delete
  const [resourceToDelete, setResourceToDelete] = useState<number>(0);
  //It contains the toast info
  const [toastInfo, setToastInfo] = useState<ShowToastProps | null>(null);

  useEffect(() => {
    getResources();
  }, []);

  /**
   * Function that gets all the resources
   */
  const getResources = async (): Promise<void> => {
    await resourceService
      .getAll()
      .then((response: ApiResponse<Resource[]>) => {
        const { data } = response;

        let resourceStatus = {
          active: 0,
          inactive: 0,
          maintenance: 0,
        };
        data?.forEach(
          (resource: Resource) => ++resourceStatus[resource.status],
        );

        setResourceStatus({
          active: resourceStatus.active,
          inactive: resourceStatus.inactive,
          maintenance: resourceStatus.maintenance,
        });
        setResources(response.data);
      })
      .catch((e: ApiResponse<null>) => {
        setToastInfo({
          seconds: 5,
          title: "Error",
          message: e.message,
          type: "error",
          onClose: () => setToastInfo(null),
        });
      });
  };

  /**
   * Function that executes when a resource is added / edited / deleted
   */
  const onCloseResourceModal = (action?: string, response?: any) => {
    if (action) {
      if (action === "error") {
        setToastInfo({
          seconds: 5,
          title: "Error",
          message: response.message.title,
          type: "error",
          onClose: () => {
            setToastInfo(null);
          },
        });
      } else {
        setToastInfo({
          seconds: 5,
          title: "Succes",
          message: `Resoruce ${
            action == "add"
              ? "added"
              : action == "update"
                ? "updated"
                : "deleted"
          } successfully.`,
          type: "success",
          onClose: () => {
            setToastInfo(null);
          },
        });
      }
      getResources();
      setToastInfo(null);
    }
    setResourceInfo(null); //In case resource info has data, it sets it as null
  };

  return (
    <>
      {/* Main content */}
      <div
        style={{
          flex: 1,
          padding: "10px",
          flexWrap: "wrap",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        {/* Resources info and buttons */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            flex: 1,
          }}
        >
          {/* Resource datails */}
          <div style={{ flex: 1 }}>
            <div
              style={{
                backgroundColor: theme.bgCard,
                minWidth: "400px",
                display: "flex",
                gap: "10px",
                padding: "15px",
                borderRadius: "5px",
              }}
            >
              {/* Active resources */}
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <span style={{ textAlign: "center" }}>
                  {resourceStatus.active}
                </span>
                <span style={{ textAlign: "center" }}>Active</span>
              </div>
              {/* Inactive resources */}
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <span style={{ textAlign: "center" }}>
                  {resourceStatus.inactive}
                </span>
                <span style={{ textAlign: "center" }}>Inactive</span>
              </div>
              {/* Maintenance resources */}
              <div
                style={{ flex: 1, display: "flex", flexDirection: "column" }}
              >
                <span style={{ textAlign: "center" }}>
                  {resourceStatus.maintenance}
                </span>
                <span style={{ textAlign: "center" }}>Maintenance</span>
              </div>
            </div>
          </div>
          {/* Button */}
          <div
            style={{
              flex: 1,
              minWidth: "400px",
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <div style={{ width: "400px", display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                onClick={() => setOpenResourceModal(true)}
              >
                New resource
              </Button>
              <Button
                variant="outlined"
                onClick={() => navigate(routesDict["auditLogs"].path)}
              >
                View logs
              </Button>
            </div>
          </div>
        </div>

        {/* Resources grid */}
        <div
          style={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gridAutoRows: "minmax(100px, 200px)",
            gap: "10px",
          }}
        >
          {/* Resources */}

          {resources &&
            resources.map((resource: Resource) => (
              <div
                style={{
                  backgroundColor: theme.bgCard,
                  padding: "15px",
                  borderRadius: "5px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                  alignContent: "center",
                }}
                key={resource.id}
              >
                {/* Name and status */}
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {/* Name */}
                  <span
                    style={{
                      fontSize: "19px",
                      fontWeight: "bold",
                      flex: 1,
                    }}
                  >
                    {resource.name}
                  </span>
                  {/* Status */}
                  <div
                    style={{
                      width: "auto",
                      backgroundColor:
                        theme.badges[resource.status.toLowerCase()]
                          .backgroundColor,
                      borderRadius: "5px",
                      paddingLeft: "20px",
                      paddingRight: "20px",
                      paddingTop: "2px",
                      paddingBottom: "2px",
                      display: "flex",
                      alignItems: "center",
                      gap: "2px",
                    }}
                  >
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill={`${theme.badges[resource.status.toLowerCase()].iconColor}`}
                        className="bi bi-circle-fill"
                        viewBox="0 0 16 16"
                      >
                        <circle cx="8" cy="8" r="8" />
                      </svg>
                    </div>
                    <span>{resource.status}</span>
                  </div>
                </div>

                {/* Usage */}
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "10px",
                  }}
                >
                  {/* CPU percentage */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span>CPU: {resource.cpuPercentage}%</span>
                    <ProgressBar percentage={resource.cpuPercentage!} />
                  </div>
                  {/* RAM Percentage */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span>RAM: {resource.ramPercentage}%</span>
                    <ProgressBar percentage={resource.ramPercentage!} />
                  </div>
                  {/* Disk percentage */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      gap: "5px",
                    }}
                  >
                    <span>DISK: {resource.diskPercentage}%</span>
                    <ProgressBar percentage={resource.diskPercentage!} />
                  </div>
                </div>
                {/* Type */}
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    justifyContent: "start",
                    alignItems: "center",
                  }}
                >
                  <span>{resource.type}</span>
                </div>
                {/* Ip Addreess and action */}
                <div
                  style={{
                    display: "flex",
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  {/* Ip Address */}
                  <span style={{ flex: 1 }}>IP: {resource.ipAddress}</span>
                  {/* Buttons */}
                  <div style={{ display: "flex", gap: "10px" }}>
                    {/* Edit button */}
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setResourceInfo(resource);
                        setOpenResourceModal(true);
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="currentColor"
                        className="bi bi-pencil-square"
                        viewBox="0 0 16 16"
                      >
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path
                          fillRule="evenodd"
                          d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                        />
                      </svg>
                    </Button>
                    {/* Delete button */}
                    <Button
                      variant="outlined"
                      onClick={() => {
                        setResourceToDelete(resource.id!);
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
            ))}
        </div>
      </div>
      {/* Modal to add/edit a resource */}
      {openResourceModal && (
        <ResourceModal
          open={true}
          close={() => setOpenResourceModal(false)}
          resourceData={resourceInfo}
          onClose={onCloseResourceModal}
        />
      )}
      {/* Modal to delete a resource */}
      {openDeleteModal && (
        <DeleteModal
          open={openDeleteModal}
          close={() => setOpenDeleteModal(false)}
          id={resourceToDelete}
          onClose={onCloseResourceModal}
        />
      )}
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

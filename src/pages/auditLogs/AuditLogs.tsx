import { useEffect, useState, type ChangeEvent } from "react";
import { auditLogService } from "../../services/auditLog.service";
import type { ApiResponse } from "../../interfaces/ApiResponse";
import { Button } from "../../components/Button";
import { ShowToast, type ShowToastProps } from "../../components/ShowToast";
import { Table, type TableColumn } from "../../components/Table";
import { SelectField } from "../../components/SelectField";

interface AuditLog {
  id: number;
  action: string;
  resourceName: string;
  timestamp: string;
  userEmail: string;
}

interface Pagination {
  pageNumber: number;
  pageSize: number;
}

export const AuditLogs = (): React.ReactNode => {
  // Stores the audit log list
  const [auditLogs, setAuditLogs] = useState<
    ApiResponse<AuditLog[]>["data"] | null
  >(null);
  // Handles the page number and size
  const [pagination, setPagination] = useState<Pagination>({
    pageNumber: 1,
    pageSize: 10,
  });
  // Set the info of the toast
  const [toastInfo, setToastInfo] = useState<ShowToastProps | null>(null);

  //Table columns
  const tableColumns: TableColumn[] = [
    {
      headerName: "Date",
      field: "timestamp",
    },
    {
      headerName: "Event type",
      field: "action",
    },
    // Agregar este campo en los auditlog props
    // {
    //   headerName: "Resource type",
    //   field: "type",
    // },
    {
      headerName: "User",
      field: "userEmail",
    },
  ];

  // useEffect that executes every time the pagination values changes
  useEffect(() => {
    getAuditLogs();
  }, [pagination]);

  const getAuditLogs = async (): Promise<void> => {
    auditLogService
      .getAll(pagination.pageNumber, pagination.pageSize)
      .then((response: ApiResponse<AuditLog[]>) => {
        const auditLogs: AuditLog[] | undefined = response.data;
        if (auditLogs) {
          console.log(auditLogs);
          setAuditLogs(
            auditLogs.map((auditLog: AuditLog) => ({
              ...auditLog,
              timestamp: auditLog.timestamp.split("T")[0],
            })),
          );
        }

        // setAuditLogs(
        // );
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

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Audit logs */}
        <div
          style={{
            padding: "10px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            // flex: 1
          }}
        >
          {/* Refresh button */}
          <div
            style={{
              display: "flex",
            }}
          >
            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <SelectField
                style={{ flex: 1, gap: "10px" }}
                label={"Rows per page"}
                value={pagination.pageSize}
                name={""}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                  setPagination((prev: any) => ({
                    ...prev,
                    pageSize: e.target.value,
                  }));
                }}
              >
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
                <option value="40">40</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </SelectField>

              <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
                <span>
                  Total rows: <br /> {auditLogs ? auditLogs.length : 0}
                </span>
              </div>
            </div>

            <div
              style={{
                flex: 1,
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                style={{ width: "150px" }}
                onClick={() => getAuditLogs()}
                disabled={!auditLogs}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-arrow-clockwise"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
                  />
                  <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466" />
                </svg>
              </Button>
            </div>
          </div>
          {/* Audt logs table */}
          <Table columns={tableColumns} rows={auditLogs || []} />
          {/* Pagination buttons */}
          <div
            style={{
              display: "flex",
              justifyContent: "end",
              gap: "5px",
              alignItems: "center",
            }}
          >
            <Button
              variant="outlined"
              style={{
                width: "50px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                setPagination((prev: any) => ({
                  ...prev,
                  pageNumber: prev.pageNumber - 1,
                }))
              }
              disabled={pagination.pageNumber == 1}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-arrow-left-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5"
                />
              </svg>
            </Button>
            <div>
              <span>{pagination.pageNumber}</span>
            </div>
            <Button
              variant="outlined"
              style={{
                width: "50px",
                height: "20px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() =>
                setPagination((prev: any) => ({
                  ...prev,
                  pageNumber: prev.pageNumber + 1,
                }))
              }
              disabled={auditLogs ? auditLogs.length == 0 : !auditLogs}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                className="bi bi-arrow-right-short"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8"
                />
              </svg>
            </Button>
          </div>
        </div>
      </div>
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

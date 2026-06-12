import { theme } from "../constants/theme";

export interface TableColumn {
  headerName: string;
  field: string;
}

interface TableProps<T> {
  columns: TableColumn[];
  rows: T[];
}

export const Table = <T extends unknown>({
  columns,
  rows,
}: TableProps<T>): React.ReactNode => {
  const keys: string[] = columns.map((column: TableColumn) => column.field);

  return (
    <table
      style={{
        borderCollapse: "collapse",
        borderSpacing: 0,
        borderRadius: "15px",
        overflow: "hidden",
        padding: "10px",
        flex: 1,
      }}
    >
      <thead>
        <tr>
          {columns.map((column: TableColumn, index: number) => (
            <th
              key={column.field}
              style={{
                background: theme.bgCard,
                padding: "15px",
                borderTopLeftRadius: index == 0 ? "10px" : "",
                borderTopRightRadius: index == columns.length - 1 ? "10px" : "",
                border: "1px solid" + theme.borderColor,
              }}
            >
              {column.headerName}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows &&
          rows.map((row: any, index: number) => (
            <tr key={index}>
              {keys.map((key: string) => (
                <td
                  key={row[key]}
                  style={{
                    fontSize: "18px",
                    padding: "15px",
                    border: "1px solid" + theme.borderColor,
                  }}
                >
                  {row[key]}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
};

import React from "react";
import { EmailStatusItem } from "../api/email";
import { formattedData } from "../utils/dayjs";

const RANGE_VALUE = 2;

const EStatusTable = ({ data }: { data: EmailStatusItem[] }) => {
  // Pagination State
  const [ActivePaginationValue, setActivePaginationValue] = React.useState(1);
  // Array Slice Index
  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    setActiveIndex(ActivePaginationValue * RANGE_VALUE);
  }, [ActivePaginationValue]);

  const Total = Math.ceil((data?.length || 0) / RANGE_VALUE);
  return (
    <div className="grid gap-4">
      <table>
        <thead>
          <tr>
            <th>S.N</th>
            <th>Email</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {data
            .slice(activeIndex - RANGE_VALUE, activeIndex)
            ?.map((eItem, index) => {
              return (
                <tr key={eItem._id}>
                  <td>{activeIndex - RANGE_VALUE + index + 1}</td>
                  <td>{eItem.email!}</td>
                  <td>{eItem.status}</td>
                  <td>{formattedData(eItem.createdDate)}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="grid grid-cols-2 gap-4 max-w-[240px] mx-auto ">
        <button
          className="btn-default"
          disabled={ActivePaginationValue === 1}
          onClick={() => setActivePaginationValue(ActivePaginationValue - 1)}
        >
          Previous
        </button>
        <button
          className="btn-default"
          disabled={ActivePaginationValue === Total}
          onClick={() => setActivePaginationValue(ActivePaginationValue + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default EStatusTable;

import { Dispatch, SetStateAction, ReactElement } from "react";
import { ChevronUp } from "../assets/icons/ChevronUp";

interface PaginationProps {
  currentPage: number;
  logsPerPage: number;
  totalCount: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
}

const Pagination = ({
  currentPage,
  logsPerPage,
  totalCount,
  setCurrentPage,
}: PaginationProps) => {
  console.log(currentPage);
  console.log(totalCount);

  const renderPagination = () => {
    const maxPageNum = Math.ceil(totalCount / logsPerPage);
    const paginationArray: (ReactElement | number)[] = [
      <button
        type="button"
        className="w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100"
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev === 1) {
              return prev;
            }
            return prev - 1;
          })
        }
      >
        <ChevronUp rotate="Left" small />
      </button>,
    ];

    for (let i = 1; i <= maxPageNum; i++) {
      paginationArray.push(
        <button
          type="button"
          className={`w-full px-4 py-2 border-t border-b border-r text-base bg-white hover:bg-gray-100 ${
            currentPage === i ? "text-indigo-500 text-lg" : ""
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>
      );
    }

    paginationArray.push(
      <button
        type="button"
        className="w-full p-4 border text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100"
        onClick={() =>
          setCurrentPage((prev) => {
            if (prev === maxPageNum) {
              return prev;
            }
            return prev + 1;
          })
        }
      >
        <ChevronUp rotate="Right" small />
      </button>
    );

    return paginationArray;
  };

  return (
    <div className="px-5 bg-white py-5 flex flex-col xs:flex-row items-center xs:justify-between">
      <div className="flex items-center">{renderPagination()}</div>
    </div>
  );
};

export default Pagination;

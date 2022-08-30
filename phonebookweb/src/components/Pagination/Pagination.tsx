import ReactPaginate from "react-paginate";

import "./Pagination.css";

type PaginationProps = {
  onPageClick: (event: { selected: number }) => void;
  pageCount: number;
  page: number
};

export const Pagination: React.FC<PaginationProps> = ({
  onPageClick,
  pageCount,
  page
}) => {
  return (
    <div className="pagination">
      <ReactPaginate 
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageClick}
        pageRangeDisplayed={1}
        pageCount={pageCount}
        forcePage={page - 1}
        previousLabel="<"
      />
    </div>
  );
};

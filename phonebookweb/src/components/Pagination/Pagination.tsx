import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.css";
import "./Pagination.css";
import classnames from "classnames";

type PaginationProps = {
  onPageClick: (event: { selected: number }) => void;
  pageCount: number;
};

export const Pagination: React.FC<PaginationProps> = ({
  onPageClick,
  pageCount,
}) => {
  return (
    <div className={classnames("pagination", styles.pagination)}>
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        onPageChange={onPageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="<"
      />
    </div>
  );
};

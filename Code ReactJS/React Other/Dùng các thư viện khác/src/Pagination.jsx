// # Các thư viện components / react-paginate => nên dùng component pagination của các thư viện UI có sẵn

import ReactPaginate from "react-paginate";
import React, {
  useEffect,
  useState
} from "react";
import "./test.css";

const items = [...Array(33).keys()];

function Items({ currentItems }) {
  return (
    <div className="items">
      {currentItems && currentItems.map((item) => (
        <div>
          <h3>Item #{item}</h3>
        </div>
      ))}
    </div>
  );
}

function PaginatedItems({ itemsPerPage }) {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Lấy item từ itemOffset đến endOffset
    const endOffset = itemOffset + itemsPerPage;
    setCurrentItems(items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(items.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Làm hoàn toàn thủ công, thư viện này chỉ cung ra duy nhất sự kiện onPageChange
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % items.length;
    setItemOffset(newOffset);
  };

  return (
    <>
      <Items currentItems={currentItems} />
      <ReactPaginate
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default PaginatedItems;
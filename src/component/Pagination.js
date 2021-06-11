import React, { useState } from "react";

const Pagination = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  const isCurrentPage = (number) => {
    return number === currentPage ? "active " : "";
  };

  const handleCurrentPage = (number) => {
    setCurrentPage(number);

  };

  const createItem = (number) => {
    return number ? (
      <li key={number}>
        <button
          className={isCurrentPage(number) + "visible"}
          onClick={() => handleCurrentPage(number)}
        >
          {number}
        </button>
      </li>
    ) : (
      <li key={number}>...</li>
    );
  };

  const renderPage = () => {
    let list = [];
    const countPage = Math.ceil(props.total / props.pageSize);
    let n = 1;
    while (n <= countPage) {
      let item;
      const number = n;
      if (currentPage <= 6) {
        if (n <= 5 || n <= currentPage + 2 || n > countPage - 2) {
          item = createItem(number);
        } else if (n === countPage - 2) {
          item = createItem();
        }
      } else if (currentPage > 6 && currentPage < countPage - 5) {
        if (
          n <= 2 ||
          n >= countPage - 2 ||
          (currentPage - 2 <= n && n <= currentPage + 2)
        ) {
          item = createItem(number);
        }
        if (n === 3 || n === countPage - 2) {
          item = createItem();
        }
      } else {
        if (n <= 2 || n >= countPage - 5 || n >= currentPage - 2) {
          item = createItem(number);
        }
        if (n === 3) {
          item = createItem();
        }
      }
      list.push(item);
      n++;
    }
    return list;
  };
  return (
    <section id="pagination">
      <ul>{renderPage()}</ul>
    </section>
  );
};

export default Pagination;

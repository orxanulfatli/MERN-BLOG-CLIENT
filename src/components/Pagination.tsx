import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

interface IProps {
  total: number;
  callback: (num: number) => void;
}

const Pagination: React.FC<IProps> = ({ total, callback }) => {
    const searchParams = useSearchParams()
    const [page, setPage] = useState(1);

  const newArr = [...Array(total)].map((_, i) => i + 1);
    const navigate = useNavigate();

  const isActive = (index: number) => {
    if (index === page) return "active";
    return "";
  };

  const handlePagination = (num: number) => {
    navigate(`?page=${num}`);
    callback(num);
  };

    useEffect(() => {
    setPage(Number(searchParams[0].get("page")));
  }, [searchParams]);

  return (
    <nav aria-label="Page navigation example" style={{ cursor: "pointer" }}>
      <ul className="pagination">
        {page > 1 && (
          <li className="page-item" onClick={() => handlePagination(page - 1)}>
            <span className="page-link" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </span>
          </li>
        )}

        {newArr.map((num) => (
          <li
            key={num}
            className={`page-item ${isActive(num)}`}
            onClick={() => handlePagination(num)}
          >
            <span className="page-link">{num}</span>
          </li>
        ))}

        {page < total && (
          <li className="page-item" onClick={() => handlePagination(page + 1)}>
            <span className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </span>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Pagination;

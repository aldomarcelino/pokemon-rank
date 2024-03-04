import { useState } from "react";

const Pagination = ({ handlePage }) => {
  let [num, setNum] = useState(1);
  let [cur, setCur] = useState(1);

  const pages = [
    { page: num },
    { page: num + 1 },
    { page: num + 2 },
    { page: num + 3 },
  ];
  console.log("ini cur", cur);
  function Next() {
    console.log(num, "nummm");
    if (num <= 2) setNum(++num);
  }
  function back() {
    num > 1 && setNum(--num);
  }
  function handleClick(page) {
    handlePage(page);
    setCur(page);
  }
  return (
    <div className="flex rounded-lg text-white justify-end mt-5">
      <button
        onClick={back}
        className="h-10 border-2 border-r-0 border-yellow-500 px-3 rounded-l-lg hover:bg-yellow-500 hover:text-black"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
      {pages.map((pg, i) => (
        <button
          key={i}
          onClick={() => handleClick(pg.page)}
          className={`h-10 border-2 border-r-0 border-yellow-500 w-10 ${
            cur === pg.page && "bg-yellow-500 text-black"
          }`}
        >
          {pg.page}
        </button>
      ))}
      <button
        onClick={Next}
        className="h-10 border-2  border-yellow-500 px-3 rounded-r-lg hover:bg-yellow-500 hover:text-black"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
            fillRule="evenodd"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default Pagination;

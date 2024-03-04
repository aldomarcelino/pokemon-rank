import { FiSearch } from "react-icons/fi";
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import useToggle from "../hooks/useToggle";
import SearchPage from "./SearchPage";

export default function Navbar() {
  const navigate = useNavigate();
  const { open, setOn, setOff } = useToggle();
  const handleClick = () => {
    if (open) setOff();
    else setOn();
  };

  return (
    <>
      <nav>
        <div className="bg-[#141414] text-white ">
          <div className="flex flex-row p-3 items-center justify-between mx-[15%] ">
            <button
              className="bg-yellow-500 rounded-sm p-2"
              onClick={() => navigate("/")}
            >
              <div className="font-bold text-xl text-black font-mono">
                Pocket Monster
              </div>
            </button>
            <div className="text-xl">
              <button
                className="flex flex-row items-center"
                onClick={() => handleClick()}
              >
                <h3 className=" text-xl font-medium mr-2">Search</h3>
                {open ? <AiOutlineClose /> : <FiSearch />}
              </button>
            </div>
          </div>
        </div>
      </nav>
      <SearchPage open={open} setOff={handleClick} />
    </>
  );
}

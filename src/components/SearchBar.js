import React, { useEffect, useState } from "react";
import { FaArrowRight, FaSearch } from "react-icons/fa";
import { FaChildren } from "react-icons/fa6";
import { MdLocalHotel } from "react-icons/md";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css';
import { DateRange } from "react-date-range";
import DateModal from "./DateModal";
import { format } from "date-fns";
import { RxEnter } from "react-icons/rx";
import { RxExit } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { SearchContext } from "../context/SearchContext";

const SearchBar = () => {
  const [openDate, setOpenDate] = useState(false);

  const [showOptions, setShowOptions] = useState(false);

  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24*60*60*1000),
      key: "selection",
    },
  ]);

  const handleOptions = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const handleRoom = (adult, childrens) => {
    const peoplePerRoom = 3;

    const totalPeople = adult + childrens;
    const roomNeeded = Math.ceil(totalPeople / peoplePerRoom);

    if (roomNeeded > options.room) {
      options.room = roomNeeded;
    }

    return options.room;
  };

  const [iswindow, setiswindow] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setiswindow(window.innerWidth < 500);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const navigate = useNavigate()

  const {dispatch} = useContext(SearchContext)
  const handleSearch = ()=>{
    dispatch({type:"NEW_SEARCH",payload:{destination,date,options}})
    navigate("/hotels",{state:{destination,date,options}})
  }

  const capitalizeFirstLetter = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  return (
    <>
      {iswindow ? (
        <div className=" flex-col flex self-center items-center justify-center z-40 ">
          <div className="flex border-2 p-1 rounded-full bg-white my-2 text-sm">
            <div className="relative">
              <FaSearch className="absolute text-gray-500 sml:visible invisible left-2 top-5 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Where are you going?"
                onChange={e=>setDestination(capitalizeFirstLetter(e.target.value))}
                className=" capitalize text-sm border-gray-500 rounded-l-full p-2 border-r-2 bg-transparent focus:outline-none placeholder:text-gray-500 text-gray-500"
              />
            </div>

            <div className="relative z-40">
              <div
                className="p-auto m-auto cursor-pointer flex justify-center items-center w-full h-full "
                onClick={() => setShowOptions(!showOptions)}
              >
                <div className="text-gray-500 flex sml:text-lg sml:gap-4 sml:px-3">
                  <div className=" flex justify-center items-center sml:text-xl">
                    <FaChildren className="w-0 h-0 sml:w-auto sml:h-auto" />
                  </div>
                  <div className="text-xs pl-1">
                    {options.adult + options.children} Guest
                  </div>
                </div>
                <div className="text-gray-500 flex sml:text-lg sml:gap-4 sml:px-3">
                  <div className=" flex justify-center items-center sml:text-xl">
                    <MdLocalHotel className="w-0 h-0 sml:w-auto sml:h-auto pl-2" />
                  </div>
                  <div className="text-xs">
                    {options.room} Room
                  </div>
                </div>
              </div>
              {showOptions && (
                <div className="absolute flex-col border-2 rounded-lg px-2 w-[160px] bg-white z-50 -left-5 right-0">
                  <div className="flex gap-9 border-b-2 py-2 items-center">
                    <span className="m-auto">Adult</span>
                    <div className="flex gap-1 justify-center items-center w-full h-full">
                      <button
                        disabled={options.adult <= 1}
                        onClick={() => handleOptions("adult", "d")}
                        className="border-designColor w-full h-full border rounded-md  text-xl text-designColor"
                      >
                        -
                      </button>
                      <span className=" font-semibold flex justify-center mx-auto">
                        {options.adult}
                      </span>
                      <button
                        disabled={options.adult >= 30}
                        onClick={() => handleOptions("adult", "i")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 border-b-2 py-2 items-center">
                    <span className="">Children</span>
                    <div className=" flex gap-1 justify-center items-center w-full h-full">
                      <button
                        onClick={() => handleOptions("children", "d")}
                        className="border-designColor w-full h-full border rounded-md  text-xl text-designColor"
                        disabled={options.children <= 0}
                      >
                        -
                      </button>
                      <span className=" font-semibold flex justify-center mx-auto">
                        {options.children}
                      </span>
                      <button
                        onClick={() => handleOptions("children", "i")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                        disabled={options.children >= 20}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex  gap-9 py-2 items-center">
                    <span className="m-auto">Room</span>
                    <div className="flex gap-1 justify-center items-center w-full h-full">
                      <button
                        onClick={() => handleOptions("room", "d")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                        disabled={options.room <= 1}
                      >
                        -
                      </button>
                      <span className=" font-semibold flex justify-center mx-auto">
                        {handleRoom(options.adult, options.children)}
                      </span>
                      <button
                        onClick={() => handleOptions("room", "i")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                        disabled={options.room >= 30}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <DateModal />
          </div>

          <div className="flex justify-center">        
              <button
                onClick={handleSearch}
                className="bg-designColor text-white px-8 py-2 border border-designColor hover:border-black rounded-full sml:px-3 sml:py-3 hover:font-semibold"
              >
                <span className="pr-2">Search</span>
                <FaArrowRight className=" inline-flex" />
              </button>
          </div>
        </div>
      ) : (
        <div className="flex self-center items-center justify-center z-40 ">
          <div className="flex border-2 p-3 rounded-full bg-white">
            <div className="relative border-r-2 border-gray-600">
              <FaSearch className="absolute text-gray-500 sml:visible invisible left-2 top-5 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Where are you going?"
                onChange={e=>setDestination(capitalizeFirstLetter(e.target.value))}
                className=" capitalize rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-gray-500 text-gray-500"
              />
            </div>



            <div className="relative z-40 w-[36%] border-r-2 border-gray-600">
              <div
                className="cursor-pointer flex justify-evenly items-center w-[100%] h-full "
                onClick={() => setOpenDate(!openDate)}
              >
                <div className="flex-col text-gray-500 flex px-1">
                  <div className=" flex justify-center items-center text-xl gap-[3px]">
                    <RxEnter className="w-auto h-auto text-sm text-gray-700" />
                    <span className="text-sm font-semibold text-gray-700">Check-in</span>
                  </div>
                  <div className="text-xs flex justify-center">
                    {`${format(date[0].startDate, "dd MMM yyyy")}`}
                  </div>
                </div>
                <div className="flex-col text-gray-500 flex px-1">
                  <div className=" flex justify-center items-center text-xl gap-[3px]">
                    <RxExit className="w-auto h-auto text-sm text-gray-700 font-bold" />
                    <span className="text-sm font-semibold text-gray-700">Check-out</span>
                  </div>
                  <div className=" text-xs flex justify-center">
                  {`${format(date[0].endDate, "dd MMM yyyy")}`}
                  </div>
                </div>
              </div>
              {openDate && (
                <div className="absolute flex-col border-2 rounded-lg px-2 w-[160px] bg-white z-50">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                </div>
              )}
            </div>





            <div className="relative z-40">
              <div
                className="p-auto m-auto cursor-pointer flex justify-evenly items-center w-full h-full"
                onClick={() => setShowOptions(!showOptions)}
              >
                <div className="text-gray-500 flex gap-1 px-3">
                  <div className=" flex justify-center items-center text-xl">
                    <FaChildren className="w-auto h-auto text-xl m-2" />
                    <span className="text-xs">{options.adult + options.children}</span>
                    <div className="text-xs ml-1">Guest</div>
                  </div>
                </div>
                <div className="text-gray-500 flex sml:text-lg sml:gap-4 sml:px-3">
                  <div className=" flex justify-center items-center text-xl">
                    <MdLocalHotel className="w-auto h-auto text-xl m-2"/>
                    <span className="text-xs">{options.room}</span>
                    <div className="text-xs ml-1">Room</div>
                  </div>
                </div>
              </div>
              {showOptions && (
                <div className="absolute flex-col border-2 rounded-lg px-2 w-[160px] bg-white z-50">
                  <div className="flex gap-9 border-b-2 py-2 items-center">
                    <span className="m-auto">Adult</span>
                    <div className="flex gap-1 justify-center items-center w-full h-full">
                      <button
                        disabled={options.adult <= 1}
                        onClick={() => handleOptions("adult", "d")}
                        className="border-designColor w-full h-full border rounded-md  text-xl text-designColor"
                      >
                        -
                      </button>
                      <span className=" font-semibold flex justify-center mx-auto">
                        {options.adult}
                      </span>
                      <button
                        disabled={options.adult >= 30}
                        onClick={() => handleOptions("adult", "i")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex gap-4 border-b-2 py-2 items-center">
                    <span className="">Children</span>
                    <div className=" flex gap-1 justify-center items-center w-full h-full">
                      <button
                        onClick={() => handleOptions("children", "d")}
                        className="border-designColor w-full h-full border rounded-md  text-xl text-designColor"
                        disabled={options.children <= 0}
                      >
                        -
                      </button>
                      <span className=" font-semibold flex justify-center mx-auto">
                        {options.children}
                      </span>
                      <button
                        onClick={() => handleOptions("children", "i")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                        disabled={options.children >= 20}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <div className="flex  gap-9 py-2 items-center">
                    <span className="m-auto">Room</span>
                    <div className="flex gap-1 justify-center items-center w-full h-full">
                      <button
                        onClick={() => handleOptions("room", "d")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                        disabled={options.room <= 1}
                      >
                        -
                      </button>
                      <span className=" font-semibold flex justify-center mx-auto">
                        {handleRoom(options.adult, options.children)}
                      </span>
                      <button
                        onClick={() => handleOptions("room", "i")}
                        className="border-designColor w-full h-full border rounded-md text-xl text-designColor"
                        disabled={options.room >= 30}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
              <button
                onClick={handleSearch}
                className="bg-designColor text-white rounded-full sml:px-3 sml:py-3 "
              >
                <FaArrowRight />
              </button>
            
          </div>
        </div>
      )}
    </>
  );
};

export default SearchBar;

import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { FaLocationDot, FaIndianRupeeSign } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { IoFilter } from "react-icons/io5";
import { FaArrowRight, FaSearch, FaRoute } from "react-icons/fa";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import { RxEnter } from "react-icons/rx";
import { RxExit } from "react-icons/rx";
import useFetch from "../hooks/useFetch.js";
import { Link, useLocation } from "react-router-dom";
import ribbon from "../assets/ribbon.png";

const Hotels = () => {
  const location = useLocation();
  const destinationFromLocation = location?.state?.destination || "Mumbai";
  const [destination, setDestination] = useState(destinationFromLocation);

  
  const optionsFromLocation=location?.state?.options || {
    adult: 1,
    children: 0,
    room: 1,
  }

  const [options, setOptions] = useState(optionsFromLocation);

  const dateFromLocation= location?.state?.date || [
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
      key: "selection",
    },
  ]
  const [date, setDate] = useState(dateFromLocation);
  
  const [min, setMin] = useState(undefined);
  const [max, setMax] = useState(undefined);
  const [showOptions, setShowOptions] = useState(false);
  const [openDate, setOpenDate] = useState(false);

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

  const [isWidth, setIsWidth] = useState(window.innerWidth <= 770);

  useEffect(() => {
    const handleResize = () => {
      setIsWidth(window.innerWidth <= 770);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { data, loading, reFetch } = useFetch(
    `/hotels?city=${destination || 'Mumbai'}&min=${min || 500}&max=${max || 30000}`
  );
  const handleClick = () => {
    setShowOptions(false);
    reFetch();
  };

  const capitalizeFirstLetter = (input) => {
    return input.charAt(0).toUpperCase() + input.slice(1);
  };

  return (
    <div className=" flex justify-center overflow-y-auto ">
      {isWidth ? (
        <>
          <div className="flex-col">
            <div className="flex justify-evenly items-center text-center">
              <div className="relative w-full border rounded-xl border-gray-300 mb-3">
                <FaSearch className="absolute text-black left-2 top-5 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder={destination}
                  value={destination}
                  onChange={(e) => setDestination(capitalizeFirstLetter(e.target.value))}
                  className=" rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-black text-black"
                  id="destination"
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-center items-start text-center border rounded-full mb-4 ml-4 bg-designColor p-2 w-10 h-10">
                <button
                  type="button"
                  onClick={() => setShowOptions(!showOptions)}
                >
                  <IoFilter className="text-2xl " />
                </button>
              </div>
            </div>
            {showOptions && (
              <div>
                <div className="flex h-auto self-center items-center justify-center z-40 ">
                  <div className="flex-col pb-10 w-[85%] h-[80%]">
                    <label htmlFor="dates" className="gray-700">
                      Travel Date
                    </label>
                    <div
                      className="relative h-16 z-40 w-auto border rounded-xl border-gray-300 p-1 mb-4"
                      id="dates"
                    >
                      <div
                        className="cursor-pointer flex justify-evenly items-center w-[100%] h-full "
                        onClick={() => setOpenDate(!openDate)}
                      >
                        <div className="flex-col text-gray-700 flex px-1">
                          <div className=" flex justify-center items-center text-xl gap-[3px]">
                            <RxEnter className="w-auto h-auto text-sm text-gray-700" />
                            <span className="text-xs lgl:text-lg font-semibold text-gray-700">
                              Check-in
                            </span>
                          </div>
                          <div className="text-sm flex justify-center">
                            {`${format(date[0].startDate, "dd MMM yyyy")}`}
                          </div>
                        </div>
                        <div className="flex-col text-gray-700 flex px-1">
                          <div className=" flex justify-center items-center text-xl gap-[3px]">
                            <RxExit className="w-auto h-auto text-sm text-gray-700 font-bold" />
                            <span className="text-xs lgl:text-lg font-semibold text-gray-700">
                              Check-out
                            </span>
                          </div>
                          <div className=" text-sm flex justify-center">
                            {`${format(date[0].endDate, "dd MMM yyyy")}`}
                          </div>
                        </div>
                      </div>
                      {openDate && (
                        <div className="absolute flex-col border-2 rounded-lg px-2 bg-white -left-5 z-50">
                          <DateRange
                            editableDateInputs={true}
                            onChange={(item) => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className="z-50"
                          />
                        </div>
                      )}
                    </div>

                    <label htmlFor="min" className="gray-700">
                      Minimum
                    </label>
                    <div className="relative border rounded-xl h-full border-gray-300 mb-4">
                      <FaIndianRupeeSign className="absolute text-gray-700 left-2 top-5 transform -translate-y-1/2" />

                      <input
                        type="number"
                        placeholder="1000"
                        className=" rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-gray-700 text-gray-700"
                        id="min"
                        onChange={(e) => setMin(e.target.value)}
                      />
                    </div>
                    <label htmlFor="max" className="gray-700">
                      Maximum
                    </label>
                    <div className="relative border rounded-xl h-full border-gray-300 mb-4">
                      <FaIndianRupeeSign className="absolute text-gray-700 left-2 top-5 transform -translate-y-1/2" />

                      <input
                        type="number"
                        placeholder="10000"
                        className=" rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-gray-700 text-gray-700"
                        id="max"
                        onChange={(e) => setMax(e.target.value)}
                      />
                    </div>

                    <div className="relative z-30">
                      <div className=" flex-col">
                        <div className="p-auto m-auto cursor-pointer flex justify-between items-center w-full h-full pt-2 mt-2">
                          <h2 className="gray-700">Adult</h2>
                          <div className="text-gray-500 flex gap-1 px-3">
                            <div className=" flex justify-center items-center text-xl">
                              <button
                                disabled={options.adult <= 1}
                                onClick={() => handleOptions("adult", "d")}
                                className="border-gray-700 w-6 h-6 border rounded-lg  text-xl gray-700 flex justify-center items-center pb-1"
                              >
                                -
                              </button>
                              <span className=" font-semibold flex justify-center mx-3 gray-700">
                                {options.adult}
                              </span>
                              <button
                                onClick={() => handleOptions("adult", "i")}
                                className="border-gray-700 w-6 h-6 border rounded-lg text-xl gray-700 flex justify-center items-center pb-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="p-auto m-auto cursor-pointer flex justify-between items-center w-full h-full border-t pt-2 mt-2">
                          <h2 className="gray-700">Room</h2>
                          <div className="text-gray-500 flex gap-1 px-3">
                            <div className=" flex justify-center items-center text-xl">
                              <div className="flex gap-1 justify-center items-center w-full h-full">
                                <button
                                  disabled={options.room <= 0}
                                  onClick={() => handleOptions("room", "d")}
                                  className="border-gray-700 w-6 h-6 border rounded-lg  text-xl gray-700 flex justify-center items-center pb-1"
                                >
                                  -
                                </button>
                                <span className=" font-semibold flex justify-center mx-2 gray-700">
                                  {handleRoom(options.adult, options.children)}
                                </span>
                                <button
                                  disabled={options.room >= 30}
                                  onClick={() => handleOptions("room", "i")}
                                  className="border-gray-700 w-6 h-6 border rounded-lg text-xl gray-700 flex justify-center items-center pb-1"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="p-auto m-auto cursor-pointer flex justify-between items-center w-full h-full border-y py-2 my-2">
                          <h2 className="gray-700">Children</h2>
                          <div className="text-gray-500 flex gap-1 px-3">
                            <div className=" flex justify-center items-center text-xl">
                              <div className="flex gap-1 justify-center items-center w-full h-full">
                                <button
                                  disabled={options.children <= 0}
                                  onClick={() => handleOptions("children", "d")}
                                  className="border-gray-700 w-6 h-6 border rounded-lg  text-xl gray-700 flex justify-center items-center pb-1"
                                >
                                  -
                                </button>
                                <span className=" font-semibold flex justify-center mx-2 gray-700">
                                  {options.children}
                                </span>
                                <button
                                  disabled={options.children >= 40}
                                  onClick={() => handleOptions("children", "i")}
                                  className="border-gray-700 w-6 h-6 border rounded-lg text-xl gray-700 flex justify-center items-center pb-1"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleClick}
                      className="bg-designColor p-1 text-white rounded-xl sml:px-3 sml:py-3 w-full mt-6 "
                    >
                      Search <FaArrowRight className=" inline" />
                    </button>
                  </div>
                </div>
              </div>
            )}
            <div className="w-full  overflow-hidden px-2 -ml-2">
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {data.map((item) => (
                    <div
                      className="flex overflow-hidden justify-between border-2 rounded-xl p-1 w-full h-[175px] mdl:h-[350px] ml-2 mb-4"
                      key={item._id}
                    >
                      <div className="relative border-2 rounded-2xl overflow-hidden w-[35%]">
                        <img
                          src={item.photos[0]}
                          className="object-cover w-full h-full"
                          // src="https://content.r9cdn.net/rimg/himg/03/f3/8e/leonardo-1268935-Pool_O-821506.jpg?width=500&height=350&xhint=1620&yhint=1000&crop=true"
                          alt="Hotel"
                        />
                        {item.featured && (

                          <div className="absolute flex flex-col items-center content-end -top-10 h-full">
                          <img
                            src={ribbon}
                            alt="discount"
                            className=" w-[60%] h-[70%] mdl:w-[90%] mdl:h-[60%]"
                            />
                          <div className="absolute text-white justify-center items-center top-12 font-extrabold text-xs">
                            20%<div className="flex justify-center">Off</div>
                          </div>

                        </div>
                            )}

                      </div>
                      <div className=" w-[65%] h-[180px] px-2">
                        <div className=" flex justify-between items-center mt-1">
                          <h1 className="text-base font-bold text-designColor">
                            {item.name}
                          </h1>
                          <span className=" text-sm font-semibold w-auto px-1 h-8 bg-designColor text-gray-600 rounded-xl inline-flex justify-center items-center  hover:text-black duration-200 cursor-pointer">
                            <span>
                              <IoStar className=" text-white hover:text-yellow-300 mr-1" />
                            </span>
                            {item.rating}/5
                          </span>
                        </div>
                        <p className="text-gray-800 text-sm ">
                          <FaLocationDot className="inline mr-1 pb-1 h-auto" />
                          {item.city}
                        </p>
                        <h1 className=" text-xs font-normal my-1">
                          {item.title}
                        </h1>
                        <h1
                          className="text-xs font-medium "
                          style={{ font: "Sans", fontSize: "10px" }}
                        >
                          {item.rooms.length} Rooms Available
                        </h1>
                        <div className=" flex justify-between items-stretch text-start">
                          <div className="flex justify-start">
                            <div className="flex-col h-full">
                              <div className=" text-designColor text-xs font-semibold mt-2">
                                Free Cancellation
                              </div>
                              <p
                                className=" text-designColor "
                                style={{ font: "Sans", fontSize: "10px" }}
                              >
                                Lock in this great price today!
                              </p>
                            </div>
                          </div>
                          <div className="flex-col text-end w-[50%]">
                            <div className="-mt-4 w-full">
                              <div className="text-sm w-auto px-1 h-6 rounded-xl border border-designColor inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-200 cursor-pointer">
                                <span>
                                  <FaIndianRupeeSign className=" text-xs" />
                                </span>
                                {item.cheapestPrice}
                              </div>
                              <h2
                                className="text-gray-500 my-[2px] "
                                style={{ font: "Sans", fontSize: "7px" }}
                              >
                                Includes Tax & Fees
                              </h2>
                              <Link to={`/hotels/find/${item._id}`}>
                                <button
                                  type="button"
                                  className="w-full h-full text-xs border-2 p-1 rounded-lg bg-blue-400 font-semibold"
                                >
                                  Check Now
                                </button>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="h-[700px] w-0 sml:w-[30%] sml:m-0 -ml-2 ">
            <div className="h-full bg-designColor rounded-2xl text-base md:text-xl ml-3">
              <h1 className="flex justify-center font-semibold text-xl pt-5 -mb-5">
                Search The Best
              </h1>
              <div className="flex h-auto self-center items-center justify-center z-40 ">
                <div className="flex-col py-10 w-[85%] h-[80%]">
                  <label htmlFor="destination" className="text-white">
                    Destination
                  </label>
                  <div className="relative border rounded-xl h-full border-gray-300 mb-4">
                    <FaSearch className="absolute text-gray-100 sml:visible invisible left-2 top-5 transform -translate-y-1/2" />

                    <input
                      type="text"
                      placeholder={destination}
                      value={destination}
                      onChange={(e) => setDestination(capitalizeFirstLetter(e.target.value))}
                      className=" rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-gray-100 text-gray-100"
                      id="destination"
                    />
                  </div>

                  <label htmlFor="dates" className="text-white">
                    Travel Date
                  </label>
                  <div
                    className="relative h-auto z-40 w-auto border-b-2  border-gray-300 p-1 mb-4"
                    id="dates"
                  >
                    <div
                      className="cursor-pointer flex justify-evenly items-center w-[100%] h-full "
                      onClick={() => setOpenDate(!openDate)}
                    >
                      <div className="flex-col text-gray-100 flex px-1">
                        <div className=" flex justify-center items-center text-xl gap-[3px]">
                          <RxEnter className="w-auto h-auto text-sm text-gray-100" />
                          <span className="text-xs lgl:text-lg font-semibold text-gray-100">
                            Check-in
                          </span>
                        </div>
                        <div className="text-sm flex justify-center">
                          {`${format(date[0].startDate, "dd MMM yyyy")}`}
                        </div>
                      </div>
                      <div className="flex-col text-gray-100 flex px-1">
                        <div className=" flex justify-center items-center text-xl gap-[3px]">
                          <RxExit className="w-auto h-auto text-sm text-gray-100 font-bold" />
                          <span className="text-xs lgl:text-lg font-semibold text-gray-100">
                            Check-out
                          </span>
                        </div>
                        <div className=" text-sm flex justify-center">
                          {`${format(date[0].endDate, "dd MMM yyyy")}`}
                        </div>
                      </div>
                    </div>
                    {openDate && (
                      <div className="absolute flex-col border-2 rounded-lg px-2 bg-white -left-5 z-50">
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDate([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={date}
                          className="z-50"
                        />
                      </div>
                    )}
                  </div>

                  <label htmlFor="min" className="text-white">
                    Minimum
                  </label>
                  <div className="relative border rounded-xl h-full border-gray-300 mb-4">
                    <FaIndianRupeeSign className="absolute text-gray-100 sml:visible invisible left-2 top-5 transform -translate-y-1/2" />

                    <input
                      type="number"
                      placeholder="1500"
                      className=" rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-gray-100 text-gray-100"
                      id="min"
                      onChange={(e) => setMin(e.target.value)}
                    />
                  </div>
                  <label htmlFor="max" className="text-white">
                    Maximum
                  </label>
                  <div className="relative border rounded-xl h-full border-gray-300 mb-4">
                    <FaIndianRupeeSign className="absolute text-gray-100 sml:visible invisible left-2 top-5 transform -translate-y-1/2" />

                    <input
                      type="number"
                      placeholder="10000"
                      className=" rounded-l-full p-2 w-[100%] -mr-1 pl-8 bg-transparent focus:outline-none placeholder:text-gray-100 text-gray-100"
                      id="max"
                      onChange={(e) => setMax(e.target.value)}
                    />
                  </div>

                  <div className="relative z-30">
                    <div className=" flex-col">
                      <div className="p-auto m-auto cursor-pointer flex justify-between items-center w-full h-full pt-2 mt-2">
                        <h2 className="text-white">Adult</h2>
                        <div className="text-gray-500 flex gap-1 px-3">
                          <div className=" flex justify-center items-center text-xl">
                            <button
                              disabled={options.adult <= 1}
                              onClick={() => handleOptions("adult", "d")}
                              className="border-gray-100 w-6 h-6 border rounded-lg  text-xl text-white flex justify-center items-center pb-1"
                            >
                              -
                            </button>
                            <span className=" font-semibold flex justify-center mx-3 text-white">
                              {options.adult}
                            </span>
                            <button
                              onClick={() => handleOptions("adult", "i")}
                              className="border-gray-100 w-6 h-6 border rounded-lg text-xl text-white flex justify-center items-center pb-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="p-auto m-auto cursor-pointer flex justify-between items-center w-full h-full border-t pt-2 mt-2">
                        <h2 className="text-white">Room</h2>
                        <div className="text-gray-500 flex gap-1 px-3">
                          <div className=" flex justify-center items-center text-xl">
                            <div className="flex gap-1 justify-center items-center w-full h-full">
                              <button
                                disabled={options.room <= 0}
                                onClick={() => handleOptions("room", "d")}
                                className="border-gray-100 w-6 h-6 border rounded-lg  text-xl text-white flex justify-center items-center pb-1"
                              >
                                -
                              </button>
                              <span className=" font-semibold flex justify-center mx-2 text-white">
                                {handleRoom(options.adult, options.children)}
                              </span>
                              <button
                                disabled={options.room >= 30}
                                onClick={() => handleOptions("room", "i")}
                                className="border-gray-100 w-6 h-6 border rounded-lg text-xl text-white flex justify-center items-center pb-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-auto m-auto cursor-pointer flex justify-between items-center w-full h-full border-y py-2 my-2">
                        <h2 className="text-white">Children</h2>
                        <div className="text-gray-500 flex gap-1 px-3">
                          <div className=" flex justify-center items-center text-xl">
                            <div className="flex gap-1 justify-center items-center w-full h-full">
                              <button
                                disabled={options.children <= 0}
                                onClick={() => handleOptions("children", "d")}
                                className="border-gray-100 w-6 h-6 border rounded-lg  text-xl text-white flex justify-center items-center pb-1"
                              >
                                -
                              </button>
                              <span className=" font-semibold flex justify-center mx-2 text-white">
                                {options.children}
                              </span>
                              <button
                                disabled={options.children >= 40}
                                onClick={() => handleOptions("children", "i")}
                                className="<border-gray-100 w-6 h-6 border rounded-lg text-xl text-white flex justify-center items-center pb-1"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-white text-designColor rounded-xl sml:px-3 sml:py-3 w-full mt-6 "
                    onClick={handleClick}
                  >
                    Search <FaArrowRight className=" inline" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full p-2 ">
            {loading ? (
              "Loading..."
            ) : (
              <>
                {data.map((item) => (
                  <div className="flex justify-between border-2 rounded-xl p-3 w-full h-[200px] mdl:h-[350px] ml-2 mb-4 " key={item._id}>
                    <div className="border-2 rounded-2xl overflow-hidden w-[35%] ">
                      <img
                        src={item.photos[0]}
                        className="object-cover w-full h-full"
                        // src="https://content.r9cdn.net/rimg/himg/03/f3/8e/leonardo-1268935-Pool_O-821506.jpg?width=500&height=350&xhint=1620&yhint=1000&crop=true"
                        alt="Hotel"
                      />
                    </div>
                    <div className=" w-[65%] px-2">
                      <div className=" flex justify-between items-center ">
                        <h1 className="text-2xl font-bold text-designColor">
                          {item.name}
                        </h1>
                        <p className="text-gray-800 ">
                          <FaLocationDot className="inline m-1 pb-1 h-auto" />
                          {item.city}
                        </p>
                        <span className="text-lg font-semibold w-auto px-3 h-10 bg-designColor text-gray-600 rounded-xl inline-flex justify-center items-center  hover:text-black duration-200 cursor-pointer">
                          <span>
                            <IoStar className=" text-white hover:text-yellow-300 mr-1" />
                          </span>
                          {item.rating}/5
                        </span>
                      </div>
                      <h1 className="text-lg font-bold mt-3">{item.title}</h1>
                      <p className="text-gray-800 mt-4">
                        <FaRoute className="inline m-1 pb-1 h-auto" />
                        {item.distance}m from City Center
                      </p>
                      <p className="text-gray-800 my-3">{item.address}</p>

                      <div className=" flex justify-between items-stretch text-start">
                        <div className="flex justify-start mt-3">
                          <div className="flex-col h-full">
                            <h1 className="text-base font-medium mb-3 ">
                              {item.rooms.length} Rooms Available
                            </h1>
                            {item.featured && (
                              <span className=" p-1 rounded-lg  text-white bg-designColor text-base font-semibold mb-2">
                                Flat 10% Off
                              </span>
                            )}
                            <div className=" text-designColor text-base font-semibold my-2">
                              Free Cancellation
                            </div>
                            <p className=" text-designColor ">
                              You can cancel later, so lock in this great price
                              today!
                            </p>
                          </div>
                        </div>
                        <div className="flex-col text-end">
                          <div className="-mt-10">
                            <div className="text-lg w-auto px-1 h-10 rounded-xl border border-designColor inline-flex justify-center items-center text-gray-400 hover:text-designColor duration-200 cursor-pointer">
                              <span>
                                <FaIndianRupeeSign className="" />
                              </span>
                              {item.cheapestPrice}
                            </div>
                            <h2 className="text-gray-500 my-2">
                              Taxes Included
                            </h2>
                            <Link to={`/hotels/find/${item._id}`}>
                              <button
                                type="button"
                                className="border-2 p-2 rounded-xl bg-blue-400 font-semibold"
                              >
                                Check Availability
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Hotels;

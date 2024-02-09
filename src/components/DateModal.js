import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

const DateDateModal = () => {
  const [showDateModal, setShowDateModal] = useState(false);

  const [date, setDate] = useState([
    {
      startDate: new Date(),
      endDate: new Date(new Date().getTime() + 24*60*60*1000),     
      key: "selection",
    },
  ]);
  return (
    <>
      <button
        className=" bg-designColor text-black text-lg
      font-bold px-2 py-2 rounded-full shadow hover:border-black hover:border ml-1 "
        type="button"
        onClick={() => setShowDateModal(true)}
      >
        <FaCalendarAlt />
      </button>
      {showDateModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                
                <div className="relative p-6 flex-auto">
                  <DateRange
                    editableDateInputs={true}
                    onChange={(item) => setDate([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={date}
                  />
                </div>
                <div className="flex items-center justify-end p-5 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 font-titleFont background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowDateModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white font-titleFont bg-designColor font-bold uppercase text-sm px-3 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowDateModal(false)}
                  >
                    Select
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default DateDateModal;

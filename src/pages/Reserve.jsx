import React, { useContext, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import useFetch from "../hooks/useFetch";
import { SearchContext } from "../context/SearchContext";
import axios from "axios";
import { useModalContext } from "../context/ModalContext";
const {BASE_URL} = process.env;
const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { setCongratsModalOpen } = useModalContext();
  const { data } = useFetch(`${REACT_APP_BASE_URL}/api/hotels/room/${hotelId}`);
  const { date } = useContext(SearchContext);
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const startdate = new Date(start.getTime());

    // console.log(start);
    let daterange = [];
    while (startdate <= end) {
      const truncatedDate = new Date(startdate);
      truncatedDate.setMilliseconds(0);

      daterange.push(truncatedDate.getTime());
      startdate.setDate(startdate.getDate() + 1);
    }
    return daterange;
  };
  // console.log(date[0]);
  const alldates = getDatesInRange(
    date[0]?.startDate || new Date(),
    date[0]?.endDate || new Date()
  );

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) => {
      // const dateInMilliseconds = new Date(date).getTime();
      // console.log("dateInMilliseconds:", dateInMilliseconds);
      // console.log(
      //   "alldates.includes(dateInMilliseconds):",
      //   alldates.includes(dateInMilliseconds)
      // );
      return alldates.includes(new Date(date).getTime());
    });
    // console.log("isFound", isFound);
    return !isFound;
  };

  const handleSelect = (e) => {
    const selected = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      selected
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };
  const handleClick = async () => {
    try {
      // console.log(alldates);
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`${REACT_APP_BASE_URL}/api/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      setCongratsModalOpen(true);

      setTimeout(()=>{
        setCongratsModalOpen(false)
      },3000);

    } catch (err) {}

    
  };


  // const handleSubscribe = () => {
  //   setIsModalOpen(true)

  //   setTimeout(()=>{
  //     closeModal();
  //   },2000);
  // };

  // const closeModal = () =>{
    
  //   setIsModalOpen(false)
  // }

  return (
    <div className=" w-screen h-screen bg-black bg-opacity-40 fixed top-0 left-0 flex items-center justify-center">
      <div className=" bg-slate-100 p-4 rounded-2xl border-2 border-black">
        <div className=" flex justify-between items-center">
          <span className=" text-2xl font-semibold mt-4 ">
            Select your Rooms:
          </span>
          <IoCloseCircle onClick={() => setOpen(false)} className=" text-3xl" />
        </div>
        {data.map((item) => (
          <div
            key={item._id}
            className=" flex justify-between items-center border-b-2 "
          >
            <div className="w-3/4">
              <div className=" font-titleFont font-semibold text-lg mt-2">
                {item.title}
              </div>

              <div>{item.desc}</div>
              <div>Max People: {item.maxPeople}</div>
              <div className=" text-designColor text-base font-bold">
                Rs.{item.price}
              </div>
            </div>
            <div className=" flex justify-end w-1/4">
              {item.roomNumbers.map((roomNumber) => (
                <div key={roomNumber._id} className="mx-1 flex-col text-center">
                  <div>{roomNumber.number}</div>
                  <input
                    id="checkbox"
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                    className=" cursor-pointer h-5 w-5 border-2 "
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={handleClick}
          className="w-full bg-designColor rounded-lg text-xl p-1 font-semibold mt-3"
        >
          Book Now!
        </button>
      </div>
      {/* {isModalOpen && <CModal title="Congratulations!!!" desc="Great rewards on your way" image={thankyou} isOpen={setIsModalOpen} onClose={closeModal}/>} */}
    </div>
  );
};

export default Reserve;

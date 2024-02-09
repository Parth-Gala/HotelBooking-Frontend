import React, { useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import { useLocation } from "react-router-dom";
import { FaLocationDot, FaIndianRupeeSign } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { SearchContext } from "../context/SearchContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Reserve from "./Reserve";
import CModal from "../components/CModal";
import thankyou from "../assets/thankyou.png";
import { useModalContext } from "../context/ModalContext";
const Rooms = () => {
  
  // const days = dayDifference(date[0].endDate, date[0].startDate);

  const location = useLocation();
  const id = location.pathname ? location.pathname.split("/")[3] : null;
  const { data, isLoading } = useFetch(`https://hotelbooking-backend-0fma.onrender.com/api/hotels/find/${id}`);
  const [ openModal, setOpenModal ] = useState(false);
  // const [ congratsModal, setCongratsModal ] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { isCongratsModalOpen } = useModalContext();


  const {date} = useContext(SearchContext);
  // console.log(date);
  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  // console.log(date);
  var days = 2;
  if(date.length === 0){
    days = 2;
  }else{
    days = dayDifference(date[0].endDate, date[0].startDate);
    // console.log(days);
  }
 
  const handleClick = () => {
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login");
    }
  }

  return (
    <div className=" ">
      {isLoading ? (
        "Loading.."
      ) : (
        <div className="flex-col items-center m-5" key={data.id}>
          <div className="flex-col ">
            <div className="flex justify-between">
              <h1 className=" text-3xl text-designColor">
                {data.name}
                <span className=" text-base font-semibold w-auto px-1 ml-4 rounded-md h-8 bg-designColor text-gray-600 inline-flex justify-center items-center hover:text-black duration-200 cursor-pointer">
                  <IoStar className="inline text-white hover:text-yellow-300 mr-1" />
                  {data.rating}/5
                </span>
              </h1>
              {data.rooms && data.rooms.length > 0 ? (
                <button
                  type="button"
                  className=" border-2 w-[50%] mdl:w-[20%] h-auto sml:p-5 p-0 rounded-xl bg-blue-400 font-semibold text-lg sml:text-2xl"
                onClick={handleClick}>
                  Book Now!
                </button>
              ) : (
                <button
                  type="button"
                  disabled={true}
                  className=" border-2 w-[50%] mdl:w-[20%] h-auto sml:p-5 p-0 rounded-xl bg-blue-200 font-semibold text-lg sml:text-2xl"
                >
                  Contact the Owner
                </button>
              )}
            </div>
            <p className="text-gray-800 font-semibold text-xl mb-4 -mt-2">
              {data.title}
            </p>
            <p className="text-gray-800 text-lg ">
              <FaLocationDot className="inline mr-1 pb-1 text-lg h-auto" />
              {data.address}
            </p>
            <p className="text-gray-800 font-medium my-1">
              Excellent Location -{" "}
              {data.distance ? `${data.distance}m from ` : ""}
              {data.address ? data.address.split(",")[0] : ""}
            </p>

            <p className="text-designColor font-medium mt-4">
              Book a stay at this property for {days} days at just{" "}
              <FaIndianRupeeSign className="text-lg pb-1 -mr-1 inline" />
              {data.cheapestPrice} per night and enjoy a complimentary breakfast!
            </p>
            {data.rooms && data.rooms.length > 0 ? (
              <p className="text-designColor font-medium mb-1">
                Hurry up! Only {data.rooms ? data.rooms.length : 0} rooms left!
              </p>
            ) : (
              <p className="text-red-500 font-medium mb-1">
                Sorry No rooms are available currently!
              </p>
            )}
            <p className="text-gray-800 text-xl my-2">{data.desc}</p>
          </div>

          <div className="border-2 rounded-xl border-gray-300">
            <div className="grid grid-cols-1 lg:grid-cols-3 mdl:grid-cols-2 ">
              {data.photos
                ? data.photos.map((photo,i) => (
                    <div className=" flex justify-center m-4" key={i}>
                      <div
                        className="flex justify-between w-[100%] h-auto "
                      >
                        <img
                          src={photo}
                          alt="Rooms Images"
                          className=" object-cover h-full w-full"
                        />
                      </div>
                    </div>
                  ))
                : "No Photos Found"}
            </div>
          </div>
        </div>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
     {isCongratsModalOpen && (
        <CModal
          title="Pack Your Bags!!!"
          desc="Room booked successfully"
          image={thankyou}
          isOpen={isCongratsModalOpen}
        />
      )}
    </div>
  );
};

export default Rooms;                                                                              

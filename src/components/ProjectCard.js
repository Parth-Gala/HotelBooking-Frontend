import React from "react";
// import { FaGlobe } from "react-icons/fa";
// import { BsGithub } from "react-icons/bs";
import useFetch from "../hooks/useFetch";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { IoStar } from "react-icons/io5";
import { FaLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import './ScrollBar.css';

const ProjectCard = () => {
  const { data, loading } = useFetch(
    `https://hotelbooking-backend-0fma.onrender.com/api/hotels?min=1000&max=10000&featured=true&limit=4`
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-12">
      {loading ? (
        "Loading..."
      ) : (
        <>
          {Array.isArray(data) &&
            data.map((item) => (
              <Link key={item._id} to={`/hotels/find/${item._id}`}>
              <div className="w-full h-full p-4 xl:py-6 rounded-lg flex flex-col items-center bg-gray-200 transition-colors duration-100 group">
                <div className="w-full h-[100%] overflow-hidden rounded-xl">
                  <img
                    className="w-full rounded-xl h-56 object-cover group-hover:scale-110 duration-300"
                    src={item?.photos[0]}
                    alt="Hotel images"
                  />
                </div>
                <div className="w-full mt-2 flex flex-col gap-2 items-center">
                  <div className="w-full flex items-center justify-between">
                    <h3 className="text-xl text-gray-800">{item?.name}</h3>
                    <div className="flex gap-2">
                      <span className="text-md w-auto px-2 mx-2 bg-designColor text-gray-800 rounded-xl inline-flex justify-center items-center hover:text-black duration-200 cursor-pointer">
                        <span>
                          <IoStar className="text-yellow-400 mr-1"/>
                        </span>
                        {item?.rating}/5
                      </span>
                      <span className="text-lg w-auto px-1 h-10 rounded-xl inline-flex justify-center items-center text-gray-600 hover:text-designColor duration-200 cursor-pointer">
                        <span>
                          <FaIndianRupeeSign size={14} />
                        </span>
                        {item?.cheapestPrice}
                      </span>
                    </div>
                  </div>
                  <div className="w-full h-24 overflow-x-auto scrollbar-hide">
                    <p className="text-gray-800 flex gap-2 items-center">
                      <FaLocationDot size={16}/>
                      {item.city}
                    </p>
                    <p className="text-green-600 mt-2">
                    {item?.rooms?.length} rooms available
                    </p>
                  </div>
                  <div className="w-full h-24 -mt-12 overflow-auto custom-scrollbar">
                    <p className="text-gray-800">{item?.desc}</p>
                  </div>
                </div>
              </div>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default ProjectCard;

import React from "react";
import useFetch from "../hooks/useFetch";
import "./ScrollBar.css";

const HotelCard = () => {
  const { data, loading } = useFetch(`https://hotelbooking-backend-0fma.onrender.com/api/hotels/countByType`);

  const images = [
    "https://www.ahstatic.com/photos/6926_ho_00_p_1024x768.jpg",
    "https://www.aveliving.com/AVE/media/Property_Images/Florham%20Park/hero/flor-apt-living-(2)-hero.jpg?ext=.jpg",
    "https://content.r9cdn.net/rimg/himg/03/f3/8e/leonardo-1268935-Pool_O-821506.jpg?width=500&height=350&xhint=1620&yhint=1000&crop=true",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQioDbvXTXMmvxpSxkSFJFLyelHi1dkVkktyA&usqp=CAU",
    "https://media-cdn.tripadvisor.com/media/photo-s/1b/64/1a/36/walnut-cabin.jpg",
  ];

  return (
    <div className="box-content overflow-auto">
      <div className="flex gap-8 justify-between">
        {loading ? (
          "Loading..."
        ) : (
          <>
            {Array.isArray(data) &&
              data.map((item, i) => (
                <div
                  className="flex flex-col justify-center align-middle items-start border rounded-2xl p-4"
                  key={i}
                >
                  <div className="border-2 border-white rounded-xl h-full w-[250px] mb-2">
                    <img src={images[i]} alt="Types of Stays" className="h-full" />
                  </div>
                  <div className="text-gray-600 font-bold capitalize pl-3">{item.type}</div>
                  <div className="text-gray-600 pl-3">{item.count} {item.type}</div>
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default HotelCard;

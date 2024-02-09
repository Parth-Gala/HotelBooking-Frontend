import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import { FaCircleChevronLeft, FaCircleChevronRight } from "react-icons/fa6";

export default function Carousel({
  children: slides,
  autoSlide = false,
  autoSlideInterval = 1000,
}) {
  const [curr, setCurr] = useState(0);

  const prev = () => 
    setCurr((curr === 0 ? slides.length - 1 : curr - 1));

  const next = useCallback(() => 
    setCurr((curr === slides.length - 1 ? 0 : curr + 1)), [slides.length, curr]);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [autoSlide, autoSlideInterval, next ]);

  return (
    <div className="bg-black border-designColor border-4 rounded-2xl">
 <div className=" overflow-hidden relative z-20 opacity-60" style={{ height: "400px" }}>
      <div
        className=" flex transition-transform ease-out duration-700"
        style={{ transform: `translateX(-${curr * 100}%)`, height: "100%", width:"auto"}}
      >
      <span className="flex" style={{objectFit: "cover", height: "200%"}}>{slides}</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-between p-4">
        <button
          onClick={prev}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FaCircleChevronLeft className="h-8 w-8" />
        </button>
        <button
          onClick={next}
          className="p-1 rounded-full shadow bg-white/80 text-gray-800 hover:bg-white"
        >
          <FaCircleChevronRight className="h-8 w-8" />
        </button>
      </div>

      <div className="absolute bottom-4 right-0 left-0">
        <div className=" flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              className={` transition-all w-3 h-3 bg-white rounded-full ${
                curr === i ? "p-2" : "bg-opacity-50"
              }`}
            ></div>
          ))}
        </div>
      </div>
    </div>
    </div>
   
  );
}

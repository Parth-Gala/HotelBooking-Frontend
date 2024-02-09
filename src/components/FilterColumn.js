// import React, { useEffect, useState } from "react";
// import { FaArrowRight, FaSearch } from "react-icons/fa";
// import { FaIndianRupeeSign } from "react-icons/fa6";
// import "react-date-range/dist/styles.css";
// import "react-date-range/dist/theme/default.css";
// import { DateRange } from "react-date-range";
// import { format } from "date-fns";
// import { RxEnter } from "react-icons/rx";
// import { RxExit } from "react-icons/rx";
// import { useLocation } from "react-router-dom";
// import useFetch from "../hooks/useFetch";

// const FilterColumn = () => {
//   const location = useLocation();
//   const [destination, setDestination] = useState(location.state.destination );
//   const [options, setOptions] = useState(location.state?.options ||{
//     adult: 1,
//     children: 0,
//     room: 1,
//   });
//   const [date, setDate] = useState(location.state.date || [
//     {
//       startDate: new Date(),
//       endDate: new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//       key: "selection",
//     },
//   ]);


//   const [showOptions, setShowOptions] = useState(false);

//   const [min, setMin] = useState(undefined);
//   const [max, setMax] = useState(undefined);
//   const [openDate, setOpenDate] = useState(false);

//   const handleOptions = (name, operation) => {
//     setOptions((prev) => {
//       return {
//         ...prev,
//         [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
//       };
//     });
//   };

//   const handleRoom = (adult, childrens) => {
//     const peoplePerRoom = 3;

//     const totalPeople = adult + childrens;
//     const roomNeeded = Math.ceil(totalPeople / peoplePerRoom);

//     if (roomNeeded > options.room) {
//       options.room = roomNeeded;
//     }

//     return options.room;
//   };

//   const {data, loading, error, reFetch} = useFetch(`/hotels?city=${destination}&min=${min || 500}&max=${max || 30000}`)
//   const handleClick = () => {
//     reFetch();
//   }

//   return (
//     <div></div>
//   );
// };

// export default FilterColumn;

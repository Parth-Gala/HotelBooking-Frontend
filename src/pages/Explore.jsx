// import React, {useState} from 'react'
// import axios from 'axios';
// const Explore = () => {
//   const [recommendation, setRecommendation] = useState(null);

//   const handleRecommendation = async () => {
//     const budget_range = [10000, 15000]; 
//     const num_days = 5; 
//     const city_name = 'New York'; 
//     const num_people = 2; 
//     const rating_sort = true; 
//     const price_sort = true; 

//     try {
//       const response = await axios.post(`https://hotelbooking-backend-0fma.onrender.com/api/hotel-recommendation`, {
//         budget_range,
//         num_days,
//         city_name,
//         num_people,
//         rating_sort,
//         price_sort,
//       });

//       setRecommendation(response.data.result);
//     } catch (error) {
//       console.error('Error fetching recommendation:', error);
//     }
//   };
//   return (
//     <div className='m-4'>
//       <h1>Hotel Recommendation</h1>
//       <button onClick={handleRecommendation} className='border'>Get Recommendation</button>
//       {recommendation && (
//         <div>
//           <h2>Recommendation Result:</h2>
//           <pre>{JSON.stringify(recommendation, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   )
// };

// export default Explore

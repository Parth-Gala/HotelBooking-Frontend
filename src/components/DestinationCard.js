import React from "react";
import useFetch from "../hooks/useFetch";
import delhi from "../assets/Delhi.jpg";
import kerala from "../assets/Kerala.jpg";
import sikkim from "../assets/Sikkim.jpg";
import gujarat from "../assets/Gujarat.jpg";
import manali from "../assets/Manali.jpg";
import darjeeling from "../assets/Darjeeling.jpg";
import mumbai from "../assets/Mumbai.jpg";
import kashmir from "../assets/Kashmir.jpg";

const DestinationCard = () => {
  const { data, loading } = useFetch(
    `https://hotelbooking-backend-0fma.onrender.com/api/hotels/countByCity?cities=Delhi,Kerala,Sikkim,Gujarat,Manali,Darjeeling,Mumbai,Kashmir`
  );

  // const destinationimages = [
  //   "https://media.discordapp.net/attachments/1088179483858710569/1192565721574678578/Delhi.jpg?ex=65a98a60&is=65971560&hm=1182f2035b3df3a30d3532b5dd426b1d047143b5d461c25e9b9262be7b3e710e&=&format=webp&width=1172&height=565",
  //   "https://media.discordapp.net/attachments/1088179483858710569/1192567117757821028/Kerala.jpg?ex=65a98bad&is=659716ad&hm=2dd456c078153d557db8cbb4865ede4ee2c991340ac7c0648872f358f4ab5daa&=&format=webp&width=1042&height=586",
  //   "https://media.discordapp.net/attachments/1088179483858710569/1192567233407369276/Sikkim.jpg?ex=65a98bc9&is=659716c9&hm=92e96738d7231d86a869c2797de20a8a5465b81a87f07654207bcc227dbb04f9&=&format=webp&width=880&height=586",
  //   "https://cdn.discordapp.com/attachments/1088179483858710569/1192567112728854628/Gujarat.jpg?ex=65a98bac&is=659716ac&hm=9fdc61420ea24a154b645eaaad2344988a9d6a1e8b6db6aa4fb0176a9f81e431&",
  //   "https://cdn.discordapp.com/attachments/1088179483858710569/1192567171033870386/Manali.jpg?ex=65a98bba&is=659716ba&hm=11c71a722d5bf923527292eb38830aed3297efd87abae2a41fce2f2adb169195&",
  //   "https://cdn.discordapp.com/attachments/1088179483858710569/1192567110908510248/Darjeeling.jpg?ex=65a98bac&is=659716ac&hm=962e505fe1ea9044c2756ada272800f5658118ac44b26fd953e0e26ff70f5387&",
  //   "https://cdn.discordapp.com/attachments/1088179483858710569/1192567172338307072/Mumbai.jpg?ex=65a98bba&is=659716ba&hm=18fde6e08e5b4b251970508e96581321603e4a585787dec61b982b801a005815&",
  //   "https://cdn.discordapp.com/attachments/1088179483858710569/1192567116583419965/Kashmir.jpg?ex=65a98bad&is=659716ad&hm=0a7683595b1bc86951012752ad35b92db7e9cf3b97e4feb4bb071f0544679366&",
  // ];

  const destinationimages = [
    delhi, kerala, sikkim, gujarat, manali, darjeeling, mumbai, kashmir
  ];

  return (
    <div className="p-5 md:p-10">
      <div className="grid grid-cols-1 gap-5 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
        {loading ? ("Loading Please Wait" ) : <>
        <div className="col-span-1 lg:col-span-2 lg:row-span-2 relative hover:scale-105 duration-200 sca ">
          <img
            src={destinationimages[0]}
            alt="Destination "
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Delhi
            </span>
            <div className=" text-lg">{data[0]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 relative hover:scale-105 duration-200  ">
          <img
            src={destinationimages[1]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Kerala
            </span>
            <div className=" text-lg">{data[1]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 relative hover:scale-105 duration-200">
          <img
            src={destinationimages[2]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Sikkim
            </span>
            <div className=" text-lg">{data[2]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 relative hover:scale-105 duration-200">
          <img
            src={destinationimages[3]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer ">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Gujarat
            </span>
            <div className=" text-lg">{data[3]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 relative hover:scale-105 duration-200">
          <img
            src={destinationimages[4]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Manali
            </span>
            <div className=" text-lg">{data[4]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 relative hover:scale-105 duration-200">
          <img
            src={destinationimages[5]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Darjeeling
            </span>
            <div className=" text-lg">{data[5]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 relative hover:scale-105 duration-200">
          <img
            src={destinationimages[6]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Mumbai
            </span>
            <div className=" text-lg">{data[6]} Properties</div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-1 relative hover:scale-105 duration-200">
          <img
            src={destinationimages[7]}
            alt="Destination"
            className="w-full h-auto border border-black rounded-2xl hover:cursor-pointer"
          />
          <div className="absolute inset-0 h-[0%] left-0 right-0 p-4 text-white hover:cursor-pointer">
            <span className="font-bold text-2xl border bg-orange-100 text-black px-4 rounded-full">
              Kashmir
            </span>
            <div className=" text-lg">{data[7]} Properties</div>
          </div>
        </div>
        </>}
      </div>
    </div>
  );
};

export default DestinationCard;

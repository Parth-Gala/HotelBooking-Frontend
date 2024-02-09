import React, { useState, useEffect, useContext } from "react";
import Carousel from "../components/Carousel.js";
import Banner from "../assets/Banner.jpg";
import ProjectCard from "../components/ProjectCard.js";
import Title from "../components/Title";
import ribbon from "../assets/ribbon.png";
import SearchBar from "../components/SearchBar.js";
import DestinationCard from "../components/DestinationCard.js";
import HotelCard from "../components/HotelCard.js";
import { AuthContext } from "../context/AuthContext.js";
import logo from "../assets/logo.png";
import { FiMail, FiSend } from "react-icons/fi";
import {
  FaWhatsapp,
  FaInstagram,
  FaGithub,
  FaDiscord,
} from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import CModal from "../components/CModal.js";
import subscribe from "../assets/subscribe.png";
import { Link } from "react-router-dom";
const slides = [
  "https://cdn.discordapp.com/attachments/1088179483858710569/1192567171033870386/Manali.jpg?ex=65a98bba&is=659716ba&hm=11c71a722d5bf923527292eb38830aed3297efd87abae2a41fce2f2adb169195&",
  "https://cdn.discordapp.com/attachments/1088179483858710569/1192567110908510248/Darjeeling.jpg?ex=65a98bac&is=659716ac&hm=962e505fe1ea9044c2756ada272800f5658118ac44b26fd953e0e26ff70f5387&",
  "https://media.discordapp.net/attachments/1088179483858710569/1192567117757821028/Kerala.jpg?ex=65a98bad&is=659716ad&hm=2dd456c078153d557db8cbb4865ede4ee2c991340ac7c0648872f358f4ab5daa&=&format=webp&width=1042&height=586",
  "https://cdn.discordapp.com/attachments/1088179483858710569/1192567172338307072/Mumbai.jpg?ex=65a98bba&is=659716ba&hm=18fde6e08e5b4b251970508e96581321603e4a585787dec61b982b801a005815&",
  "https://media.discordapp.net/attachments/1088179483858710569/1192567233407369276/Sikkim.jpg?ex=65a98bc9&is=659716c9&hm=92e96738d7231d86a869c2797de20a8a5465b81a87f07654207bcc227dbb04f9&=&format=webp&width=880&height=586",
];

// const names = ['Manali', 'Delhi', 'Darjeeling', 'Kerala', 'Sikkim']
const Home = () => {
  const [isWidth, setIsWidth] = useState(window.innerWidth <= 450);

  useEffect(() => {
    const handleResize = () => {
      setIsWidth(window.innerWidth <= 450);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { user } = useContext(AuthContext);
  useEffect(() => {
    // console.log("User updated ", user);
  }, [user]);

  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = () => {
    setIsModalOpen(true);

    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="w-full h-auto bg-white text-lightText px-4 ">
        {/* <Navbar /> */}
        <div className="my-5 relative">
          {isWidth ? (
            <div className="">
              <Carousel autoSlide={true} autoSlideInterval={2500}>
                {slides.map((slide) => (
                  <img
                    className=" border border-black rounded-2xl"
                    src={slide}
                    alt="Carousel images"
                    style={{ objectFit: "cover", height: "50%" }}
                  />
                ))}
              </Carousel>
              <br />
              {/* <div className="justify-center flex ">
              <SearchBar />
            </div> */}
            </div>
          ) : (
            <div>
              <div className="relative flex justify-center overflow-hidden bg-black border-black rounded-2xl z-0">
                <img
                  src={Banner}
                  alt="Banner"
                  className="overflow-hidden border border-black rounded-2xl opacity-50"
                  style={{ objectFit: "cover", width: "100%", height: "500px" }}
                />
                <div className="absolute flex flex-col items-center content-end right-10 -top-10 h-full">
                  <img
                    src={ribbon}
                    alt="discount"
                    className=" w-[80%] h-[40%] mdl:w-[90%] mdl:h-[60%]"
                  />
                  <div className="absolute text-white justify-center items-center top-20 font-extrabold mdl:text-3xl text-xl">
                    20%<div className="flex justify-center">Off</div>
                  </div>
                </div>
                <div className="absolute justify-center self-center text-white lg:text-4xl text-2xl m-8">
                  <div className="text-center">
                    Breathtaking Views, Cozy Retreats{" "}
                  </div>
                  <div className=" text-center">
                    Discover Himalayan Bliss at Our Exclusive Hotels.
                  </div>
                </div>
                {/* <div className="absolute justify-end align-baseline -bottom-5 z-50">
                <SearchBar />
              </div> */}
              </div>
            </div>
          )}
          <br />
          <div className="absolute flex justify-center align-middle items-center content-center self-center inset-x-0 bottom-0">
            <SearchBar />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-[90%] border-2 rounded-full"></div>
        </div>

        <div className=" -mt-12">
          <section
            id="projects"
            className="w-full py-20 border-b-[1px] border-b-black"
          >
            <div className="flex justify-center items-center text-center">
              <Title title="Stay on Choice" des="Best Stays" />
            </div>
            <HotelCard />
          </section>
        </div>

        <div className=" -mt-12">
          <section
            id="projects"
            className="w-full py-20 border-b-[1px] border-b-black"
          >
            <div className="flex justify-center items-center text-center">
              <Title
                title="The Unforgettable Spots"
                des="Discover Top Destinations"
              />
            </div>
            <DestinationCard />
          </section>
        </div>

        <div className=" -mt-12">
          <section id="projects" className="w-full py-20">
            <div className="flex justify-center items-center text-center">
              <Title title="Explore Top Stay's" des="Best Hotels" />
            </div>
            <ProjectCard />
          </section>
        </div>
      </div>

      <div className="bg-designColor flex justify-center">
        <div className="text-white py-4 w-[75%]">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-evenly ">
            <div className="flex items-center mb-4 sm:mb-0">
              <FiMail className="text-4xl m-2" />
              <div className="ml-2 mb-3">
                <p className="text-lg font-semibold">
                  Subscribe to our Newsletter
                </p>
                <p className="text-sm mt-1">Get exclusive latest deals!</p>
              </div>
            </div>
            <div className="flex items-center mx-2 bg-green-700 rounded-full p-3">
              <div className="flex mx-1 rounded-full">
                <input
                  type="email"
                  placeholder="xxxxxxmail@gmail.com"
                  className="md:w-[300px] w-full bg-transparent rounded-3xl py-2 pl-2 outline-none focus:border-blue-300 text-white text-xl placeholder-gray-200 "
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <button
                  className="bg-white text-black py-2 px-3 rounded-full hover:bg-blue-100 focus:outline-none"
                  onClick={handleSubscribe}
                >
                  <FiSend className="inline" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer class=" bg-gray-200 ">
        <div class=" w-full py-6 lg:py-8 p-3">
          <div class="md:flex md:justify-between">
            <div className="w-full md:w-1/4 mr-20">
              <div class="mb-6 md:mb-10">
                <Link to="/" class="flex items-center">
                  <img src={logo} class="h-10 me-3" alt="FlowBite Logo" />
                  <span class="self-center text-2xl font-semibold whitespace-nowrap text-gray-800">
                    Panda Bagpackers
                  </span>
                </Link>
              </div>
              <div className="mb-4 flex flex-col xl:flex-row gap-3 justify-between">
                <h2 class="my-4 ml-4 text-sm font-semibold uppercase text-gray-800">
                  Follow us
                </h2>
                <div className="flex gap-4">
                  <span className="bannerIcon">
                    <FaWhatsapp
                      onClick={() =>
                        window.open(
                          "https://wa.me/+919819615731?text=Hi%20Parth,%20I%20would%20like%20to%20connect%20with%20you."
                        )
                      }
                    />
                  </span>
                  <span className="bannerIcon">
                    <FaInstagram
                      onClick={() =>
                        window.open("https://www.instagram.com/p_rthgala")
                      }
                    />
                  </span>
                  <span className="bannerIcon">
                    <FaDiscord
                      onClick={() =>
                        window.open(
                          "https://discordapp.com/users/parthgala6703"
                        )
                      }
                    />
                  </span>
                  <span className="bannerIcon">
                    <FaGithub
                      onClick={() =>
                        window.open("https://github.com/Parth-Gala")
                      }
                    />
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full md:w-3/4 flex justify-between ">
              <div class=" flex justify-between ">
                <div className="grid grid-cols-2">
                  <div className="mx-4 ">
                    <h2 class="mb-6 text-sm font-semibold uppercase text-gray-800">
                      Contact
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a
                          href="/"
                          class="hover:underline"
                        >
                          pandas@gmail.com
                        </a>
                      </li>
                      <li className=" underline">+919819494333</li>
                      <li className="">
                        <FaHouse className="inline" />
                        G-03,Avion Palace,Station Road, Malad (East)
                      </li>
                    </ul>
                  </div>

                  <div className=" mx-4">
                    <h2 class="mb-6 text-sm font-semibold text-gray-800 uppercase ">
                      Legal
                    </h2>
                    <ul class="text-gray-500 dark:text-gray-400 font-medium">
                      <li class="mb-4">
                        <a href="/" class="hover:underline">
                          Privacy Policy
                        </a>
                      </li>
                      <li class="mb-4">
                        <a href="/" class="hover:underline">
                          FAQ
                        </a>
                      </li>
                      <li>
                        <a href="/" class="hover:underline">
                          Terms &amp; Conditions
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-center">
            <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2024{" "}
              <a href="https://github.com/Parth-Gala" class="hover:underline">
                Parth Gala™
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>

      {isModalOpen && (
        <CModal
          title="Congratulations!!!"
          desc="Great rewards on your way"
          image={subscribe}
          isOpen={setIsModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Home;

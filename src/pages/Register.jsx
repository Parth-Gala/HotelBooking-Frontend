import React, { useContext } from "react";
import { useState } from "react";
import { AuthContext } from "../context/AuthContext";
import logo from "../assets/logo.png";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CModal from "../components/CModal";
import wrongdetails from "../assets/wrongdetails.png";
import correct from "../assets/correct.png";

const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    email: undefined,
    password: undefined,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`https://hotelbooking-backend-0fma.onrender.com/api/auth/register`, credentials);
      setIsModalOpen(true)
      Cookies.set("username", credentials.username);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      setTimeout(() => {
        navigate("/");
      }, 2300);
    } catch (err) {
      setIsModalOpen(true)
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }

    setTimeout(() => {
      closeModal();
    }, 2500);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  return (
    <div class="h-screen  w-full">
      <div class="flex flex-col items-center justify-center bg-gradient-to-tl from-green-400 to-indigo-900">
        <img src={logo} alt="Panda" className="w-32 h-32 " />
        <div class="bg-white shadow rounded lg:w-1/3  md:w-1/2 w-full p-10 mb-16 ">
          <p
            tabindex="0"
            class="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800"
          >
            Pack your bags, Panda is here!
          </p>
          <p
            tabindex="0"
            class="focus:outline-none text-sm mt-4 font-medium leading-none text-gray-500"
          >
            Already a member?{" "}
            <Link
              to="/login"
              className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-gray-800 cursor-pointer"
            >
              Sign in here
            </Link>
          </p>

          <div className="mt-6 w-full">
            <label
              id="username"
              class="text-sm font-medium leading-none text-gray-800"
            >
              Name
            </label>
            <input
              aria-labelledby="username"
              type="text"
              class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              onChange={handleChange}
              id="username"
              placeholder="Name"
            />
          </div>
          <div className="mt-3 w-full">
            <label
              id="email"
              class="text-sm font-medium leading-none text-gray-800"
            >
              Email
            </label>
            <input
              aria-labelledby="email"
              type="email"
              id="email"
              onChange={handleChange}
              class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
              placeholder="youremail@gmail.com"
            />
          </div>
          <div class="mt-3  w-full">
            <label
              for="password"
              class="text-sm font-medium leading-none text-gray-800"
            >
              Password
            </label>
            <div class="relative flex items-center justify-center">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                class="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"
                onChange={handleChange}
              />
              <div
                class="absolute right-0 mt-2 mr-3 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.99978 2C11.5944 2 14.5851 4.58667 15.2124 8C14.5858 11.4133 11.5944 14 7.99978 14C4.40511 14 1.41444 11.4133 0.787109 8C1.41378 4.58667 4.40511 2 7.99978 2ZM7.99978 12.6667C9.35942 12.6664 10.6787 12.2045 11.7417 11.3568C12.8047 10.509 13.5484 9.32552 13.8511 8C13.5473 6.67554 12.8031 5.49334 11.7402 4.64668C10.6773 3.80003 9.35864 3.33902 7.99978 3.33902C6.64091 3.33902 5.32224 3.80003 4.25936 4.64668C3.19648 5.49334 2.45229 6.67554 2.14844 8C2.45117 9.32552 3.19489 10.509 4.25787 11.3568C5.32085 12.2045 6.64013 12.6664 7.99978 12.6667ZM7.99978 11C7.20413 11 6.44106 10.6839 5.87846 10.1213C5.31585 9.55871 4.99978 8.79565 4.99978 8C4.99978 7.20435 5.31585 6.44129 5.87846 5.87868C6.44106 5.31607 7.20413 5 7.99978 5C8.79543 5 9.55849 5.31607 10.1211 5.87868C10.6837 6.44129 10.9998 7.20435 10.9998 8C10.9998 8.79565 10.6837 9.55871 10.1211 10.1213C9.55849 10.6839 8.79543 11 7.99978 11ZM7.99978 9.66667C8.4418 9.66667 8.86573 9.49107 9.17829 9.17851C9.49085 8.86595 9.66644 8.44203 9.66644 8C9.66644 7.55797 9.49085 7.13405 9.17829 6.82149C8.86573 6.50893 8.4418 6.33333 7.99978 6.33333C7.55775 6.33333 7.13383 6.50893 6.82126 6.82149C6.5087 7.13405 6.33311 7.55797 6.33311 8C6.33311 8.44203 6.5087 8.86595 6.82126 9.17851C7.13383 9.49107 7.55775 9.66667 7.99978 9.66667Z"
                    fill="#71717A"
                  />
                </svg>
              </div>
            </div>
          </div>
          <div className="mt-3  w-full">
          <label
              className="text-sm font-medium leading-none text-gray-800"
            >
              Travelling Type
            </label>
            <div className="mt-2 relative">
              <select
                aria-labelledby="goalType"
                id="goalType"
                className="bg-gray-200 border text-gray-700 rounded-md focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-3 pr-10 py-2 sm:text-sm overflow-hidden"
              >
                <option value="">Your Travelling Type</option>
                <option value="Adventure Traveler">Adventure Traveler</option>
                <option value="Solo Traveler">Solo Traveler</option>
                <option value="Cultural Explorer">Cultural Explorer</option>
                <option value="Luxury Traveler">Luxury Traveler</option>
                <option value="Budget Traveler">Budget Traveler</option>
                <option value="Family Traveler">Family Traveler</option>
                <option value="Business Traveler">Business Traveler</option>
                <option value="Historical Enthusiast">Historical Enthusiast</option>
                <option value="Nature Lover">Nature Lover</option>
                <option value="Relaxation Seeker">Relaxation Seeker</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div class="w-full flex items-center justify-between py-5">
            <hr class="w-full bg-gray-400" />
            <p class="text-base font-medium leading-4 px-2.5 text-gray-400">
              OR
            </p>
            <hr class="w-full bg-gray-400  " />
          </div>

          <button
            aria-label="Continue with google"
            class="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-3"
          >
            <svg
              width="19"
              height="20"
              viewBox="0 0 19 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                fill="#4285F4"
              />
              <path
                d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                fill="#34A853"
              />
              <path
                d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                fill="#FBBC05"
              />
              <path
                d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                fill="#EB4335"
              />
            </svg>
            <p class="text-base font-medium ml-4 text-gray-700">
              Continue with Google
            </p>
          </button>

          <div class="mt-8">
            <button
              class="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-indigo-700 border rounded hover:bg-indigo-600 py-4 w-full"
              onClick={handleClick}
              disabled={loading}
            >
              Create my account
            </button>
          </div>
          {!error ? (
            <CModal 
            title="Registered Successfully"
            desc="Explore Best Hotels"
            image={correct}
            isOpen={isModalOpen}
            onClose={closeModal}
            />
            ): (
          <CModal 
          title="Oops Bad Gateway!!"
          desc="404!! Please Check Your Credentials"
          image={wrongdetails}
          isOpen={isModalOpen}
          onClose={closeModal}
          />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;

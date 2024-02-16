import Navbar from "../components/Navbar";
import log from "../assets/log.png";
import { FaHandPointDown, FaUser, FaKey, FaSignInAlt, FaSignal } from "react-icons/fa";

function LoginPage() {
  return (
    <div className="h-full w-full  bg-gradient-to-b from-gray-900 to-[#db9327] flex flex-col justify-center items-center">

      <div className="flex flex-col pb-10 justify-center h-1/3 -mt-24">
        <div >

        <img src={log} className="w-11/12 h-2/3 mb-2 " />
        </div>

        <div className="flex items-center justify-center  bg-gray-100  mb-30  rounded-lg ">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-sm  flex flex-col items-center justify-center ">
            <h3 className="text-center  font-bold mb-1 flex flex-row ">
              LOGIN <FaHandPointDown className="ml-0" />
            </h3>
            <form>
              <div className="mb-1">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter username"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                Login <FaSignInAlt className="ml-2" />
              </button>
              <button
                type="button"
                className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline flex items-center"
              >
                Login with demo ID <FaSignInAlt className="ml-2" />
              </button>
              </div>
              <small className="text-gray-600 mt-2 font-extralight">
                This site is protected by reCAPTCHA and the Google
                <a

                  className="underline text-blue-500 p-2"
                >
                  Privacy Policy
                </a>{" "}
                and
                <a

                  className="underline text-blue-400 p-2"
                >
                  Terms of Service
                </a>{" "}
                apply.
              </small>
            </form>
            
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
}

export default LoginPage;

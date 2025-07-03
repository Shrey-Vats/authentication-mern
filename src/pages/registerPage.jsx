import { useEffect, useState } from "react";
import { FiUser } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { FiMail } from "react-icons/fi";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

export const RegisterPage = () =>{
    const [user, setUser] = useState({
      username: "",
      email: "",
      password: "",
    });
    const [loading, setLoading] = useState(false)

    
    async function Register(e) {
      e.preventDefault();
      try {
        setLoading(true);
        console.log(user);

        const response = await axios.post(
          "http://localhost:5000/api/register",
          user
        );

        setLoading(false)
        console.log("Response:", response.data);

        toast.success("User created successfully");
      } catch (error) {
        console.log(error);
        toast.error(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    }
    

    return (
      <div className="flex justify-center items-center w-screen h-screen bg-gray-200">
        <Toaster position="top-right" reverseOrder={false} />
        <div className="w-[500px] h-[500px] bg-white rounded-l-lg shadow-2xl flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">Register</h1>
          <form className="mt-5 mb-20" onSubmit={Register}>
            <div className="flex">
              <FiUser className="h-12 w-12 p-2 text-grey-900 bg-grey-600 border rounded-l-xl" />
              <input
                value={user.username}
                type="text"
                className="w-full text-xl border rounded-r-xl outline-none px-4 py-2"
                placeholder="Enter your username"
                onChange={(e) => {
                  setUser({ ...user, username: e.target.value });
                }}
              />
            </div>
            <div className="flex mt-4">
              <FiMail className="h-12 w-12 p-2 text-grey-900 bg-grey-600 border rounded-l-xl" />
              <input
                type="email"
                value={user.email}
                className="w-full text-xl border rounded-r-xl outline-none px-4 py-2"
                placeholder="Enter your email"
                onChange={(e) => {
                  setUser({ ...user, email: e.target.value });
                }}
              />
            </div>
            <div className="flex mt-4">
              <FiLock className="h-12 w-12 p-2 text-grey-900 bg-grey-600 border rounded-l-xl" />
              <input
                type="password"
                value={user.password}
                className="w-full text-xl border rounded-r-xl outline-none px-4 py-2"
                placeholder="Enter your password"
                onChange={(e) => {
                  setUser({ ...user, password: e.target.value });
                }}
              />
            </div>
            <div className=" relative w-[100%] h-[30%] mt-4 ">
              <button
                type="submit"
                disabled={loading}
                className={`absolute px-4 py-2 bg-blue-700 text-xl font-bold text-white rounded-2xl shadow-xl right-0 top-2 ${
                  loading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Signup
              </button>
            </div>
          </form>
        </div>
        <div className="w-[200px] h-[500px] bg-gray-300 rounded-r-lg shadow-2xl border border-gray-400 border-l-0 flex justify-center items-center flex-col">
          <div className="w-[100%] h-[150px] mt-5 flex flex-col justify-center items-center  gap-4">
            <button className="flex px-4 py-2 bg-transparent border-2 border-black rounded-xl justify-center items-center">
              <FaGoogle className="h-10 w-10 text-blue-700" />
              <span className="ml-4 font-bold text-2xl text-blue-800">
                Google
              </span>
            </button>
            <button className="flex px-4 py-2 bg-transparent border-2 border-black rounded-xl justify-center items-center">
              <FaGithub className="h-10 w-10 " />
              <span className="ml-4 font-bold text-2xl">Github</span>
            </button>
          </div>
          <span className="cursor-pointer text-blue-700 font-bold text-xl hover:underline mt-5 ">
            Login Now
          </span>
        </div>
      </div>
    );
}

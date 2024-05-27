import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundimage from "../assets/LoginBg.avif";
import { FaNode, FaReact, FaRegCheckCircle } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiAndroid, DiMongodb } from "react-icons/di";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username === "megma" && password === "megma@123") {
      navigate("/dashboard");
    } else {
      alert("Invalid username or password");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        width: "100vw",
      }}
      className="flex justify-center items-center"
    >
      <div className="flex w-4/5 h-4/5 text-zinc-200">
        <div className="w-[70%] flex flex-col justify-between">
          <h1 className="uppercase font-bold text-2xl font-sans">Megma </h1>
          <div className="text-[20px] flex flex-col gap-5">
            <p className="text-3xl w-2/3 font-semibold">
              Join 8 Million Businesses that Trust Razorpay to Supercharge their
              Business
            </p>
            <div className="flex items-center gap-7">
              <p className="flex items-center">
                <FaRegCheckCircle className="mr-2" />
                100+ Payment Methods
              </p>
              <p className="flex items-center">
                <FaRegCheckCircle className="mr-2" />
                Easy Integration
              </p>
              <p className="flex items-center">
                <FaRegCheckCircle className="mr-2" />
                Powerful Dashboard
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md py-10 px-10 w-[30%] pt-[6%] font-medium overflow-hidden">
          <p className="text-zinc-900 text-3xl">Welcome Arun</p>
          <h1 className="text-zinc-700 text-2xl font-bold mt-4">
            GS FINANCE V2
          </h1>
          <div className="flex flex-col items-center justify-center mt-8 text-black">
            <input
              type="text"
              placeholder="Username"
              className="border-2 p-2 rounded-lg mt-4 w-64 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="border-2 p-2 rounded-lg mt-4 w-64 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white p-2 rounded-lg mt-4 w-32 flex justify-center items-center"
            >
              Login
            </button>
            <p className="mt-[90px] font-bold text-zinc-800 text-left flex flex-col w-full">
              Tech Stack :
              <div className="flex justify-center items-center gap-5">
                <DiAndroid className="text-[100px] text-[#4aec6d]" />
                <FaReact className="text-[100px] text-[#58C4DC]" />
                <FaNode className="text-[100px] text-[#699F5B]" />
                <RiTailwindCssFill className="text-[100px] text-[#38BDF8]" />
                <DiMongodb className="text-[100px] text-[#001E2B]" />
              </div>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

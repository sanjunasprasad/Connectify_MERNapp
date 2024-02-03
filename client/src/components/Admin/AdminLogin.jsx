import React from "react";

const AdminLogin = () => {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-[#063970] to-blue-200">
      <div className="grid place-items-center mx-2 my-20 sm:my-auto">
        <div className="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 px-6 py-10 sm:px-10 sm:py-6 bg-white rounded-lg shadow-md lg:shadow-lg">
          <div className="text-center mb-4">
            <h6 className="font-semibold text-[#063970] text-xl">Welcome Back Admin</h6>
          </div>
          <form className="space-y-5" method="POST">
            <div>
              <input
                id="email"
                type="email"
                placeholder="Enter Your Email"
                className="block w-full py-3 px-3 mt-2 text-gray-800 appearance-none border-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md"
              />
            </div>
            <div className="relative w-full">
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                className="block w-full py-3 px-3 mt-2 mb-4 text-gray-800 appearance-none border-2 border-gray-100 focus:text-gray-500 focus:outline-none focus:border-gray-200 rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-10 bg-[#063970] rounded-md font-medium text-white uppercase focus:outline-none hover:shadow-none"
            >
           Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;

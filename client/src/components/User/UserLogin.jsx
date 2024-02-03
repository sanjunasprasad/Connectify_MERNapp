import React from 'react'

function UserLogin() {
  return (
    <div>
         <div className="min-h-screen flex items-center justify-center" style={{ background: 'linear-gradient(to bottom right, #E86D9C, #FAAFCE, #FEADB9)' }}>
      <div className="bg-white bg-opacity-25 backdrop-blur-lg p-10 rounded-lg shadow-lg" style={{ width: '400px', height: '500px' }}>
        <h1 className="text-3xl font-semibold text-white mb-5">Login</h1>
        <form>
          <div className="mb-4">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="********"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-gradient-to-r from-pink-600 via-pink-400 to-pink-500 hover:from-pink-500 hover:via-pink-400 hover:to-pink-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-white hover:text-pink-600" href="#">
              Forgot Password?
            </a>
          </div>
          <p className="text-white text-center mt-3">I'm already a member! <a href="#">Sign In</a></p>
        </form>
      </div>
    </div>
    </div>
  )
}

export default UserLogin

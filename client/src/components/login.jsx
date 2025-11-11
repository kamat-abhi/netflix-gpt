import { useState } from "react";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/a92a67ee-cd07-46a8-8354-c431a96a97b0/web/IN-en-20251103-TRIFECTA-perspective_8a65e995-9926-414c-83c5-f7cc9af10871_medium.jpg')",
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute top-0 left-0 w-full px-8 py-4 bg-linear-to-b from-black">
        <img
          className="w-40 md:w-44"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
      </div>

      {/* Form container */}
      <form className="relative z-10 w-[420px] bg-black/75 px-12 py-10 rounded text-white">
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "SignIn" : "SignUp"}
        </h1>

        {/* Email Input */}
        {!isSignInForm && (
          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-1 focus:ring-white"
          />
        )}
        <input
          type="text"
          placeholder="Email Address"
          className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-white"
        />

        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-1 focus:ring-white"
        />

        {/* Sign In Button */}
        <button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded mb-4 cursor-pointer">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Divider */}
        <div className="flex items-center my-3">
          <div className="grow h-px bg-gray-500"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="grow h-px bg-gray-500"></div>
        </div>

        {/* Forgot password */}
        <div className="text-center mb-6">
          <a href="#" className="text-gray-400 hover:underline text-sm">
            Forgot password?
          </a>
        </div>

        {/* Remember me + Signup */}
        <div className="flex items-center justify-between text-sm text-gray-400">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-gray-400 cursor-pointer" />
            <span>Remember me</span>
          </label>
          {isSignInForm ? (
            <p className="flex">
              New to Netflix?{" "}
              <p
                className="text-white hover:underline cursor-pointer px-0.5 "
                onClick={toggleSignInForm}
              >
                SignUp now.
              </p>
            </p>
          ) : (
            <p className="flex">
              Already registered?{" "}
              <p
                className="text-white hover:underline cursor-pointer px-0.5 "
                onClick={toggleSignInForm}
              >
                SignIn now.
              </p>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

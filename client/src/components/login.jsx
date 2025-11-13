import { useEffect, useState } from "react";
import checkValidateData from "../utils/validate";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [otp, setOtp] = useState(""); // OTP state
  const [errorMessage, setErrorMessage] = useState(null);
  const [otpSent, setOtpSent] = useState(false); // track if OTP was sent
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    if (!email && !password) {
      setErrorMessage(null);
      return;
    }
    const message = checkValidateData(email, password);
    setErrorMessage(message);
  }, [email, password]);

  const handleButtonClick = async () => {
    if (errorMessage) return;

    try {
      if (!isSignInForm && !otpSent) {
        // SignUp request
        const res = await fetch("http://localhost:4000/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          setErrorMessage(data.message);
          return;
        }

        setOtpSent(true);
        setSuccessMessage("✅ OTP sent to your email. Please verify.");
      } else if (!isSignInForm && otpSent) {
        // Verify Email request
        const res = await fetch("http://localhost:4000/api/auth/verify-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        });
        const data = await res.json();
        if (!res.ok) {
          setErrorMessage(data.message);
          return;
        }
        setSuccessMessage("✅ Email verified! You can now login.");
        setOtpSent(false);
        setOtp("");
        setIsSignInForm(true);
      } else {
        // SignIn
        console.log("✅ Form is valid!");
        console.log("Email:", email);
        console.log("Password:", password);
        // Call login API here...
      }
    } catch (err) {
      setErrorMessage("Something went wrong. Try again.");
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setEmail("");
    setPassword("");
    setName("");
    setOtp("");
    setErrorMessage(null);
    setSuccessMessage(null);
    setOtpSent(false);
  };

  return (
    <div
      className="relative flex h-screen w-screen items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://assets.nflxext.com/ffe/siteui/vlv3/a92a67ee-cd07-46a8-8354-c431a96a97b0/web/IN-en-20251103-TRIFECTA-perspective_8a65e995-9926-414c-83c5-f7cc9af10871_medium.jpg')",
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="absolute top-0 left-0 w-full px-8 py-4 bg-linear-to-b from-black">
        <img
          className="w-40 md:w-44"
          src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-08-26/consent/87b6a5c0-0104-4e96-a291-092c11350111/0198e689-25fa-7d64-bb49-0f7e75f898d2/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="Netflix Logo"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative z-10 w-[420px] bg-black/75 px-12 py-10 rounded text-white"
      >
        <h1 className="text-3xl font-bold mb-6">
          {isSignInForm ? "SignIn" : "SignUp"}
        </h1>

        {!isSignInForm && !otpSent && (
          <input
            type="text"
            name="Full Name"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-1 focus:ring-white"
          />
        )}

        <input
          type="text"
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-2 focus:ring-white"
        />

        {!otpSent && (
          <input
            type="password"
            name="Password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-1 focus:ring-white"
          />
        )}

        {/* OTP input after signup */}
        {!isSignInForm && otpSent && (
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full p-3 mb-4 bg-neutral-800 rounded focus:outline-none focus:ring-1 focus:ring-white"
          />
        )}

        {errorMessage && (
          <p className="text-red-500 text-sm mb-3">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="text-green-500 text-sm mb-3">{successMessage}</p>
        )}

        <button
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded mb-4 cursor-pointer"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : otpSent ? "Verify OTP" : "Sign Up"}
        </button>

        <div className="flex items-center my-3">
          <div className="grow h-px bg-gray-500"></div>
          <span className="mx-3 text-gray-400">OR</span>
          <div className="grow h-px bg-gray-500"></div>
        </div>

        <div className="text-center mb-6">
          <a href="#" className="text-gray-400 hover:underline text-sm">
            Forgot password?
          </a>
        </div>

        <div className="flex items-center justify-between text-sm text-gray-400">
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="accent-gray-400 cursor-pointer" />
            <span>Remember me</span>
          </label>
          {isSignInForm ? (
            <p className="flex">
              New to Netflix?{" "}
              <span
                className="text-white hover:underline cursor-pointer px-0.5"
                onClick={toggleSignInForm}
              >
                SignUp now.
              </span>
            </p>
          ) : (
            <p className="flex">
              Already registered?{" "}
              <span
                className="text-white hover:underline cursor-pointer px-0.5"
                onClick={toggleSignInForm}
              >
                SignIn now.
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;

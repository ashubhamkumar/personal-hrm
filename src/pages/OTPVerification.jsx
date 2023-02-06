import React, { useState } from "react";
import { useParams } from "react-router-dom";
import mfaApi from "../api/mfaApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const OTPVerification = () => {
  const { email, phone } = useParams();
  const [otp, setOtp] = useState("");
  let navigate = useNavigate();
  const formHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await mfaApi.post(
        "/auth/customer/verify-email",
        {
          phone: phone,
          otp: parseInt(otp),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.status === 200) {
        toast.success(response.data.message);
        navigate("../", { replace: true });
      } else {
        toast.warn(response.data.message);
        navigate("../", { replace: true });
      }
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("../", { replace: true });
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 shadow-lg bg-gray-50 rounded-lg px-4 py-8">
        <div>
          <h2 className=" text-center text-3xl my-4 font-bold text-blue-600">
            Verify it's you!
          </h2>

          <p className="mt-2 text-start text-base text-gray-700">
            An email with your verification code has been sent to{" "}
            <span className="text-blue-600 text-lg">{email}</span>.
          </p>
        </div>
        <form className="mt-4 space-y-4" onSubmit={formHandler}>
          <div className="rounded-md shadow-sm ">
            <input
              id="otp"
              name="otp"
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
              className="relative  rounded block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900  focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
              placeholder="Enter 6-digit code"
            />
          </div>
          <button
            type="submit"
            className="group relative leading-none  w-full flex justify-center py-3 px-4 border border-transparent text-xl font-semibold rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:bg-blue-500 hover:text-black "
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
};

export default OTPVerification;

import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { ArrowPathIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { userLogin } from "../store/authFeatures/userActions";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setpassword] = useState("");

  const { error, userInfo, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (userInfo !== null) {
      navigate("/dashboard", { replace: true });
      toast.success("Login Success");
    }
  }, [dispatch, error, userInfo, navigate]);

  const SigninHandler = async (e) => {
    e.preventDefault();

    if (userId !== "" && password !== "") {
      dispatch(userLogin({ userId, password }));
    } else {
      toast.error("Please fill all the fields");
    }
  };
  return (
    <>
      <div className="min-h-full flex items-center h-screen justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-6">
          <div className="Flex justify-center items-center">
            <div className="text-4xl text-center font-bold capitalize text-blue-600">
              <h1>tranEco®</h1> <h2>Multi Factor Authentication</h2>
            </div>
            <h2 className="mt-4 text-center text-2xl font-extrabold text-gray-900">
              Login to your account
            </h2>
          </div>
          <form className=" space-y-4 " onSubmit={SigninHandler}>
            <div className="rounded-md   space-y-2">
              <div>
                <label htmlFor="userId" className="">
                  User Id
                </label>
                <input
                  id="userId"
                  name="userId"
                  type="text"
                  autoComplete="off"
                  value={userId}
                  onChange={(e) => setUserId(e.target.value)}
                  required
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="User Id"
                />
              </div>
              <div>
                <label htmlFor="password" className="">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  autoComplete="off"
                  className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
              {/* policy */}
            </div>

            <div>
              <button
                disabled={loading ? true : false}
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  {loading ? (
                    <ArrowPathIcon className="h-5 w-5 text-blue-200 rotate-180  group-hover:text-blue-300" />
                  ) : (
                    <LockClosedIcon
                      className="h-5 w-5 text-blue-200 group-hover:text-blue-300"
                      aria-hidden="true"
                    />
                  )}
                </span>
                Login
              </button>
            </div>
            <div className="flex items-center justify-between leading-6">
              <div className="text-base font-medium">
                <Link className="text-blue-500" to="/register">
                  Create an Account
                </Link>{" "}
              </div>
              <div className="text-base font-medium">
                <Link className="text-blue-600" to="/">
                  Forgot password ?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Login;

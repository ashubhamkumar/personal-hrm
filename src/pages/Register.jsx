import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import mfaApi from "../api/mfaApi";
const Register = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [ifsccode, setIfsccode] = useState(``);
  const [bankData, setbankData] = useState([]);
  const getBankDetails = async (e) => {
    e.preventDefault();
    try {
      if (ifsccode !== "") {
        console.log(ifsccode);
        let response = await mfaApi.get(
          `/customer/fetchbankdetails/${ifsccode}`
        );
        if (response.status === 200) {
          setbankData(response.data.data);
          setIsExpanded(true);
        }
      } else {
        toast.warn("Please enter valid IFSC code");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  const formHandler = async (e) => {
    e.preventDefault();
    let data = new FormData(e.target);

    let formData = Object.fromEntries(data.entries());
    let mergedData = {
      ...formData,
      ...{
        bankname: bankData.bankname,
        office: bankData.office,
        bin: bankData.bin,
        bankaddress: bankData.address,
        bankcity: bankData.city,
        bankstate: bankData.state,
      },
    };
    console.log(mergedData);

    try {
      let response = await mfaApi.post(`/auth/customer/signup`, mergedData);
      if (response.status === 201) {
        toast.info(response.data.msg);
        navigate(
          `/otp-verification/${response.data.phone}/${response.data.email}`
        );
      } else {
        toast.warn(response.data.msg);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex bg-gray-50 min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Customer Registration
          </h2>
          <p className="mt-2 text-center text-lg text-gray-600">
            Existing Customer?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:text-blue-500"
            >
              Login
            </Link>
          </p>
        </div>
        <form onSubmit={formHandler}>
          <div className="overflow-hidden shadow sm:rounded-md">
            <div className="bg-gray-50 px-4 py-5 sm:p-6">
              <div className="grid grid-cols-6 gap-4">
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First name
                  </label>
                  <input
                    type="text"
                    name="f_name"
                    id="first-name"
                    autoComplete="given-name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last name
                  </label>
                  <input
                    type="text"
                    name="l_name"
                    id="last-name"
                    autoComplete="family-name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    autoComplete="phone"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="gender"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    autoComplete="gender"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="dob"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date of Birth
                  </label>
                  <input
                    id="dob"
                    name="dob"
                    type="date"
                    required
                    autoComplete="date of birth"
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="nationality"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    id="nationality"
                    required
                    autoComplete="nationality"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                  <label
                    htmlFor="customerpincode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    ZIP / Pin code
                  </label>
                  <input
                    type="text"
                    name="customerpincode"
                    id="customerpincode"
                    required
                    autoComplete="postal-code"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                <div className="col-span-6 sm:col-span-6 lg:col-span-4 ">
                  <label
                    htmlFor="customeraddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <input
                    type="text"
                    name="customeraddress"
                    id="customeraddress"
                    required
                    autoComplete="address-level1"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="col-span-6">
                  <h2 className="text-blue-600 text-lg">Bank details</h2>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="ifsccode"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bank IFSC Code
                  </label>
                  <input
                    type="text"
                    name="ifsccode"
                    value={ifsccode}
                    onChange={(e) => setIfsccode(e.target.value)}
                    id="ifsccode"
                    autoComplete="ifsccode"
                    required
                    className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {isExpanded && (
                  <>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="bankname"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank Name
                      </label>
                      <input
                        id="bankname"
                        type={"text"}
                        defaultValue={bankData.bankname}
                        name="bankname"
                        autoComplete="bankname"
                        disabled
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="office"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Branch Name
                      </label>
                      <input
                        id="office"
                        type={"text"}
                        defaultValue={bankData.office}
                        name="office"
                        autoComplete="office"
                        disabled
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="bin"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bin
                      </label>
                      <input
                        id="bin"
                        type={"text"}
                        defaultValue={bankData.bin}
                        name="bin"
                        autoComplete="office"
                        disabled
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="bankaddress"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank Address
                      </label>
                      <input
                        id="bankaddress"
                        type={"text"}
                        defaultValue={bankData.address}
                        name="bankaddress"
                        autoComplete="bankaddress"
                        disabled
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="bankdistrict"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank District
                      </label>
                      <input
                        id="bankdistrict"
                        type={"text"}
                        defaultValue={bankData.district}
                        name="bankdistrict"
                        disabled
                        autoComplete="bankdistrict"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>{" "}
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="bankcity"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank city
                      </label>
                      <input
                        id="bankcity"
                        type={"text"}
                        defaultValue={bankData.city}
                        name="bankcity"
                        autoComplete="bankcity"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                        disabled
                      />
                    </div>{" "}
                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                      <label
                        htmlFor="bankstate"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Bank state
                      </label>
                      <input
                        id="bankstate"
                        type={"text"}
                        name="bankstate"
                        defaultValue={bankData.state}
                        autoComplete="bankstate"
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              {isExpanded ? (
                <button
                  type="submit"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Save
                </button>
              ) : (
                <button
                  onClick={getBankDetails}
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

import { ethers } from "ethers";
import React from "react";
import { useSelector } from "react-redux";

const Buy = () => {
  const state = useSelector((state) => {
    return state.chain;
  });

  const buyStray = async (e) => {
    e.preventDefault();
    try {
      const { contract } = state;
      const name = document.querySelector("#text").value;
      const message = document.querySelector("#Message").value;
      // console.log(name+" "+message);
      console.log(contract);
      const amount = { value: ethers.parseEther("0.001") };

      const transaction = await contract.pay(name, message, amount);
      await transaction.wait();
      alert("transaction completed");
    } catch (error) {
      console.log(error);
      alert("Transaction has been cancelled by user");
    }
  };
  return (
    <>
      <form onSubmit={buyStray}>
        <div className="m-6  mx-10">
          <label
            htmlFor="text"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="text"
            id="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Ananad"
            required
          />
        </div>
        <div className="mb-6 mx-10">
          <label
            htmlFor="Message"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Message
          </label>
          <input
            type="text"
            id="Message"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Every paws matter"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!state.contract}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-48 sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Pay for the needy
        </button>
      </form>
    </>
  );
};

export default Buy;

import React from "react";
import { IoIosAddCircleOutline } from "react-icons/io";

const EmiPayTable = () => {
    let a = 1;
    let b = 1;
  return (
    <div className=" bg-white rounded-lg shadow-md h-full p-4">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-3 px-10 h-16">
        <h2 className="text-xl font-bold text-gray-800 ">PACKAGE</h2>
        <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
          Print Emi Statement
        </button>
      </div>
      <div className="first_row flex justify-between font-bold w-[80%] m-auto border px-10 py-2 rounded-md h-14">
        <div className="flex flex-nowrap gap-2 py-2  w-32 ">
          <div className=" text-nowrap">Loan Amount:</div>
          <div>40000₹</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5  w-32 ">
          <div className=" text-nowrap">Amount Paid:</div>
          <div>02</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5  w-32 ">
          <div className=" text-nowrap">Penalty:</div>
          <div>0</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32 ">
          <div className=" text-nowrap">Status:</div>
          <div className="text-nowrap">0/12 Paid</div>
        </div>
      </div>
      <div className="Second_row flex justify-between font-bold w-[80%] m-auto border px-10 py-2 rounded-md border-t-0">
        <div className="flex flex-nowrap gap-2 py-2 w-32">
          <div className="text-nowrap">Displaced amt:</div>
          <div>36250</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Amount Unpaid:</div>
          <div>47201</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Total amt:</div>
          <div>47201₹</div>
        </div>
        <div className="flex flex-nowrap gap-2 py-1.5 w-32">
          <div className="text-nowrap">Interest:</div>
          <div>7201₹</div>
        </div>
      </div>
      <div className="flex justify-end py-4">
        <input
          type="text"
          placeholder="Search"
          className="px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:ring-1"
        />
      </div>
      <div className="flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 text-zinc-600">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider border"
                    >
                      S.No.
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      EMI id
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Due Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Installment Amt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Paid Amt
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium  uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border relative">
                      {a++}<IoIosAddCircleOutline className="text-green-500 text-3xl border-2  border-green-500 rounded-full absolute right-14 top-7" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {b++}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      01-June-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      3350₹
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      0₹
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Pending
                    </td>
                    <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-800 w-40">
                        <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
                            Pay Now
                        </button>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 border relative">
                      {a++}<IoIosAddCircleOutline className="text-green-500 text-3xl border-2  border-green-500 rounded-full absolute right-14 top-7" />
                    </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      {b++}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      01-July-2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      3350₹
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      0₹
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">
                      Pending
                    </td>
                    <td className=" py-4 whitespace-nowrap text-sm font-medium text-gray-800 w-40">
                        <button className="text-sm bg-indigo-600 font-medium text-white drop-shadow-xl hover:drop-shadow-none px-5 py-3 rounded-md focus:outline-none">
                            Pay Now
                        </button>
                    </td>
                  </tr>
                  {/* Add more table rows here for additional installments */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmiPayTable;

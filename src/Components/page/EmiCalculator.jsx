import React, { useState, useEffect } from "react";
import { BiInfoCircle } from "react-icons/bi";
import EmiPayTable from "../EmiPayTable";

function EmiCalculator({ data }) {
  const [IsPayTableVisible, setIsPayTableVisible] = useState(false);
  const [startDate, setStartDate] = useState(""); // State for selected start date
  const [emiSchedule, setEmiSchedule] = useState([]); // State for EMI schedule
  const [loanDetails, setLoanDetails] = useState({
    amount: data.leadAmount || 50000,
    tenure: data.tenure || 12,
    tenureUnit: "months",
    processingFees: data.processingFees || 1,
    interestRate: data.lead_interest_rate || 1,
    emi: 0,
    disbursementAmount: 0,
    totalLoan: 0,
    monthlyInterest: 0,
    totalInterest: 0,
  });

  useEffect(() => {
    if (startDate) {
      calculateFlatEMI(); // Calculate EMI on component mount and when loanDetails change
    }
  }, [loanDetails.amount, loanDetails.interestRate, loanDetails.tenure, loanDetails.tenureUnit, startDate]);

  const calculateFlatEMI = () => {
    const { amount, interestRate, tenure, tenureUnit } = loanDetails;

    let n = tenure;
    if (tenureUnit === "days") {
      n = tenure / 30.44; // Approximate days to months
    } else if (tenureUnit === "years") {
      n = tenure * 12;
    }

    const P = parseFloat(amount);
    const R = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const N = parseFloat(n);

    // Flat EMI Calculation
    const monthlyInterest = P * R;
    const totalInterest = monthlyInterest * N;
    const EMI = (P + totalInterest) / N;
    const totalAmount = EMI * N;

    const schedule = generateEmiSchedule(startDate, EMI, N);

    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      emi: EMI.toFixed(2),
      disbursementAmount: P.toFixed(2), // Assuming no processing fees
      totalLoan: totalAmount.toFixed(2),
      monthlyInterest: monthlyInterest.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    }));
    setEmiSchedule(schedule);
  };

  const generateEmiSchedule = (startDate, emi, n) => {
    const schedule = [];
    let currentDate = new Date(startDate);

    for (let i = 0; i < n; i++) {
      schedule.push({
        emiId: i + 1,
        dueDate: new Date(currentDate),
        installmentAmount: emi.toFixed(2),
        paidAmount: 0,
        status: "Pending",
      });
      currentDate.setMonth(currentDate.getMonth() + 1);
    }

    return schedule;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;

    let parsedValue;
    if (id.includes("Rate")) {
      parsedValue = parseFloat(value);
    } else {
      parsedValue = parseInt(value, 10);
    }

    const sanitizedValue = isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;

    if (sanitizedValue > 100000) {
      // Set a maximum limit for the amount field
      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        [id]: 100000, // Cap the amount at the maximum
      }));
    } else {
      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        [id]: sanitizedValue, // Update state using the fieldId
      }));
    }
  };

  return (
    <div className="flex flex-col ">
      <div className="flex flex-row">
        <BiInfoCircle className="h-[30px] w-[30px] m-2" color="#9003FC" />
        <h2 className="font-mono text-[21px] m-2">Max Value for Each field : 100000</h2>
        <button className=" px-6 py-2 bg-[#4793AF] hover:bg-[#3c7c93] text-white shadow-lg hover:shadow-none  rounded-lg ml-4 mb-2 font-bold">
          Update Emi Detail
        </button>

        <input
          className="outline-none px-6 py-2 bg-[#5BBCFF] rounded-lg ml-4 mb-2 font-bold text-white  hover:bg-[#4ea5e4]  shadow-lg hover:shadow-none"
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <button
          onClick={() => setIsPayTableVisible(true)}
          className=" px-6 py-2 bg-[#59D5E0] text-zinc-50 rounded-lg ml-4 mb-2 font-bold  hover:bg-[#47b2bc]  shadow-lg hover:shadow-none"
        >
          View Payment Schedule
        </button>
      </div>

      <table className="emi-table overflow-hidden rounded-lg  ">
        <tbody>
          {/* Loan Details Section */}
          <tr className="p-4 bg-blue-500 text-white font-mono border">
            <td className="p-4">AMOUNT:</td>
            <td>₹{data.leadAmount}</td>
            <td>
              <input
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono outline-none p-1"
                value={loanDetails.amount}
                id="amount"
                type="number"
                onChange={handleChange}
              />
            </td>
            <td className="p-4">Tenure:</td>
            <td>
              {loanDetails.tenure} {loanDetails.tenureUnit}
            </td>
            <td>
              <select
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black p-[.4vw] outline-none"
                value={loanDetails.tenureUnit}
                onChange={(e) =>
                  setLoanDetails((prevDetails) => ({
                    ...prevDetails,
                    tenureUnit: e.target.value,
                  }))
                }
              >
                <option value="days">Days</option>
                <option value="months">Months</option>
                <option value="years">Years</option>
              </select>
              <input
                type="number"
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black p-1 outline-none"
                value={loanDetails.tenure}
                onChange={(e) =>
                  setLoanDetails((prevDetails) => ({
                    ...prevDetails,
                    tenure: parseInt(e.target.value, 10),
                  }))
                }
              />
            </td>
          </tr>

          {/* Processing Fees */}
          <tr className="p-4 bg-blue-500 text-white font-mono border">
            <td className="p-4">Processing fees:</td>
            <td>{data.processingFees} ₹</td>
            <td>
              <input
                id="processingFees"
                type="number"
                onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono p-1 outline-none"
                value={loanDetails.processingFees}
              />
            </td>
            <td colSpan="3"></td> {/* Empty cells for alignment */}
          </tr>

          {/* Interest Rate */}
          <tr className="p-4 bg-blue-500 text-white font-mono border">
            <td className="p-4">Interest Rate: {data.lead_interest_rate}% =</td>
            <td>{data.lead_interest_rate} ₹</td>
            <td>
              <input
                id="interestRate"
                type="number"
                onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono p-1 outline-none"
                value={loanDetails.interestRate}
              />
            </td>
            <td colSpan="3"></td> {/* Empty cells for alignment */}
          </tr>

          {/* Calculated EMI */}
          <tr className="p-4 bg-[#0E46A3] text-white font-mono border">
            <td className="p-4">CALCULATED EMI: ₹{loanDetails.emi}</td>
            <td colSpan="5"></td> {/* Empty cells for alignment */}
          </tr>

          {/* Disbursement Amount */}
          <tr className="p-4 bg-[#7E8EF1] text-white font-mono border">
            <td className="p-4">DISBURSEMENT AMOUNT: ₹{loanDetails.disbursementAmount}</td>
            <td colSpan="5"></td> {/* Empty cells for alignment */}
          </tr>

          {/* Total Loan */}
          

          {/* Monthly Interest */}
          <tr className="p-4 bg-[#0E46A3] text-white font-mono border">
            <td className="p-4">MONTHLY INTEREST: ₹{loanDetails.monthlyInterest}</td>
            <td colSpan="5"></td> {/* Empty cells for alignment */}
          </tr>

          {/* Total Interest */}
          <tr className="p-4 bg-[#7E8EF1]  text-white font-mono border">
            <td className="p-4">TOTAL INTEREST: ₹{loanDetails.totalInterest}</td>
            <td colSpan="5"></td> {/* Empty cells for alignment */}
          </tr>
          <tr className="p-4 bg-[#615EFC] text-white font-mono border">
            <td className="p-4">TOTAL PAYBLE AMOUNT: ₹{loanDetails.totalLoan}</td>
            <td colSpan="5"></td> {/* Empty cells for alignment */}
          </tr>
        </tbody>
      </table>

      {IsPayTableVisible && (
        <div className="h-full w-full flex justify-center items-start absolute top-0 left-0 backdrop-blur-xl ">
          <EmiPayTable  emiSchedule={emiSchedule} data={data} loanDetails={loanDetails}/>
          <p className="cursor-pointer absolute right-8 top-[1%]" onClick={()=>setIsPayTableVisible(false)}>❌</p>
        </div>
      )}
    </div>
  );
}

export default EmiCalculator;

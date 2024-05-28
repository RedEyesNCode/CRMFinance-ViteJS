import React, { useState, useEffect, useRef, useMemo } from "react";
import { BiInfoCircle } from "react-icons/bi";

function EmiCalculator({}) {
  const [loanDetails, setLoanDetails] = useState({
    amount: 50000,
    tenure: 12,
    tenureUnit: "months",
    processingFees: 1,
    loanDocumentFees: 1,
    insuranceRate: 1,
    insuranceAmount: 1,
    gstRate: 1,
    gstAmount: 1,
    interestRate: 1,
    interestAmount: 1,
    packageId: "",
    status: "Pending",
    emi: 1,
    disbursementAmount: 1,
    totalLoan: 1,
  });

  useEffect(() => {
    calculateFlatEMI(); // Calculate EMI on component mount and when loanDetails change
  }, []); // Dependency array ensures calculation on relevant changes

  const calculateFlatEMI = () => {
    const { amount, interestRate, tenure } = loanDetails;

    let n = tenure;
    if (loanDetails.tenureUnit === "days") {
      n = tenure / 30.44; // Approximate days to months
    } else if (loanDetails.tenureUnit === "years") {
      n = tenure * 12;
    }

    const P = parseFloat(amount);
    const R = parseFloat(interestRate) / 100 / 12; // Monthly interest rate
    const N = parseFloat(n);

    // Flat EMI Calculation
    const EMI = (P + P * R * N) / N;

    const totalAmount = EMI * N;

    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      emi: EMI.toFixed(2),
      disbursementAmount: P.toFixed(2), // Assuming no processing fees
      totalLoan: totalAmount.toFixed(2),
    }));
  };
 

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Directly use the input field's ID instead of the name
    const fieldId = event.target.id;

    let parsedValue;
    if (fieldId.includes("Rate")) {
      parsedValue = parseFloat(value);
    } else {
      parsedValue = parseInt(value, 10);
    }

    const sanitizedValue =
      isNaN(parsedValue) || parsedValue < 0 ? 0 : parsedValue;

    if (sanitizedValue > 100000) {
      // Set a maximum limit for the amount field
      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        [fieldId]: 100000, // Cap the amount at the maximum
      }));
    } else {
      setLoanDetails((prevDetails) => ({
        ...prevDetails,
        [fieldId]: sanitizedValue, // Update state using the fieldId
      }));
    }
  };

  const calculateEMI = () => {
    const { amount, interestRate, tenure } = loanDetails;

    // Basic EMI calculation (replace with your actual logic)
    const r = interestRate / 12 / 100; // Monthly interest rate
    const n = tenure;
    const emi = (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    setLoanDetails((prevDetails) => ({
      ...prevDetails,
      emi,
      
      // Calculate other derived values like totalLoan, etc.
    }));
  };

  return (
    <div className="flex flex-col overflow-y">
      
      <div className="flex flex-row">
        <BiInfoCircle className="h-[30px] w-[30px] m-2" color="#9003FC"/>
      <h2 className="font-mono text-[21px] m-2">Max Value for Each field : 100000</h2>

      </div>

      <table className="emi-table rounded-2xl border-2 border-amber-400 overflow-hidden ">
        
        <tbody>
          {/* Loan Details Section */}
          <tr className="p-4 bg-blue-500 text-white font-mono">
            <td className="p-4">AMOUNT:</td>
            <td>₹{loanDetails.amount}</td>
            <td>
              <input
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono " // Added text-black
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
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black"
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
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black"
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

          {/* Processing Fees and Loan Document Fees */}
          <tr className="p-4 bg-blue-500 text-white font-mono">
            <td className="p-4">Processing fees:</td>
            <td>{loanDetails.processingFees} ₹</td>
            <td>
              <input
              id="processingFees"
              type="number"
              onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono" // Added text-black
                value={loanDetails.processingFees}
              />
            </td>
            <td className="p-4">Loan document fees:</td>
            <td>{loanDetails.loanDocumentFees} ₹</td>
            <td>
              <input
               id="loanDocumentFees"
               type="number"
               onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono" // Added text-black
                value={loanDetails.loanDocumentFees}
              />
            </td>
            <td></td> {/* Empty cell for alignment */}
          </tr>

          {/* Insurance and GST */}
          <tr className="p-4 bg-blue-500 text-white font-mono">
            <td className="p-4">Insurance: {loanDetails.insuranceRate}% =</td>
            <td>{loanDetails.insuranceAmount} ₹</td>
            <td>
              <input
               id="insuranceAmount"
               type="number"
               onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono" // Added text-black
                value={loanDetails.insuranceAmount}
              />
            </td>
            <td className="p-4">GST: {loanDetails.gstRate}%</td>
            <td>{loanDetails.gstAmount} ₹</td>
            <td>
              <input
                id="gstAmount"
                type="number"
                onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono" // Added text-black
                value={loanDetails.gstAmount}
              />
            </td>
            <td></td> {/* Empty cell for alignment */}
          </tr>
          <tr className="p-4 bg-blue-500 text-white font-mono">
            <td className="p-4">
              Interest Rate: {loanDetails.interestAmount}% =
            </td>
            <td>{loanDetails.interestAmount} ₹</td>
            <td>
              <input
               id="interestAmount"
               type="number"
               onChange={handleChange}
                className="border-2 border-blue-600 rounded-lg m-2 w-fit text-black font-mono" // Added text-black
                value={loanDetails.interestAmount}
              />
            </td>
            <td></td>
            <td></td>
            <td></td> {/* Empty cell for alignment */}
          </tr>
          <tr className="p-4 bg-blue-500 text-white font-mono">

            <td className="p-4">CALCULATED EMI : {loanDetails.emi}</td>
            
            <td></td> {/* Empty cell for alignment */}
            <td className="p-4">
              Disbursement Amount : {loanDetails.disbursementAmount}
            </td>
            <td></td> {/* Empty cell for alignment */}
            <td className="p-4">
              Total Loan Amount : {loanDetails.loanAmount}
            </td>
            <td></td> {/* Empty cell for alignment */}

          </tr>
          <tr className="p-4 bg-blue-500 text-white font-mono">
            
            <td>{loanDetails.loanAmount}</td>
            <td></td> {/* Empty cell for alignment */}
            
            <td></td> {/* Empty cell for alignment */}
            <td></td> {/* Empty cell for alignment */}
          </tr>

          {/* ... (rest of the table rows with the 'p-4 bg-blue-500 text-white font-mono' class and text-black on inputs) ... */}
        </tbody>
      </table>
     
    </div>
  );
}

export default EmiCalculator;

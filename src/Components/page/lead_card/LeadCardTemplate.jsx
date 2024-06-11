import React, { useState, useEffect, useRef } from "react";
import { createLeadCard, deleteLeadCard, getAllLeadCards } from '../../../apis/apiInterface';
import { ToastContainer, toast } from "react-toastify";
import { BiInfoCircle } from "react-icons/bi";

const LeadCardTemplate = ({  }) => {
    const [leadsData, setLeadsData] = useState(null);
    const [isLeadCardAddFrame,setLeadCardAddFrame] = useState(null);

    
    const deleteLeadTemplate = async (leadId) => {

        try {
         

            const rawJson = {
                leadCardId : leadId
            };
            const response = await deleteLeadCard(rawJson);
            if (response.status == "success") {
              toast.success('Lead Card Deleted Successfully !')
              callGetAllLeadCard();

            } else {
                toast.error(response.message);
            }
          } catch (error) {
            console.log(error);
          }
    }

    const callGetAllLeadCard = async () => {
        try {
         
    
          const response = await getAllLeadCards();
          if (response.status == "success") {
            setLeadsData(response);
          } else {
            setLeadsData(null);
          }
        } catch (error) {
          console.log(error);
        }
    };
    const callCreateLeadCardApi = async () => {
        try {
            const rawJson = {

                telephoneNumber : formData.telephoneNumber,
                aadhar_card : formData.aadhar_card,
                pancard : formData.pancard,
            }

         
    
            const response = await createLeadCard(rawJson);
            if (response.status == "success") {
                toast.success(response.message);
                setLeadCardAddFrame(false);
                callGetAllLeadCard();


              
            }else{
                toast.error(response.message);
            }
          } catch (error) {
            console.log(error);
          }

    };
    const [formData, setFormData] = useState({
        telephoneNumber: "",
        pancard: "",
        aadhar_card: "",

      });
    useEffect(() => {
        callGetAllLeadCard();
    }, []);
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
        console.log(formData);
      };




  return (
    <div className="overflow-x-auto">
        <ToastContainer/>
        <div className="flex flex-row"> 


            <BiInfoCircle className="h-[30px] w-[30px] m-2"/>
            <label className="m-2 text-[18px] font-mono">Lead Card Are also checked at the time of Create-Lead from Android App.</label>
        </div>
        <div className=" rounded-lg bg-indigo-600 text-white font-mono text-[21px] w-fit h-fit m-2 p-3" onClick={() => setLeadCardAddFrame(true)}> Add New Lead Card</div>
       {isLeadCardAddFrame && (

        <div className="absolute bg-indigo-900 rounded-xl m-4 flex flex-row">
             <div 
        className="border-2 border-amber-600 w-fit h-fit m-2 rounded-md"
        >
            <div className="flex flex-col items-center gap-5">
          <input
            className="px-5 py-2 rounded-md border outline-none m-2 p-1"
            onChange={handleChange}
            value={formData.telephoneNumber}
            type="text"
            name="telephoneNumber"
            placeholder="Enter customerName"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.pancard}
            type="text"
            name="pancard"
            placeholder="Enter pancard"
          />
          <input
            className="px-5 py-2 rounded-md border outline-none"
            onChange={handleChange}
            value={formData.aadhar_card}
            type="text"
            name="aadhar_card"
            placeholder="Enter aadhar_card"
          />
          </div>
            <div
            onClick={callCreateLeadCardApi}
    className="w-fit h-fit p-2 m-2 text-white rounded-lg bg-indigo-400"
    >
        Add New Lead Card


    </div>
    <div
            onClick={() => setLeadCardAddFrame(false)}
    className="w-fit h-fit p-2 m-2 text-white rounded-lg bg-red-400"
    >
        Close


    </div>

        </div>
        </div>


       )}
    
    {leadsData!=null && (<table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
           
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Telephone Number
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              PAN Card
            </th>
            <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Aadhaar Card
            </th>

             <th 
              scope="col" 
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {leadsData.data.map((lead, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{lead.telephoneNumber}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.pancard}</td>
              <td className="px-6 py-4 whitespace-nowrap">{lead.aadhar_card}</td>
              <td className="px-6 py-4 whitespace-nowrap bg-red-800 text-white w-fit h-fit" onClick={() => deleteLeadTemplate(lead._id)}>Delete Lead Template</td>

            </tr>
          ))}
        </tbody>
      </table>)}
      
    </div>
  );
};

export default LeadCardTemplate;

import React, { useState, useEffect,useRef } from 'react';
import { getRecycleBin } from '../../apis/apiInterface';
import { MdContentCopy } from "react-icons/md";
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function RecycleBinView() {
  const [recycleItems, setRecycleItems] = useState([]);
  const divRef = useRef(null);
  useEffect(() => {
    async function fetchRecycleItems() {
      try {
        const data = await getRecycleBin();
        if(data.code==200){
            setRecycleItems(data.data); 

        }else{
            setRecycleItems(null);

        }
      } catch (error) {
        console.error('Error fetching recycle items:', error);
      }
    }

    fetchRecycleItems(); 
  }, []); 
  const copyToClipboard = () => {
    const range = document.createRange();
    range.selectNodeContents(divRef.current);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);

    try {
      const successful = document.execCommand('copy');
      const msg = successful ? 'successful' : 'unsuccessful';
      toast.info('🥷 Copied to clipboard!', {
        position: "bottom-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Bounce,
        });
      console.log('Copy command was ' + msg);
    } catch (err) {
      console.log('Oops, unable to copy', err);
    }

    // Remove the selection
    selection.removeAllRanges();
  };
  const renderTable = (jsonData) => {
    try {
      const parsedData = JSON.parse(jsonData);

      // Base case: if not an object, display as preformatted text
      if (typeof parsedData !== "object" || parsedData === null) {
        return <pre>{JSON.stringify(parsedData, null, 2)}</pre>;
      }

      const keys = Object.keys(parsedData);

      return (
        <table className="table-auto w-full">
          <thead>

          </thead>
          <tbody>
            {Object.keys(parsedData).map((key) => (
              <tr key={key}>
                <td className="border px-4 py-2">
                  {typeof parsedData[key] === "object"
                    ? renderTable(JSON.stringify(parsedData[key]))
                    : parsedData[key]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    } catch (error) {
      console.error("Error parsing JSON:", error);
      return <div>Invalid JSON data</div>;
    }
  };





  if(recycleItems==null){
    return (
      <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%]">
              <h2 className="text-white text-[21px] font-semibold font-mono bg-blue-800 rounded-md p-2">No Recycler Items found !!</h2>

        </main>
  )
  }

  return (
    
    <main className="h-full w-[90%] px-4 pt-4 bg-[#F4FAFF] rounded-[50px] -ml-[5%] overflow-hidden">
    
    <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    
    />

    <div className="overflow-hidden rounded-3xl border border-gray-300 relative">
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4 bg-slate-600 text-white p-2 rounded-lg">Recycle Bin</h1>
      <div className="relative overflow-auto max-h-[680px]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-[340px]">
        {recycleItems!=null && recycleItems.map((item) => (
           
          <div 
            key={item._id} 
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div>
                <div 
                
                onClick={copyToClipboard}
                className='flex flex-row justify-between'>{item.json_type}
                <MdContentCopy className='w-[30px] h-[30px]' />
                    </div>

                

                </div>
                <div
                                ref={divRef}

                className='overflow-scroll bg-zinc-700 text-white p-2 border-2 rounded-xl'>
                    <pre>
                    {item.json_recycle}
                    </pre>
                </div>
            <div className="text-gray-600 text-xs mt-2">
              Created: {new Date(item.createdAt).toLocaleString()} 
              <br />
              Updated: {new Date(item.updatedAt).toLocaleString()} 
            </div>
          </div>
        ))}
      </div>
     </div>
     
    </div>
    </div>

    </main>

   
  );
}

export default RecycleBinView;

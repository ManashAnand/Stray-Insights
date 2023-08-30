import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

const Stray = () => {
    const [strays,setStray] = useState([]);
    
    const state = useSelector((state) =>{
        // console.log("The data in stray is")
        // console.log(state)
        
        return state.chain
    } )
    
    const { contract } = state;
    useEffect(() => {
        const strayMsg = async () => {
            const stray= await state.contract.getStrays();
            setStray(stray)
        }
        contract && strayMsg();
    },[contract])
  return (
    <>
     <p className='text-2xl text-white underline my-4'>Messages</p>
     <div class=" overflow-x-auto shadow-md rounded-lg sm:mx-10 mx-2 " key={Math.random()}>
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">
            Stray Insights Initiative
            <p class="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">Browse a list of Donor's, Here are all the great personality who take's their time and money to think about some voiceless animals.  
            <span className="text-white ml-4 underline">Are you one of those?</span>
            </p>
        </caption>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="px-6 py-3">
                    Donor Name
                </th>
                <th scope="col" class="px-6 py-3">
                    Donor Message
                </th>
                <th scope="col" class="px-6 py-3">
                    Donor Account
                </th>
            </tr>
        </thead>
     {
        strays.map((stray) => {
            console.log(stray)
            return(
                
               <>
        
        <tbody>
            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {stray?.name}
                </th>
                <td class="px-6 py-4">
                {stray?.message}
                </td>
                <td class="px-6 py-4">
                {stray?.from}
                </td>
                {/* <td class="px-6 py-4">
                  <td>{new Date(stray?.from).toLocaleString()}</td>
                </td> */}
            </tr>
        </tbody>
        </>
            )
        })
     } 
    </table>
</div>

     


    </>
  )
}

export default Stray

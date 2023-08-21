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
    const handleInputData = () => {
        console.log("The contract 2 data is")
        console.log(contract)
    }
    useEffect(() => {
        const strayMsg = async () => {
            const stray= await state.contract.getStrays();
            setStray(stray)
        }
        contract && strayMsg();
    },[contract])
  return (
    <>
     <p>Messages</p>
     {
        strays.map((stray) => {
            {/* console.log(stray) */}
            return(
                
                <table key={Math.random()}>
                    <tbody >
                        <tr >
                            <td >{stray?.name}</td>
                            <td>{stray?.message}</td>
                            <td>{stray?.from}</td>
                            {/* <td>{new Date(stray?.from).toLocaleString()}</td> */}
                            <td>{stray?.from}</td>
                        </tr>
                    </tbody>
                </table>
                
            )
        })
     } 
     <button onClick={handleInputData}>Show contract</button>
    </>
  )
}

export default Stray

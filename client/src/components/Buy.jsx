import { ethers } from 'ethers';
import React from 'react'
import { useSelector } from 'react-redux';

const Buy = () => {

  const state = useSelector((state) => {return state.chain});


    const buyStray = async (e) => {
        e.preventDefault();
            const {contract} = state;
            const name = document.querySelector("#name").value;
            const message = document.querySelector("#message").value;
        // console.log(name+" "+message);
        console.log(contract)
        const amount = {value:ethers.parseEther("0.001")};

        const transaction = await contract.pay(name,message,amount)
        await transaction.wait();
        console.log("transaction completed")

    }
  return (
    <>

    <form onSubmit={buyStray}>
      <label htmlFor="">Name</label>
      <input type="text" name="" id="name" placeholder='Enter your name' />
      <label htmlFor="">Message</label>
      <input type="text" name="" id="message" placeholder='Enter your message' />
      <button type='submit' disabled={!state.contract}>pay</button>
    </form>
      <button onClick={() => console.log(state)}>Find data</button>
    </>
  )
}

export default Buy

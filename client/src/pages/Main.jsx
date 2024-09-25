import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Main = () => {

  const[date, setDate] = useState(null);
  const[sourceCurrency, setSourceCurrency] = useState("");
  const[targetCurrency, setTargetCurrency] = useState("");
  const[amountInSourceCurrency, setAmountInSourceCurrency] = useState(0);
  const[amountInTargetCurrency, setAmountInTargetCurrency] = useState(0);
  const[currencyNames, setCurrencyNames] = useState([]);
  const[loading, setLoading] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{

      const responce = await axios.get("http://localhost:5000/convert", {

        params:{

          date,
          sourceCurrency,
          targetCurrency,
          amountInSourceCurrency,
        },


      });

      setAmountInTargetCurrency(responce.data);
      setLoading(false);

      console.log(amountInSourceCurrency, amountInTargetCurrency);

    }catch(err){
      console.error(err);
    }
   
  };

  useEffect(() =>{
    const getCurrencyNames = async() => {

     try{

      const responce = await axios.get(
        "http://localhost:5000/getAllCurrencies"
      );

      setCurrencyNames(responce.data);

     }catch(err){
      console.error(err);
     }
    }

    getCurrencyNames();



  } , [])


  return (
    <div>
      <h1 className='topic'>Convert Your Currencies Today</h1>
      <p className='par'>Welcome to 'Convert Your Currencies Today'! This application allows you to  
        easily convert currencies based on the latest exchange rates.
        Whether you're planning a trip, managing your finance . or simply curious about the value of your money
        in different currencies, this tool is here to help.
      </p>

      <div className='title1'>
        <section className='sec1'>
          <form  onSubmit={handleSubmit}>

              <div className='m1'>
              <label htmlFor={date} className='field'>Date</label>
              <input
              onChange={(e) => setDate(e.target.value)}
              type="Date" id={date} name = {date}  className='input1' placeholder="name@flowbite.com" required/>
              </div>

              <div className='m1'>
              <label htmlFor={sourceCurrency} className='field'>Source Currency</label>
              <select
              onChange={(e) => setSourceCurrency(e.target.value)}
              className='input1' name={sourceCurrency} id={sourceCurrency} value={sourceCurrency}>
                <option value="">Select source Currency</option>
                {Object.keys(currencyNames).map((currency)=>(
                  <option className='curren' key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
              </div>

              <div className='m1'>
              <label htmlFor={targetCurrency} className='field'>Target Currency</label>
              <select
              onChange={(e) => setTargetCurrency(e.target.value)}
              className='input1' name={targetCurrency} id={targetCurrency} value={targetCurrency}>
                <option value="">Select target Currency</option>
                {Object.keys(currencyNames).map((currency)=>(
                  <option className='curren' key={currency} value={currency}>
                    {currencyNames[currency]}
                  </option>
                ))}
              </select>
              </div>

              <div className='m1'>
              <label htmlFor={amountInSourceCurrency} className='field'>Amount in Source Currency</label>
              <input
              onChange={(e) => setAmountInSourceCurrency(e.target.value)}
              type="number" id={amountInSourceCurrency} name={amountInSourceCurrency}  className='input1' placeholder="Amount in Source Currency" required/>
              </div>

              <button className='b1'>Get the target Currency</button>
          </form>
        </section>
      </div>

      {!loading ?  (<section className='amount'>
      {amountInSourceCurrency} {currencyNames[sourceCurrency]} is equals to{" "}
      <span className='target'>{amountInTargetCurrency}</span> {currencyNames[targetCurrency]}
      </section> ) : null}
    


    </div>
  );
}

export default Main

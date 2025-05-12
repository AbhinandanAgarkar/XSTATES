import './selectDropdown.css';

import { useState, useEffect } from "react";

export default function SelectDropdown(){

    const [countries, setCountries] = useState([]);

    const [states, setStates] = useState([]);

    const [cities, setCities] = useState([]);

    
    const[ifCountrySelected, setCountrySelected]= useState("");

    const[ifStateSelected, setStateSelected]  = useState("");

    const[ifCitySelected, setCitySelected]  = useState("");


    const countriesUrl = "https://crio-location-selector.onrender.com/countries";

    const statesUrl = 'https://crio-location-selector.onrender.com/country=';

    const cityUrl = 'https://crio-location-selector.onrender.com/country=';


    useEffect(()=>{
        async function fetchData () {

            try{
         let response = await fetch(countriesUrl);
            let data = await response.json();
            setCountries(data);
            }

            catch(e){
                console.error(e)
            }
        }
    fetchData(); }, [])

    useEffect(()=>{ 
        
        async function fetchData () {

        try{

            let response = await fetch(statesUrl+ifCountrySelected+'/states');
            let data = await response.json();
            setStates(data);

        }
        catch(e){
          console.error(e)
        }


        }
    fetchData(); }, [ifCountrySelected])

    useEffect(()=>{ 
        async function fetchData () {
            
             try{            
            let response = await fetch(cityUrl+ifCountrySelected+'/state='+ifStateSelected+'/cities');
            let data = await response.json();
            setCities(data);
             }

            catch(e){
                console.error(e)
            }

        }
    fetchData(); }, [ifCountrySelected, ifStateSelected])


    const handleChangeCountry = (e) => {
 
        setCountrySelected(e.target.value);
        setStateSelected("");
        setCitySelected("");

    }

    const handleChangeState = (e) => {
 
        setStateSelected(e.target.value);

    }

    const handleChangeCity = (e) => {
 
        setCitySelected(e.target.value);

    }


    return(
        <>
        <div className='menu'>   

        <select name="country" id="country" onChange={handleChangeCountry} > 
            <option value='' disabled selected >Select Country</option>
            {countries.map((country)=>{
                return <option key={country} value={country}>{country}</option>
            })}
            
        </select>   

         <select name="state" id="state" disabled={!ifCountrySelected} onChange={handleChangeState}> 
            <option value='Select State' disabled selected >Select State</option>
            {states.map((state)=>{
               return <option value={state}>{state}</option>
            })}

        </select>

         <select name="city" id="city" disabled={!ifStateSelected} onChange={handleChangeCity}> 
            <option value='Select City' disabled selected >Select City</option>
            {cities.map((city)=>{
               return  <option value={city}>{city}</option>
            })}

        </select>
        </div>
        <br/>
        {ifCitySelected && <h1> You selected { ifCitySelected}, {ifStateSelected}, {ifCountrySelected}</h1>}

        </>
    )
}
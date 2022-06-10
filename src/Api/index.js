
import axios from "axios";
const url = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
  let changebleUrl=url;
   if(country){
     changebleUrl=`${url}/countries/${country}`;
   }
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changebleUrl);

    //    const modifiedData={
    //        confirm:data.confirm,
    //        recovered:data.recovered,
    //        deaths:data.deaths,
    //        lastUpdate:data.lastUpdate,
    //    }
    //    return modifiedData;
    return { confirmed, recovered, deaths, lastUpdate };
  }
  catch (error) {
return error;
  }
};
export const fetchDailyData = async () => {
  try { 
    
    const { data } = await axios.get(`${url}/daily`);
    return data.map(({confirmed,deaths,reportDate:date})=>({confirmed:confirmed.total,deaths:deaths.total,date}))
    // const modifiedData = data.map((dailyData) => ({
    //  confirmed: dailyData.confirmed.total,
    //  deaths: dailyData.deaths.total,
    //   date: dailyData.reportDate,
    //  }));
    //  return modifiedData;
  }
  catch (error) {

  }
} 
export const fetchCountries=async ()=>{
try{
const {data:{countries}}=await axios.get(`${url}/countries`);
return countries.map((country)=>country.name);
}
catch(error){
  console.log(error);
}

};
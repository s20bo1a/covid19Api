import React, { useState, useEffect } from 'react';
import { fetchDailyData } from '../../Api';
import styles from "./Chart.module.css";
import { Line, Bar } from "react-chartjs-2"; 

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  const [dailyData, setDailyData] = useState({});
  useEffect(() => {
    const fetchAPI = async () => {
      const initialDailyData = await fetchDailyData()
      setDailyData(initialDailyData);
    };

    fetchAPI();
  }, []);
  const lineChart = (
    dailyData.length
      ? (
        <Line
          data={{
            labels: dailyData.map(({ date }) => new Date(date).toLocaleDateString()),
            datasets: [{
              data: dailyData.map((data) => data.confirmed),
              label: 'Infected',
              borderColor: '#3333ff',
              fill: true,
            }, {
              data: dailyData.map((data) => data.deaths),
              label: 'Deaths',
              borderColor: 'red',
              backgroundColor: 'rgba(250,0,0,0.5)',
              fill: true,
            },{
              data:dailyData.map((data)=>data.recovered), 
              label:'Recovered',
              borderColor:'green', 
              backgroundColor:'rgba(0,255,0,0.5)',
              fill:true,
            },],

          }}
        />) : null
  );
  
  const barChart = (
    confirmed
      ? (
        <Bar
          data={{
            labels: ['Infected', 'Recovered', 'Deaths'],
            datasets: [{
              labels: 'People',
              backgroundColor: [
                'rgba(0,0,225, 0.5)', 'rgba(0,225,0, 0.5)'
                , 'rgba(225,0,0, 0.5)'
              ],
              data: [confirmed.value, recovered.value, deaths.value]
            },
          ],

          }}
          options={{
            legend: { display: false },
            title: { display: true, text: `Current state in ${country}` },
          }}

        />
      ) : null
  );

  return (
    <div className={styles.container}>
     {country ?barChart:lineChart}
    </div>
  );
};

export default Chart;
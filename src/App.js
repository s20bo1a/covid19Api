import React from 'react'

import { Cards, Chart, CountryPicker } from './components';
import styles from "./App.module.css";
import { fetchData } from './Api';
import coronaImage from './images/image.png';

export class App extends React.Component {
  state = {
    data: {}, 
    country:'',
  }
  async componentDidMount() {
    const fetcheddata = await fetchData();
    this.setState({ data: fetcheddata });
  }
  handleCountryChange=async(country)=>{
    const fetchedData = await fetchData(country);//fetch data
    // set the state  
    this.setState({data:fetchedData,country:country})
    //console.log(country);
  }

  render() {
    const { data,country } = this.state;
    return (
      <div className={styles.container}>
        
        <img className={styles.image} src={coronaImage} alt="COVID-19"/>
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange}/>
        <Chart data={data} country={country}/>
      </div>
    );
  }
}

export default App
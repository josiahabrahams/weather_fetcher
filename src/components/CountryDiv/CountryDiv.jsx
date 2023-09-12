import {Delete} from '@mui/icons-material'
import {IconButton} from '@mui/material'
import './CountryDiv.css'
 /**
  * @callback EmpFn 
  * @returns
  */
/**
  * @typedef {Object} Props - what the funtion uses to function
  * @prop {string} name - name of searched location
  * @prop {string}  description - description of the location's weather
  * @prop {string} country -  country the location belongs to
  *  @prop {*} id - id of location used to delete a CountryDiv
  * @prop {number} temprature -temprature of location in kelvin 
  * @prop {EmpFn} deleteDiv - this function removes the div when clicked
  */
/**
 * is a function that returns jsx that contains a dialoge that helps the user use the app
 * @param {Props} props 
 * @returns {jsx}
 */
export const CountryDiv = (props) => {
 return (
    <div className='country_holder'>
      <div className='header_holder'>
        <h2>{props.name}</h2>
        <span><IconButton style={{marginTop:'1rem'}} onClick={()=>props.deleteDiv(props.id)}><Delete/></IconButton></span>
      </div>
      <div className='detail_div'>
        <p>Temprature: {Math.floor(props.temprature - 273.15)}</p>
        <p>Weather: {props.description}</p>
        <p>Country: {props.country}</p>
      </div>
    </div>
 )

}
import './CountryDiv.css'

/**
  * @typedef {Object} Props - what the funtion uses to function
  * @prop {string} name - name of searched location
  * @prop {string}  description - description of of locations weather
  * @prop {string} country - locations country
  * @prop {number} temprature -temprature of location
  */
/**
 * is a function that returns jsx that contains a dialoge that helps the user use the app
 * @param {Props} props 
 * @returns {jsx}
 */
export const CountryDiv = (props) => {
 return (
    <div className='country_holder'>
      <h2>{props.name}</h2>
      <div className='detail_div'>
        <p>Temprature: {Math.floor(props.temprature - 273.15)}</p>
        <p>Weather: {props.description}</p>
        <p>Country: {props.country}</p>
      </div>
    </div>
 )

}
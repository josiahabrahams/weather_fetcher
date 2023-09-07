import { useState } from 'react'
import { Button, Dialog} from '@mui/material'

import './HelpDialog.css'
 /**
  * @callback EmpFn 
  * @returns
  */
/**
  * @typedef {Object} Props - what the funtion uses to function
  * @prop {boolean} isHelpClicked - is the boolean that defines whether the dialog shows or not
  * @prop {EmpFn}  closeHelpDialog - is used to close the dialog
  */
/**
 * is a function that returns jsx that contains a dialoge that helps the user use the app
 * @param {Props} props 
 * @returns {jsx}
 */
export const HelpDialog = (props) => {
 for (const prop in props){
   if  (!prop) {
    throw new Error('a prop does not exist')
   }
 }

   
  return (
    <>
      <Dialog  open={props.isHelpClicked} >
    <div style={{fontSize:'1.5rem', paddingTop:"1rem"}}>
      click the search icon to search for the weather of a city or a country
    </div>
    <Button variant='outlined' onClick={props.closeHelpDialog}>close</Button>
  </Dialog>
    </>
  )
}
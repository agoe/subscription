import React,{useState} from 'react';
import {useField} from '@formiz/core'
import { WarningIcon } from '@chakra-ui/icons'

type RadioButtonsComponentProps = {

      name : string,
      required?:any,
      title:string,
      options:any[],
      state?: any,
       //fields for the depending fields
       isDependable?:boolean,
       dependableValue?:any,
       recievedValue?:any,

       //props for field that other fields depend on
       hasDependable?:boolean,
       onValueSelected?:(value:any)=>void


}


const RadioButtonsComponent = (props:RadioButtonsComponentProps)=>{

  const {
    errorMessage,
    id,
    isValid,
    isSubmitted,
    setValue,
    value,
  } = useField(props);



  //const { title, type, required, name,hasDependable,onValueSelected} = props
  const { title,  required, name,hasDependable,onValueSelected} = props
  const [isTouched, setIsTouched] = React.useState(false)
  const showError = !isValid && (isTouched || isSubmitted);
  const [initialize,setInitialize] = useState(false);

  if(!initialize){
    if(props.state){
      setValue(props.state[props.name]);
      setInitialize(true);
    }else{
      setInitialize(true);
    }

 }

  const handleValueChange = (v)=>{
    if(hasDependable){
      //https://stackoverflow.com/questions/56913963/cannot-invoke-an-object-which-is-possibly-undefined-ts2722
      if (onValueSelected) onValueSelected(v);
    }
    setValue(v)
  }

  return(

    <div className="form-group"  >
        <label htmlFor="field-ta" className="col-sm-12 control-label inputLabel">
       {title}
        {!!required && <span className="requiredColor"> *</span>}
      </label>
        <div className="col-sm-12 radiobuttongroup" aria-invalid={showError}
    aria-describedby={!isValid ? `${id}-error` : undefined}>
        {
            props.options.map((val:string)=>
                <div key={val} style={{flexDirection:'row',display:"flex",alignContent:'center',alignItems:'center'}}>

                    <input
                       onChange={()=>handleValueChange(val)}
                       name={name}
                       onBlur={()=>setIsTouched(true)}
                       type="radio"
                       checked={value == val}
                      
                      />
                      <label style={{marginTop:4,marginLeft:10}}>
                       {val}
                    </label>
                    <br />
                </div>
            )
        }
        </div>
        {showError && (
          <div style={{marginLeft:0,fontSize:13,marginTop: 8}} id={`${id}-error`} className="demo-form-feedback text-danger chakra-form__error-message">
            <WarningIcon w={3} h={3} color="red.500" className="warningicon"/>{ errorMessage }
          </div>
        )}
    </div>
)}

export default RadioButtonsComponent;
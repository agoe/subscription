import React, { useState } from "react";
import { useField } from "@formiz/core";
import DayPickerInput from "react-day-picker/DayPickerInput";
import { DateUtils } from "react-day-picker";
import "react-day-picker/lib/style.css";
import { WarningIcon } from '@chakra-ui/icons'

import dateFnsFormat from "date-fns/format";
import dateFnsParse from "date-fns/parse";
import deLocale from 'date-fns/locale/de';

import formStyles from "../../styles/form.module.css";

//function parseDate(str, format, locale) {
function parseDate(str) {
  const parsed = dateFnsParse(str, "dd.MM.yyyy", new Date(), deLocale );
  console.log("parsed",parsed);
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

function formatDate(date, format) {
  return dateFnsFormat(date, format, deLocale);
}
const DatePicker = (props) => {
  const { isSubmitted,errorMessage, id, isValid, value, setValue } = useField(props);
  const [isTouched, setIsTouched] = React.useState(false)
  const [initialize,setInitialize] = useState(false);
  const { label, required, name } = props;
  const showError = !isValid && isSubmitted;
  const FORMAT = "dd.MM.yyyy";
  const placeholder = dateFnsFormat(new Date(),FORMAT,{locale:deLocale});
  console.log("datePlaceholder",placeholder)
  if(!initialize){
    if(props.state){
      setValue(props.state[props.name]);
      setInitialize(true);
    }else{
      setInitialize(true);
    }

 }
  return (
    <div className={formStyles["date-picker"]}>
      <DayPickerInput
        style={{ display: "block", marginBottom:12, }}
        formatDate={formatDate}
        format={FORMAT}
        parseDate={parseDate}
        //placeholder={`${dateFnsFormat(new Date(), FORMAT,deLocale)}`}
        placeholder={placeholder}
        onDayChange={(e) => {
          setValue(e);
        }}
        aria-invalid={showError}
        aria-describedby={!isValid ? `${id}-error` : undefined}
      />
      {/*showError && <div>{errorMessage}</div>*/}
      {showError && (
          <div style={{marginLeft:0,fontSize:14,marginTop: -4}} id={`${id}-error`} className="demo-form-feedback text-danger chakra-form__error-message">
            <WarningIcon w={3} h={3} color="red.500" className="warningicon"/>{ errorMessage }
          </div>
        )}
    </div>
  );
};

export default DatePicker;

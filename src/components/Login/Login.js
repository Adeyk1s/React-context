import React, { useState, useEffect , useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import styles from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/auth-context";

const emailReducer = (prevState, action) => {
  if(action.type === "USER_INPUT"){
    return {
      value: action.value,
      isValid: action.value.includes('@'),
    };
  }
  if(action.type === "INPUT_BLUER"){
    return{
      value: prevState.value,
      isValid: prevState.value.includes('@'),
    };
  }
  return {
    value: '',
    isValid: false,
  };
};
const passwordReducer = (prevState,action) => {
  if(action.type === "PASSWORD_CHANGE"){
    return{
      value: action.value,
      isValid: action.value.trim().length > 7,
    };
  };
  if(action.type === 'PASSWORD_BLUER'){
    return{
      value: prevState.value,
      isValid: prevState.value.trim().length > 7,
    };
  };
  return{
    value: '',
    isValid: false,
  };
};


const Login = (props) => {
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmailState] = useReducer( emailReducer, { value: '' , isValid : undefined });
  const [passwordState, dispatchPasswordState] = useReducer( passwordReducer, { value: '', isValid: undefined});

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordisValid} = passwordState;

  const ctx = useContext(AuthContext);

  useEffect(()=>{
    const timer = setTimeout(()=>{
      setFormIsValid(
        emailIsValid && passwordisValid
      );
    }, 500)
    return() => {
      clearTimeout(timer);
    };
  },[emailIsValid,passwordisValid])

  const emailChangeHandler = (event) => {
    dispatchEmailState({type: "USER_INPUT", value: event.target.value})
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordState({type: "PASSWORD_CHANGE",value: event.target.value});
  };

  const validateEmailHandler = () => {
    dispatchEmailState({type:"INPUT_BLUER"})
  };

  const validatePasswordHandler = () => {
    dispatchPasswordState({type:"PASSWORD_BLUER"});
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid){
      ctx.onLogin(emailState.value, passwordState.value); 
    } else if(!emailIsValid) {

    } else if(!passwordisValid){
      
    }
    
  };

  return (
    <Card className={styles.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${styles.control} ${
            emailState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${styles.control} ${
            passwordState.isValid === false ? styles.invalid : ""
          }`}
        >
          <label htmlFor="password">Пароль</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={styles.actions}>
          <Button type="submit" className={styles.btn}>
            Вход
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;

import {Button} from "primereact/button";
import { useTranslation } from 'react-i18next'
import {InputText} from "primereact/inputtext";
import React, {useState} from "react";
import logo from "../assets/images/logo.svg";
import Router from "next/router";
import Link from "next/link";


const Login = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showError, setShowError] = useState(false)

  const handleLogin = async () => {
    const response = await fetch("api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      Router.push("/");
    } else {
      setShowError(true)
    }
  };

  return (
    <main className="login">
      <div className="login-container">

        <div className="logo" >
          <img
            src={logo}
            alt="Highways England"
          />
        </div>

        <h1 className="login-title">{t('signIn')}</h1>

        <div className="login-input-container">
          <label htmlFor="email" className="login-label">{t('email')}</label>
          <div className="p-input-icon-left login-input">
            <i className="pi pi-user" />
            <InputText
              id="email"
              value={email}
              type="email"
              onChange={(e) => {
                setShowError(false)
                setEmail(e.target.value)}
              }
            />
          </div>
        </div>

        <div className="login-input-container">
          <label htmlFor="password" className="login-label">{t('password')}</label>
          <div className="p-input-icon-left login-input">
            <i className="pi pi-key" />
            <InputText
              id="password"
              value={password}
              type="password"
              onChange={(e) => {
                setShowError(false)
                setPassword(e.target.value)}
              }
            />
          </div>
        </div>

        <div className="login-error" style={{visibility: showError ? 'visible': 'hidden'}}>
          {t('invalidEmailPassword')}
        </div>

        <div className="login-links" >
          <Link href="/forgotPassword">
            {t('forgotPasswordLink')}
          </Link>

        </div>

        <Button
          className="login-button m-t-20"
          label={t('login')}
          onClick={() => handleLogin()}
        />

        <Button
          className="login-button m-t-20 p-button-secondary"
          label={t('continueGuest')}
        />
      </div>
    </main>
  )
}

export default Login

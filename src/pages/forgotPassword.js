import {Button} from "primereact/button";
import { useTranslation } from 'react-i18next'
import {InputText} from "primereact/inputtext";
import logo from "../assets/images/logo.svg";
import React, {useState} from "react";
import Router from "next/router";


const ForgotPassword = () => {
  const { t } = useTranslation()
  const [email, setEmail] = useState('')

  const handleForget = () => {
    Router.push("/login");
  }

  return (
    <main className="forgotPassword">
      <div className="forgotPassword-container">

        <div className="logo" >
          <img
            src={logo}
            alt="Highways England"
          />
        </div>

        <h1 className="forgotPassword-title">{t('forgotPassword')}</h1>

        <div className="forgotPassword-input-container">
          <label htmlFor="email" className="forgotPassword-label">{t('enterEmail')}</label>
          <div className="p-input-icon-left forgotPassword-input">
            <i className="pi pi-user" />
            <InputText
              id="email"
              value={email}
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)}
              }
            />
          </div>
        </div>

        <Button
          className="forgotPassword-button m-t-20"
          disabled={false}
          label={t('send')}
          onClick={() => handleForget()}
        />
      </div>
    </main>
  )
}

export default ForgotPassword

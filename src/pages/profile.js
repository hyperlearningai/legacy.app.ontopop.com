import { useTranslation } from 'react-i18next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import HeadTags from '../components/HeadTags'
import HeaderComponent from '../components/HeaderComponent'
import checkTokenValidity from '../utils/auth/checkTokenValidity'
import actions from '../store/actions'

const Profile = ({
  addToObject,
  user
}) => {
  const { t } = useTranslation()

  const [firstName, setFirstName] = useState(user.firstName)
  const [editingFirstName, setEditingFirstName] = useState(false)

  const [lastName, setLastName] = useState(user.lastName)
  const [editingLastName, setEditingLastName] = useState(false)

  const [email, setEmail] = useState(user.email)
  const [editingEmail, setEditingEmail] = useState(false)

  const [company, setCompany] = useState(user.company)
  const [editingCompany, setEditingCompany] = useState(false)

  const router = useRouter()

  useEffect(() => {
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setEmail(user.email)
    setCompany(user.company)
  }, [user])

  // check if authenticated, otherwise redirect to login
  useEffect(() => {
    if (!user.isGuest && user.email === '') {
      checkTokenValidity({
        router,
        addToObject
      })
    }
  }, [])

  return (
    <>
      <HeadTags
        title=""
        description={t('ontologyVisualisationDescription')}
      />

      <HeaderComponent />
      <main className="profile">
        <div className="profile-container">
          <h1 className="profile-title">{t('profile')}</h1>

          <div className="profile-input-container">
            <p className="profile-label">{t('firstName')}</p>
            {
              editingFirstName ? (
                <div className="p-inputgroup ">
                  <InputText
                    id="firstName"
                    value={firstName}
                    type="text"
                    onChange={(e) => {
                      setFirstName(e.target.value)
                    }}
                  />
                  <Button
                    icon="pi pi-check"
                    onClick={() => setEditingFirstName(false)}
                    className="p-button-success"
                  />
                  <Button
                    onClick={() => {
                      setFirstName(user.firstName)
                      setEditingFirstName(false)
                    }}
                    icon="pi pi-times"
                    className="p-button-danger"
                  />
                </div>
              ) : (
                <p className="profile-value">
                  {firstName}
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => setEditingFirstName(true)}
                    className="p-button-rounded p-button-text p-button-plain"
                  />
                </p>
              )
            }
          </div>

          <div className="profile-input-container">
            <p className="profile-label">{t('lastName')}</p>
            {
                    editingLastName ? (
                      <div className="p-inputgroup ">
                        <InputText
                          id="lastName"
                          value={lastName}
                          type="lastName"
                          onChange={(e) => {
                            setLastName(e.target.value)
                          }}
                        />
                        <Button
                          icon="pi pi-check"
                          onClick={() => setEditingLastName(false)}
                          className="p-button-success"
                        />
                        <Button
                          onClick={() => {
                            setLastName(user.lastName)
                            setEditingLastName(false)
                          }}
                          icon="pi pi-times"
                          className="p-button-danger"
                        />
                      </div>
                    ) : (
                      <p className="profile-value">
                        {lastName}
                        <Button
                          icon="pi pi-pencil"
                          onClick={() => setEditingLastName(true)}
                          className="p-button-rounded p-button-text p-button-plain"
                        />
                      </p>
                    )
                  }
          </div>

          <div className="profile-input-container">
            <p className="profile-label">{t('email')}</p>
            {
                  editingEmail ? (
                    <div className="p-inputgroup ">
                      <InputText
                        id="email"
                        value={email}
                        type="email"
                        onChange={(e) => {
                          setEmail(e.target.value)
                        }}
                      />
                      <Button
                        icon="pi pi-check"
                        onClick={() => setEditingEmail(false)}
                        className="p-button-success"
                      />
                      <Button
                        onClick={() => {
                          setEmail(user.email)
                          setEditingEmail(false)
                        }}
                        icon="pi pi-times"
                        className="p-button-danger"
                      />
                    </div>
                  ) : (
                    <p className="profile-value">
                      {email}
                      <Button
                        icon="pi pi-pencil"
                        onClick={() => setEditingEmail(true)}
                        className="p-button-rounded p-button-text p-button-plain"
                      />
                    </p>
                  )
                }
          </div>

          <div className="profile-input-container">
            <p className="profile-label">{t('company')}</p>
            {
              editingCompany ? (
                <div className="p-inputgroup ">
                  <InputText
                    id="company"
                    value={company}
                    type="company"
                    onChange={(e) => {
                      setCompany(e.target.value)
                    }}
                  />
                  <Button
                    icon="pi pi-check"
                    onClick={() => setEditingCompany(false)}
                    className="p-button-success"
                  />
                  <Button
                    onClick={() => {
                      setCompany(user.company)
                      setEditingCompany(false)
                    }}
                    icon="pi pi-times"
                    className="p-button-danger"
                  />
                </div>
              ) : (
                <p className="profile-value">
                  {company}
                  <Button
                    icon="pi pi-pencil"
                    onClick={() => setEditingCompany(true)}
                    className="p-button-rounded p-button-text p-button-plain"
                  />
                </p>
              )
            }
          </div>

        </div>

      </main>
    </>
  )
}

Profile.propTypes = {
  user: PropTypes.shape().isRequired,
  addToObject: PropTypes.func.isRequired,
}

const mapPropsToState = ({
  user,
  addToObject
}) => ({
  user,
  addToObject
})

export default connect(
  mapPropsToState,
  actions
)(Profile)

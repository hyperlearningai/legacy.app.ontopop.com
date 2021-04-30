/* eslint-disable react/jsx-no-target-blank */
/* eslint max-len:0 */
/* eslint react/no-unescaped-entities:0 */
import React from 'react'
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import {
  FaTasks,
} from 'react-icons/fa'
import {
  VscRocket
} from 'react-icons/vsc'
import {
  AiOutlineRead
} from 'react-icons/ai'
import {
  GoGitBranch
} from 'react-icons/go'
import {
  IoCode
} from 'react-icons/io5'
import {
  BiCog
} from 'react-icons/bi'
import {
  GiMagnifyingGlass,
  GiCubes
} from 'react-icons/gi'
import {
  FiCodepen
} from 'react-icons/fi'
import IndexNavbar from '../components/IndexNavbar.js'
import { APP_NAME } from '../constants/app.js'
import { ROUTE_INDEX, ROUTE_LOGIN } from '../constants/routes.js'
import {
  ANCHOR_ABOUT,
  ANCHOR_LEARN,
  ANCHOR_APP,
  ANCHOR_CONTRIBUTE,
  ANCHOR_FEATURES,
  INTRO_VIDEO,
  WIKI_LINK,
  ANCHOR_CONTACTS,
  CONTACT_EMAIL,
  LICENSE_LINK,
  REPO_LINK
} from '../constants/homepage.js'
import ndLogo from '../assets/images/nd-logo.png'
import highwaysenglandLogo from '../assets/images/highwaysengland-logo.png'
import Footer from '../components/Footer.js'
import visualisationIcon from '../assets/images/website/idea-concept@2x.png'
import searchIcon from '../assets/images/website/problem-solving@2x.png'
import vocabularyIcon from '../assets/images/website/assessment-evaluation@2x.png'
import managementIcon from '../assets/images/website/cooperation-1@2x.png'
import exportIcon from '../assets/images/website/printer@2x.png'
import emailIcon from '../assets/images/website/e-mail@2x.png'
import screenshot1 from '../assets/images/website/screenshot1.png'
import HeadTags from '../components/HeadTags.js'

const Index = () => {
  const { t } = useTranslation()

  return (
    <>
      <HeadTags
        title=""
        description={t('ontopopDescription')}
      />
      <div className="landing website">
        <IndexNavbar fixed />
        <section id={ANCHOR_ABOUT} className="website-jumbo header relative pt-16 items-center flex h-screen h-860-px overflow-x-hidden">
          <div className="container mx-auto items-center flex flex-wrap pr-4">
            <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
              <div className="pt-32 sm:pt-0 mt-20 pb-20">
                <h1 className="font-semibold text-4xl text-blueGray-600">
                  {APP_NAME}
                </h1>
                <p className="mt-4 text-lg leading-relaxed text-blueGray-500">
                  {t('ontopopDescription')}
                </p>
                <div className="mt-12">
                  <Link
                    href={`${ROUTE_INDEX}#${ANCHOR_FEATURES}`}
                  >
                    <a
                      className="p-button website-btn-primary flex align-center justify-between"
                    >
                      {t('findOutMore')}
                      <i className="pi pi-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-40 pb-40 relative bg-blueGray-100 pr-4 overflow-x-hidden">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-100 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div id={ANCHOR_FEATURES} className="container mx-auto pt-20">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-6/12 px-10 website-title-section">
                <div className="text-blueGray-500 p-3 text-xl text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <FaTasks />
                </div>
                <h2 className="text-3xl mb-2 font-semibold leading-normal">
                  {t('whyUseOntopop')}
                </h2>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  {t('whyUsePart1')}
                </p>
                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  {t('whyUsePart2')}
                </p>
              </div>

              <div className="w-full px-4 mt-10">
                <div className="flex flex-wrap items-start">
                  <div className="w-full md:w-4/12 px-4 website-feature">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-start justify-center mb-5 shadow-lg rounded-full bg-white website-feature-icon">
                          <img
                            src={visualisationIcon}
                            alt={t('visualisation')}
                          />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">
                          {t('visualisation')}
                        </h6>
                        <p className="mb-4 text-blueGray-500">
                          {t('networkVisualisationExploration')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4 website-feature">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-start justify-center mb-5 shadow-lg rounded-full bg-white website-feature-icon">
                          <img
                            src={searchIcon}
                            alt={t('search')}
                          />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">{t('search')}</h6>
                        <p className="mb-4 text-blueGray-500">
                          {t('freeTextSearchQueryBuilder')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4 website-feature">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-start justify-center mb-5 shadow-lg rounded-full bg-white website-feature-icon">
                          <img
                            src={managementIcon}
                            alt={t('management')}
                          />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">{t('management')}</h6>
                        <p className="mb-4 text-blueGray-500">
                          {t('ontoEditingManagement')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4 website-feature">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-start justify-center mb-5 shadow-lg rounded-full bg-white website-feature-icon">
                          <img
                            src={vocabularyIcon}
                            alt={t('vocabulary')}
                          />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">{t('vocabulary')}</h6>
                        <p className="mb-4 text-blueGray-500">
                          {t('vocabularyManagement')}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-4/12 px-4 website-feature">
                    <div className="relative flex flex-col min-w-0 mt-4">
                      <div className="px-4 py-5 flex-auto">
                        <div className="text-blueGray-500 p-3 text-center inline-flex items-start justify-center mb-5 shadow-lg rounded-full bg-white website-feature-icon">
                          <img
                            src={exportIcon}
                            alt={t('export')}
                          />
                        </div>
                        <h6 className="text-xl mb-1 font-semibold">{t('export')}</h6>
                        <p className="mb-4 text-blueGray-500">
                          {t('exportCollaboration')}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-40 pb-40 relative bg-blueGray-600 pr-4 overflow-x-hidden">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-600 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div id={ANCHOR_LEARN} className="container mx-auto pt-20">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-6/12 px-10 website-title-section">
                <div className="text-blueGray-500 text-xl p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <AiOutlineRead />
                </div>
                <h2 className="text-3xl text-white mb-2 font-semibold leading-normal">
                  {t('howToUse')}
                </h2>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                  {t('followingVideo')}
                </p>

                <div className="website-video">
                  <iframe
                    title={APP_NAME}
                    width="560"
                    height="315"
                    src={INTRO_VIDEO}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                  {t('toLearnMore')}
                </p>

                <div className="mt-12">
                  <a
                    href={WIKI_LINK}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className="p-button website-btn-primary flex align-center justify-between"
                  >
                    {t('ontopopWiki')}
                    <i className="pi pi-arrow-right" />
                  </a>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative text-blueGray-700 absolute text-55 opacity-80 tablet-hide">
                <GiCubes />
              </div>
            </div>
          </div>

        </section>

        <section className="pt-40 pb-40 relative bg-blueGray-100 pr-4 overflow-x-hidden">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-100 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div id={ANCHOR_APP} className="container mx-auto pt-20">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-6/12 px-10 website-title-section">
                <div className="text-blueGray-500 p-3 text-xl text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <VscRocket />
                </div>
                <h2 className="text-3xl mb-2 font-semibold leading-normal">
                  {t('ontopopApp')}
                </h2>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                  {t('communityHostedApp')}
                </p>

                <div className="mt-12">
                  <Link
                    id="open-app"
                    href={`${ROUTE_LOGIN}`}
                  >
                    <a
                      id="open-app"
                      className="p-button website-btn-primary flex align-center justify-between"
                    >
                      {t('openOntopop')}
                      <i className="pi pi-arrow-right" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pt-40 pb-40 relative bg-blueGray-600 pr-4 overflow-x-hidden">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-600 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div id={ANCHOR_CONTRIBUTE} className="container mx-auto pt-20">
            <div className="flex flex-wrap items-center">
              <div className="w-full md:w-6/12 px-10 website-title-section">
                <div className="text-blueGray-500 text-xl p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                  <GoGitBranch />
                </div>
                <h2 className="text-3xl text-white mb-2 font-semibold leading-normal">
                  {t('howToContribute')}
                </h2>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                  {t('openSourceFramework1')}
                  {' '}
                  <a
                    className="p-link website-btn-link"
                    href={LICENSE_LINK}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                  >
                    Creative Commons Attribution-ShareAlike license
                  </a>
                  .
                </p>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                  {t('openSourceFramework2')}
                </p>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                  {t('openSourceFramework3')}
                </p>

                <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-white">
                  {t('openSourceFramework4')}
                </p>

                <div className="mt-12 flex align-center justify-start">
                  <a
                    href={WIKI_LINK}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className="p-button website-btn-secondary flex align-center justify-between"
                  >
                    {t('ontopopWiki')}
                    <i className="pi pi-arrow-right" />
                  </a>

                  <a
                    href={REPO_LINK}
                    rel="noopener noreferrer nofollow"
                    target="_blank"
                    className="p-button website-btn-primary flex align-center justify-between ml-2"
                  >
                    {t('ontopopRepo')}
                    <i className="pi pi-arrow-right" />
                  </a>
                </div>
              </div>

              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative text-blueGray-700 absolute text-55 opacity-80 tablet-hide">
                <FiCodepen />
              </div>
            </div>
          </div>

          <div className="container mx-auto mt-20">
            <div className="w-full lg:w-8/12 px-4 mx-auto">
              <div className="flex flex-wrap align-center justify-center">
                <div className="w-full px-4 website-sponsor">
                  <h5 className="text-xl text-white font-semibold pb-4 text-center">
                    {t('primarySponsor')}
                  </h5>
                  <a
                    href="https://highwaysengland.co.uk/"
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                  >
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg"
                        src={highwaysenglandLogo}
                      />
                    </div>
                  </a>
                </div>

                <div className="w-full px-4 website-sponsor">
                  <h5 className="text-xl text-white font-semibold pb-4 text-center">
                    National Digital Twin
                  </h5>
                  <a
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    href="https://www.cdbb.cam.ac.uk/what-we-do/national-digital-twin-programme"
                  >
                    <div className="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150">
                      <img
                        alt="..."
                        className="align-middle border-none max-w-full h-auto rounded-lg py-5"
                        src={ndLogo}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 pb-32 pt-48">
            <div className="items-center flex flex-wrap">
              <div className="w-full md:w-5/12 ml-auto px-12 md:px-4">
                <div className="md:pr-12">
                  <div className="text-blueGray-500 p-3 text-xl text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <IoCode />
                  </div>
                  <h3 className="text-3xl text-white font-semibold">
                    {t('mainContributors')}
                  </h3>
                  <ul className="list-none mt-6">
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xl font-semibold inline-block py-2 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                            <BiCog />
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Jillur Quddus - Project Team Lead & Lead Engineer
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xl font-semibold inline-block py-2 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                            <GiMagnifyingGlass />
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Natasha Chowdory - Lead User Researcher
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xl font-semibold inline-block py-2 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                            <FiCodepen />
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Christian Carestia - Lead Front End Engineer
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xl font-semibold inline-block py-2 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                            <FiCodepen />
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Michal Kostyal - Front End Engineer
                          </h4>
                        </div>
                      </div>
                    </li>
                    <li className="py-2">
                      <div className="flex items-center">
                        <div>
                          <span className="text-xl font-semibold inline-block py-2 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3">
                            <FiCodepen />
                          </span>
                        </div>
                        <div>
                          <h4 className="text-blueGray-200">
                            Tan Kent - Front End Engineer
                          </h4>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
                <img
                  alt="..."
                  className="max-w-full rounded-lg shadow-xl"
                  style={{ transform: 'scale(1) perspective(1040px) rotateY(-11deg) rotateX(2deg) rotate(2deg)' }}
                  src={screenshot1}
                />
              </div>
            </div>
          </div>

        </section>

        <section className="pb-16 bg-blueGray-200 relative pt-32 pr-4 pl-4">
          <div
            className="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
            style={{ transform: 'translateZ(0)' }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              />
            </svg>
          </div>

          <div id={ANCHOR_CONTACTS} className="container mx-auto">
            <div className="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10">
              <div className="w-full text-center lg:w-8/12">
                <div className="flex align-center justify-center">
                  <img
                    src={emailIcon}
                    alt={t('anyQuestions')}
                  />
                </div>
                <h3 className="font-semibold text-3xl">
                  {t('anyQuestions')}
                  ?
                </h3>

                <div className="flex align-center justify-center mt-10">
                  <a
                    href={CONTACT_EMAIL}
                    className="p-button website-btn-primary flex align-center justify-between"
                  >
                    {t('contactUs')}
                    <i className="pi pi-envelope" />
                  </a>
                </div>
                <div className="text-center mt-16" />
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  )
}

export default Index

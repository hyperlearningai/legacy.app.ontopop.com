/* eslint max-len:0 */
/* eslint jsx-a11y/no-static-element-interactions: 0 */
/* eslint jsx-a11y/click-events-have-key-events: 0 */
import Link from 'next/link'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  BiMenu
} from 'react-icons/bi'
import { Button } from 'primereact/button'
import logo from '../assets/images/logo.png'
import { APP_NAME } from '../constants/app'
import { NAVBAR } from '../constants/homepage'
import { ROUTE_INDEX } from '../constants/routes'

const IndexNavbar = () => {
  const { t } = useTranslation()
  const router = useRouter()

  const [isSidebarOpen, toggleSidebar] = useState(false)

  return (
    <>
      <nav className="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between navbar-expand-lg bg-white shadow website-navbar">
        <div className="container mx-auto flex items-center justify-between">
          <Link href={`${ROUTE_INDEX}#top`}>
            <a
              className="text-blueGray-700 text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
            >
              <img
                src={logo}
                alt={APP_NAME}
                className="h-16"
              />
            </a>
          </Link>

          <div
            className="website-navbar-items flex"
          >
            {
              NAVBAR.map((nav) => (
                <Link
                  key={`nav-${nav}`}
                  href={`${ROUTE_INDEX}#${nav}`}
                >
                  <a
                    className={`p-link ${router.asPath.includes(nav) ? 'p-link-selected' : ''}`}
                  >
                    {t(nav)}
                  </a>
                </Link>
              ))
            }
          </div>

          <Button
            aria-label={t('toggleSidebar')}
            className="website-navbar-sidebar"
            onClick={() => toggleSidebar(!isSidebarOpen)}
          >
            <BiMenu />
          </Button>
        </div>
      </nav>
      {
        isSidebarOpen && (
          <aside className="website-sidebar">
            {
              NAVBAR.map((nav) => (
                <Link
                  key={`nav-${nav}`}
                  href={`${ROUTE_INDEX}#${nav}`}
                >
                  <a
                    className={`website-sidebar-link ${router.asPath.includes(nav) ? 'website-sidebar-link-selected' : ''}`}
                    onClick={() => toggleSidebar(false)}
                  >
                    <i className="pi pi-arrow-left" />
                    {t(nav)}
                  </a>
                </Link>
              ))
            }
          </aside>
        )
      }
    </>
  )
}

export default IndexNavbar

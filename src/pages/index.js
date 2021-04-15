/* eslint security/detect-non-literal-fs-filename:0 */
import { useTranslation } from 'react-i18next'
import { connect } from 'redux-zero/react'
import PropTypes from 'prop-types'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { SplitButton } from 'primereact/splitbutton'
import { useRouter } from 'next/router'
import HeadTags from '../components/HeadTags'
import actions from '../store/actions'
import logo from '../assets/images/logo.svg'
import { APP_NAME } from '../constants/app'
import { version } from '../../package.json'
import { ROUTE_SEARCH } from '../constants/routes'

const Index = ({
  user,
}) => {
  const { t } = useTranslation()

  const router = useRouter()

  const ontologies = [{
    name: 'Highways England Ontology',
    description: 'A record of the entities that Highways England hold data for, and how those entities relate to one another.',
    owner: {
      name: 'Highways England',
      url: 'https://highwaysengland.co.uk/'
    },
    actions: {
      open: ROUTE_SEARCH,
      openInWebProtege: 'https://webprotege.stanford.edu/#projects/0b3be685-73bd-4d5a-b866-e70d0ac7169b/edit/Classes'
    }
  }]

  const ownerTemplate = ({ owner }) => (
    owner.url ? (
      <a
        className="p-link"
        href={owner.url}
        target="_blank"
        rel="nofollow noreferrer noopener"
      >
        {owner.name}
      </a>
    ) : <span>{owner.name}</span>
  )

  const actionsTemplate = ({ actions: btnActions }) => {
    const items = Object.entries(btnActions).map(([label, url]) => {
      const command = label === 'open'
        ? () => router.push(url)
        : () => {
          const win = window.open(url, '_blank')
          win.focus()
        }

      const icon = label === 'open' ? 'pi pi-share-alt' : 'pi pi-globe'

      return ({
        label: t(label),
        icon,
        command
      })
    })

    return (
      <div>
        <SplitButton label={t('open')} model={items} />
      </div>
    )
  }

  return (
    <>
      <HeadTags
        title=""
        description={t('ontologyVisualisationDescription')}
      />

      {
        (user.email !== ''
        || user.isGuest) && (
          <>
            <header className="listing-logo p-d-flex p-jc-center p-ai-center">
              <img
                src={logo}
                alt="Highways England"
              />
              <span className="logo-name bold m-l-10">
                {
                    APP_NAME
                  }
              </span>
            </header>
            <main className="listing">
              <div className="listing-table-wrapper">
                <DataTable
                  header={t('availableOntologies')}
                  filter
                  sortable
                  className="p-datatable-responsive p-datatable-striped"
                  value={ontologies}
                >
                  <Column field="name" header={t('name')} clasSName="bold" />
                  <Column field="description" header={t('description')} />
                  <Column
                    field="owner"
                    header={t('owner')}
                    body={ownerTemplate}
                  />
                  <Column
                    field="actions"
                    header={t('actions')}
                    body={actionsTemplate}
                  />
                </DataTable>
              </div>

            </main>

            <footer className="listing-footer">
              {`Ontology Visualisation v${version}`}
            </footer>
          </>
        )
      }

    </>
  )
}

Index.propTypes = {
  user: PropTypes.shape().isRequired
}

const mapPropsToState = ({
  user
}) => ({
  user
})

export default connect(
  mapPropsToState,
  actions
)(Index)

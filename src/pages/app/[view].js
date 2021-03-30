import PropTypes from 'prop-types'
import ViewWrapper from '../../components/ViewWrapper'

const View = ({
  view
}) => <ViewWrapper view={view} />

View.propTypes = {
  view: PropTypes.string.isRequired,
}

View.getInitialProps = (context) => {
  const { view } = context.query

  return { view }
}

export default View

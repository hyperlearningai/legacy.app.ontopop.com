/* eslint react/no-danger:0 */
import Head from 'next/head'
import PropTypes from 'prop-types'
import { APP_NAME } from '../constants/app'

const HeadTags = ({
  title,
  description
}) => (
  <Head>
    <title>
      {`${APP_NAME}${title ? ` - ${title}` : ''}`}
    </title>
    <meta name="description" content={`${description}`} />
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
)

HeadTags.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

HeadTags.defaultProps = {
  title: undefined,
  description: undefined
}

export default HeadTags

import React from 'react'
import { version } from '../../package.json'

const FooterComponent = () => (
  <footer>
    <div className="footer-right">
      {`Ontology Visualisation v${version}`}
    </div>
  </footer>
)

export default FooterComponent

import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgeInfoDetailsRow from '../../components/EdgeInfoDetailsRow'

const setup = () => {
  const props = {
    availableNodesNormalised: {
      abc: {
        id: 'abc',
        label: 'label',
        rdfAbout: 'rdfAbout',
        skosComment: 'skosComment',
        skosDefinition: 'skosDefinition',
        skosExample: 'skosExample'
      },
      cde: {
        id: 'cde',
        label: 'label2',
        rdfAbout: 'rdfAbout',
        skosComment: 'skosComment',
        skosDefinition: 'skosDefinition',
        skosExample: 'skosExample'
      }
    },
    connection: {
      from: 'abc',
      fromLabel: 'label',
      to: 'cde',
      toLabel: 'label2',
    },
  }

  const component = shallow(<EdgeInfoDetailsRow {...props} />)

  return {
    component,
    props
  }
}

describe('EdgeInfoDetailsRow', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

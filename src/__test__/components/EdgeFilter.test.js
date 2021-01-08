import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgeFilter from '../../components/EdgeFilter'
import jsonObjectProperties from '../../assets/json/test-ontology-object-properties.json'

const setup = () => {
  const props = {
    edgesToIgnore: [],
    objectPropertiesFromApi: jsonObjectProperties,
    setStoreState: jest.fn(),
    edgeFilter: 'ac'
  }

  const component = shallow(<EdgeFilter {...props} />)

  return {
    component,
    props
  }
}

describe('EdgeFilter', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

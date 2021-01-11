import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgeInfoDetails from '../../components/EdgeInfoDetails'

const setup = () => {
  const props = {
    edgeId: 'abc',
    objectPropertiesFromApi: {
      OwlObjectProperties: {
        abc: {
          id: 'abc',
          rdfsLabel: 'label',
        }
      }
    },
    edgesConnections: [{
      from: 'abc',
      fromLabel: 'label',
      to: 'cde',
      toLabel: 'label2',
    }],
  }

  const component = shallow(<EdgeInfoDetails {...props} />)

  return {
    component,
    props
  }
}

describe('EdgeInfoDetails', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

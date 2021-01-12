import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import EdgeInfo from '../../components/EdgeInfo'

const setup = () => {
  const props = {
    objectPropertiesFromApi: {
      OwlObjectProperties: {
        abc: {
          id: 'abc',
          rdfsLabel: 'label',
        }
      }
    },
    selectedEdges: ['abc'],
    removeFromArray: jest.fn(),
  }

  const component = shallow(<EdgeInfo {...props} />)

  return {
    component,
    props
  }
}

describe('EdgeInfo', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

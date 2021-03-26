import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import SynonymsListAddNew from '../../components/SynonymsListAddNew'

const setup = () => {
  const props = {
    synonymElementId: '12',
    updateStoreValue: jest.fn(),
  }

  const component = shallow(<SynonymsListAddNew {...props} />)

  return {
    component,
    props
  }
}

describe('SynonymsListAddNew', () => {
  it('should match snapshot', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

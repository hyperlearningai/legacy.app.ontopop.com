import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ViewWrapper from '../../components/ViewWrapper'
import { SIDEBAR_VIEW_BOUNDING_BOX } from '../../constants/views'

const setup = () => {
  const props = {
    user: {
      isGuest: false,
      email: 'a@b.c',
      token: '123'
    },
    updateStoreValue: jest.fn(),
    view: SIDEBAR_VIEW_BOUNDING_BOX
  }
  const component = shallow(<ViewWrapper {...props} />)

  return {
    component
  }
}

describe('View page', () => {
  it('should match snapshot', () => {
    const { component } = setup()
    expect(toJson(component)).toMatchSnapshot()
  })
})

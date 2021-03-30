import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import View from '../../../pages/app/[view]'
import { SIDEBAR_VIEW_ENTRY_SEARCH } from '../../../constants/views'

const setup = () => {
  const props = {
    view: SIDEBAR_VIEW_ENTRY_SEARCH
  }
  const component = shallow(<View {...props} />)

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

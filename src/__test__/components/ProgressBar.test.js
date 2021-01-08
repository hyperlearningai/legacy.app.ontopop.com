import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import ProgressBar from '../../components/ProgressBar'

const setup = () => {
  const props = {
    progress: 10
  }

  const component = shallow(<ProgressBar {...props} />)

  return {
    component,
    props
  }
}

describe('ProgressBar', () => {
  it('should match snapshot ', () => {
    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

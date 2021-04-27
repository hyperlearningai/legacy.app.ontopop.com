import React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { useRouter } from 'next/router'
import IndexNavbar from '../../components/IndexNavbar'
import { ROUTE_INDEX } from '../../constants/routes'

jest.mock('next/router')

const setup = () => {
  const props = { }

  const component = shallow(<IndexNavbar {...props} />)

  return {
    component,
    props
  }
}

describe('IndexNavbar', () => {
  it('should match snapshot', () => {
    useRouter.mockImplementation(() => ({
      asPath: ROUTE_INDEX
    }))

    const {
      component
    } = setup()

    expect(toJson(component)).toMatchSnapshot()
  })
})

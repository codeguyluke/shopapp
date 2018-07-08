import React from 'react'
import { shallow } from 'enzyme'
import NavigationHeader from './index'

describe('NavigationHeader', () => {
  const component  = <NavigationHeader title="Test title" rightIconName="add" />

  it('matches snapshot', () => {
    const wrapper = shallow(React.cloneElement(component, { showBack: true }))
    expect(wrapper).toMatchSnapshot()
  })
})

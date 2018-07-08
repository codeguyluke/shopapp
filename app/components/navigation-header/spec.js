import React from 'react'
import renderer from 'react-test-renderer'
import NavigationHeader from './index'

describe('NavigationHeader', () => {
  const component  = <NavigationHeader title="Test title" rightIconName="add" />

  it('matches snapshot', () => {
    const wrapper = renderer.create(React.cloneElement(component, { showBack: true }))
    const tree = wrapper.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

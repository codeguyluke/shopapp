import React from 'react'
import { shallow } from 'enzyme'
import NavigationHeader from './index'

describe('NavigationHeader', () => {
  const component = <NavigationHeader title="Test title" rightIconName="add" />

  it('matches snapshot', () => {
    const wrapper = shallow(React.cloneElement(component, { showBack: true }))
    expect(wrapper).toMatchSnapshot()
  })

  it('handles right press', () => {
    const onRightPressSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onRightPress: onRightPressSpy }))
    wrapper
      .find('Header')
      .props()
      .rightComponent.onPress()
    expect(onRightPressSpy).toHaveBeenCalledTimes(1)
  })

  it('handles back press', () => {
    const onBackPressSpy = jest.fn()
    const wrapper = shallow(
      React.cloneElement(component, { showBack: true, onBack: onBackPressSpy })
    )
    wrapper
      .find('Header')
      .props()
      .leftComponent.onPress()
    expect(onBackPressSpy).toHaveBeenCalledTimes(1)
  })
})

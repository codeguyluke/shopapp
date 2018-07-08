import React from 'react'
import { shallow } from 'enzyme'
import noop from 'lodash/noop'
import ListItem from './index'

describe('ListItem', () => {
  const itemMock = {
    id: 'abc',
    name: 'Item',
    checked: true,
  }
  const component = (
    <ListItem item={itemMock} archived={false} onUpdate={noop} onToggle={noop} onDelete={noop} />
  )

  it('matches snapshot', () => {
    const wrapper = shallow(component)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when archived', () => {
    const wrapper = shallow(React.cloneElement(component, { archived: true }))
    expect(wrapper).toMatchSnapshot()
  })

  it('toggles item', () => {
    const onToggleSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onToggle: onToggleSpy }))
    wrapper.find('CheckBox').simulate('press')
    expect(onToggleSpy).toHaveBeenCalledTimes(1)
    expect(onToggleSpy).toHaveBeenCalledWith({ id: 'abc' })
  })

  it("updates item's name", () => {
    const onUpdateSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onUpdate: onUpdateSpy }))
    wrapper.find('TextInput').simulate('changeText', 'test name')
    expect(onUpdateSpy).toHaveBeenCalledTimes(1)
    expect(onUpdateSpy).toHaveBeenCalledWith({ id: 'abc', name: 'test name' })
  })

  it("deletes item", () => {
    const onDeleteSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onDelete: onDeleteSpy }))
    wrapper.find('Button').simulate('press')
    expect(onDeleteSpy).toHaveBeenCalledTimes(1)
    expect(onDeleteSpy).toHaveBeenCalledWith({ id: 'abc' })
  })
})

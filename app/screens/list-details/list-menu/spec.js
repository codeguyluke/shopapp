import React from 'react'
import { shallow } from 'enzyme'
import noop from 'lodash/noop'
import ListMenu, { FADE_DURATION } from './index'

describe('ListMenu', () => {
  const component = (
    <ListMenu
      show
      archived={false}
      onClose={noop}
      onArchivePress={noop}
      onTitleChange={noop}
      listTitle="title"
    />
  )

  it('matches snapshot', () => {
    const wrapper = shallow(component)
    expect(wrapper).toMatchSnapshot()
  })

  it('matches snapshot when archived', () => {
    const wrapper = shallow(React.cloneElement(component, { archived: true }))
    wrapper.setState({ showModal: true })
    expect(wrapper).toMatchSnapshot()
  })

  it('handles title change', () => {
    const onTitleChangeSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onTitleChange: onTitleChangeSpy }))
    wrapper.setState({ showModal: true })
    
    wrapper.find('FormInput').simulate('changeText', 'test title')
    expect(onTitleChangeSpy).toHaveBeenCalledTimes(1)
    expect(onTitleChangeSpy).toHaveBeenCalledWith('test title')
  })

  it('handles archive press', () => {
    const onArchivePressSpy = jest.fn()
    const wrapper = shallow(React.cloneElement(component, { onArchivePress: onArchivePressSpy }))
    wrapper.setState({ showModal: true })
    
    wrapper.find('Button').at(1).simulate('press')
    expect(onArchivePressSpy).toHaveBeenCalledTimes(1)
  })

  it('toggled showModal state', () => {
    const wrapper = shallow(component)
    expect(wrapper.state().showModal).toBe(false)
    wrapper.instance().toggleModal()
    expect(wrapper.state().showModal).toBe(true)
  })

  it('handles animate out when all refs set', async () => {
    const onCloseSpy = jest.fn()
    const viewRefMock = {
      bounceOutDown: jest.fn(() => Promise.resolve()),
    }
    const blurRefMock = {
      fadeOut: jest.fn(() => Promise.resolve()),
    }

    const wrapper = shallow(React.cloneElement(component, { onClose: onCloseSpy }))
    wrapper.instance().setViewRef(viewRefMock)
    wrapper.instance().setBlurRef(blurRefMock)
    await await wrapper.instance().animateOut()

    expect(viewRefMock.bounceOutDown).toHaveBeenCalledTimes(1)
    expect(blurRefMock.fadeOut).toHaveBeenCalledTimes(1)
    expect(blurRefMock.fadeOut).toHaveBeenCalledWith(FADE_DURATION)
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
  })

  it('handles animate out when view ref not set', async () => {
    const onCloseSpy = jest.fn()
    const viewRefMock = {
      bounceOutDown: jest.fn(() => Promise.resolve()),
    }

    const wrapper = shallow(React.cloneElement(component, { onClose: onCloseSpy }))
    await await wrapper.instance().animateOut()
    expect(viewRefMock.bounceOutDown).not.toHaveBeenCalled()
  })

  it('handles animate out when blur ref not set', async () => {
    const onCloseSpy = jest.fn()
    const viewRefMock = {
      bounceOutDown: jest.fn(() => Promise.resolve()),
    }
    const blurRefMock = {
      fadeOut: jest.fn(() => Promise.resolve()),
    }

    const wrapper = shallow(React.cloneElement(component, { onClose: onCloseSpy }))
    wrapper.instance().setViewRef(viewRefMock)
    await await wrapper.instance().animateOut()

    expect(viewRefMock.bounceOutDown).toHaveBeenCalledTimes(1)
    expect(onCloseSpy).toHaveBeenCalledTimes(1)
    expect(blurRefMock.fadeOut).not.toHaveBeenCalled()
  })

  it('returns null when show is false', () => {
    const wrapper = shallow(React.cloneElement(component, { show: false }))
    expect(wrapper.type()).toEqual(null)
  })
})

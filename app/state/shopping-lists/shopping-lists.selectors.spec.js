import { STORE_NAME } from './shopping-lists.reducer'
import selectors from './shopping-lists.selectors'

describe('shopping lists selectors', () => {
  const stateMock = {
    [STORE_NAME]: {
      abc: {
        id: 'abc',
        archived: true,
      },
      def: {
        id: 'def',
        archived: false,
      },
      ghi: {
        id: 'ghi',
        archived: true,
      },
      jkl: {
        id: 'jkl',
        archived: false,
      },
    },
  }

  it('selects current lists', () => {
    const expectedOutput = {
      def: {
        id: 'def',
        archived: false,
      },
      jkl: {
        id: 'jkl',
        archived: false,
      },
    }
    expect(selectors.selectCurrentLists(stateMock)).toEqual(expectedOutput)
  })

  it('selects archived lists', () => {
    const expectedOutput = {
      abc: {
        id: 'abc',
        archived: true,
      },
      ghi: {
        id: 'ghi',
        archived: true,
      },
    }
    expect(selectors.selectArchivedLists(stateMock)).toEqual(expectedOutput)
  })
})

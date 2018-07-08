import { createSelector } from 'reselect'
import { STORE_NAME } from './shopping-lists.reducer'

const selectAllLists = state => state[STORE_NAME]

const getCurrentLists = allShoppingLists => {
  let currentLists = {}
  Object.keys(allShoppingLists).forEach(key => {
    if (!allShoppingLists[key].archived) {
      currentLists = { ...currentLists, [key]: allShoppingLists[key] }
    }
  })
  return currentLists
}
const getArchivedLists = allShoppingLists => {
  let archivedLists = {}
  Object.keys(allShoppingLists).forEach(key => {
    if (allShoppingLists[key].archived) {
      archivedLists = { ...archivedLists, [key]: allShoppingLists[key] }
    }
  })
  return archivedLists
}

const selectCurrentLists = createSelector(selectAllLists, getCurrentLists )
const selectArchivedLists = createSelector(selectAllLists, getArchivedLists)

export default {
  selectCurrentLists,
  selectArchivedLists,
}

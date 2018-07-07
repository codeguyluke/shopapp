/**
 * Types definitions
 */

const CREATE_SHOPPING_LIST = 'CREATE_SHOPPING_LIST'

export const types = {
  CREATE_SHOPPING_LIST,
}

/**
 * Actions
 */

const createShoppingList = payload => ({
  type: CREATE_SHOPPING_LIST,
  payload,
})

export default {
  createShoppingList,
}

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

const createShoppingList = ({ id }) => ({
  type: CREATE_SHOPPING_LIST,
  payload: { id },
})

export default {
  createShoppingList,
}

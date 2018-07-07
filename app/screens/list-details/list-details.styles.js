import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  listContainer: {
    marginTop: 0,
    marginBottom: 16,
    borderBottomWidth: 0,
    borderColor: 'lightgrey',
  },
  listItemContainer: {
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
  },
  listItemTextInputContainer: {
    flex: 1,
    paddingHorizontal: 8,
  },
  listItemTextInput: {
    fontFamily: 'Hind-Medium',
    fontSize: 16,
    color: 'midnightblue',
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
    backgroundColor: 'transparent',
    borderColor: 'lightgrey',
    borderWidth: 1,
    width: '100%',
  },
  buttonText: {
    marginTop: 2,
  },
})

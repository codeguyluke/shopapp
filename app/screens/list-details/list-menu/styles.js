import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  blurContent: {
    flex: 1,
  },
  modalContainer: {
    position: 'absolute',
    height: '80%',
    left: 16,
    right: 16,
    bottom: 0,
  },
  closeButtonContainer: {
    marginRight: 0,
  },
  closeButton: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    marginBottom: 16,
    padding: 0,
    paddingRight: 0,
    paddingLeft: 4,
    alignSelf: 'flex-end',
  },
  modalContent: {
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  formLabel: {
    color: 'darkslategrey',
  },
  formInput: {
    fontFamily: 'Hind-Medium',
    fontSize: 18,
    color: 'darkslategrey',
  },
  archiveButton: {
    marginTop: 32,
  },
  archiveButtonText: {
    fontFamily: 'Hind-Medium',
  },
})

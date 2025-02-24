import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 25,
    paddingHorizontal: 40,
    backgroundColor: "#8257e5"
  },

  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },

  title: {
    fontFamily: 'Archivo_700Bold',
    color: 'white',
    fontSize: 24,
    lineHeight: 32,
    maxWidth: 160,
    marginVertical: 40
  },

  logoImg: {
    width: 45,
    height: 45
  }
})

export default styles
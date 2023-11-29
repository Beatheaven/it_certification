import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    paddingBottom: 40
  },
  section: {
    marginLeft: 40,
    marginRight: 40,
    marginBottom: 10,
    textAlign: 'center'
  },
  title: {
    color: '#171A1C',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10
  },
  body: {
    color: 'black',
    fontSize: 16
  },
  message: {
    color: '#00529C',
    fontSize: 22,
    fontWeight: 'bold',
    margin: '10 0'
  },
  category: {
    color: '#00529C',
    fontSize: 36,
    fontWeight: 'bold'
  },
  notes: {
    color: '',
    fontSize: 10
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: '8 0'
  },
  row: {
    flexDirection: 'row'
  },
  col: {
    padding: '0 10'
  },
  colLeft: {
    flex: '1 1 60%'
  },
  colRight: {
    flex: '1 1 40%'
  }
});

export default styles;

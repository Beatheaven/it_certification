import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  item: {
    display: 'flex'
  },
  list: {
    textAlign: 'left',
    marginBottom: 10,
    marginLeft: 20,
    fontSize: 11
  },
  bullet: {
    position: 'absolute',
    display: 'block',
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'black'
  },
  bulletActive: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    marginLeft: 2,
    marginTop: 2,
    backgroundColor: 'black'
  }
});

export default styles;

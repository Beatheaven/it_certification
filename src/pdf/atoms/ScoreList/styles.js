import { StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 2
  },
  no: {
    width: 20,
    height: 20,
    borderRadius: 10,
    fontSize: 12,
    marginRight: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center'
  },
  right: {
    textAlign: 'right'
  },
  left: {
    textAlign: 'left'
  },
  legend: {
    textAlign: 'left',
    fontSize: 12,
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row'
  },
  label: {
    flexWrap: 'wrap',
    width: '100%'
  },
  score: {
    width: 60,
    textAlign: 'right',
    marginLeft: 'auto'
  },
  low: {
    color: '#E93C3C'
  },
  high: {
    color: '#1AB759'
  }
});

export default styles;

import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  headerText: {
    color: '#5234ea',
    fontSize: 40,
    fontWeight: '800',
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  calculateButton: {
    backgroundColor: '#eece7b',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  calculateButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  winLikehoodState: {
    color: '#5234ea',
    fontSize: 20,
    fontWeight: '600',
    fontStyle: 'italic',
    marginRight: 20,
  },
});

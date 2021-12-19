import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {},
  title: {
    paddingVertical: 10,
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    // paddingRight: 10,
    flex: 1,
  },
  right: {
    paddingRight: 10,
  },
});
export default styles;

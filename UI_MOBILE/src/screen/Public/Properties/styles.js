
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {

  propertyContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 20,
    backgroundColor: COLOR.primary,
    borderRadius: 5,
    elevation: 10,
    shadowOffset: {
      width: 15,
      height: 15
    },
    shadowColor: "grey",
    shadowOpacity: 0.1,
    shadowRadius: 0,
  },
  propertyImg: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  propertyFavorite: {
    position: 'absolute',
    alignSelf: 'flex-end',
    color: COLOR.primary,
    marginTop: 10,
    paddingRight: 10,
  },
  propertyPrice: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.compact,
    color: COLOR.dark,
    paddingHorizontal: 20
  },
  propertyLocation: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.smokeLight,
    marginBottom: 10,
    paddingHorizontal: 20
  },
  propertyContent: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 15
  },
  propertyOverview: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems:'center'
  },
  propertyIcon: {
    fontSize: SIZE.large,
    color: COLOR.light,
    marginHorizontal: 5
  },
  propertyNo: {
    marginRight: 5,
    fontFamily: FAMILY.bold,
    fontSize: SIZE.medium,
    color: COLOR.dark,
    marginTop: 5
  },
  footerTab: {
    backgroundColor: COLOR.primary,
    borderTopWidth: 0.5,
    borderColor: '#DDD',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15
  },
  bgFilter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterIcon: {
    color: COLOR.smokeLight,
    fontFamily: 'Montserrat-Regular'
  },
  filterText: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.dark,
    marginLeft: 10,
    textTransform: 'uppercase'
  },
}
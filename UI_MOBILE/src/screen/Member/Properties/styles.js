
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {
  propertyContainer: {
    flex: 1,
    width: '90%',
    marginHorizontal: '5%',
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
    shadowRadius: 0
  },
  propertyImg: {
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  propertyImgBg: {
    position: 'absolute',
    marginBottom: 10,
    width: '100%',
    height: 200,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    opacity: 0.1,
    backgroundColor: COLOR.dark,
  },
  propertyFavorite: {
    position: 'absolute',
    alignSelf: 'flex-end',
    fontSize: SIZE.huge,
    color: '#309224',
    marginTop: 10,
    paddingRight: 10
  },
  propertyPrice: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.compact,
    color: COLOR.black
  },
  propertyLocation: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.tiny,
    color: COLOR.black,
    marginBottom: 10
  },
  propertyContent: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderColor: '#e7e7e7'
  },
  propertyRowIcon: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingBottom: 5,
    marginBottom: 15,
  },
  propertyLeft: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  propertyRight: {
    flexGrow: 1,
    alignpropertys: 'flex-end'
  },
  propertyOverview: {
    flexGrow: 1,
    flexDirection: 'row'
  },
  propertyOverviewIcon: {
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  propertyIcon: {
    fontSize: SIZE.huge,
    marginRight: 5,
    marginTop: 5,
    color: COLOR.light,
  },
  propertyLeftIcon: {
    fontSize: SIZE.huge,
    color: COLOR.light,
    marginRight: 5
  },
  propertyNo: {
    fontFamily: FAMILY.bold,
    fontSize:SIZE.medium,
    color: COLOR.dark,
    marginRight: 5,
    marginTop: 5
  },
  propertyDate: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.tiny,
    color: COLOR.black,
    textAlign: 'right'
  },
  propertyText: {
    fontFamily: FAMILY.bold,
    color: COLOR.black,
    fontSize: 12,
    marginRight: 5,
    marginTop: 5
  },
  propertyBtn: {
    flexDirection: 'row',
    backgroundColor: COLOR.primary,
    color: COLOR.dark,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    marginRight: 10
  }

}
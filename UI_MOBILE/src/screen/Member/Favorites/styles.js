
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {
  
 
  favoriteContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: COLOR.smokeDark,
    marginLeft: 0,
    paddingVertical: 15,
    paddingHorizontal: 15,
    justifyContent: 'center'
  },
  recordLast: {
    flexDirection: 'row',
    borderBottomWidth: 0,
    marginLeft: 0,
    paddingVertical: 15
  },
  favoriteImg: {
    width: 100,
    height: 68,
    borderRadius: 5
  },
  favoriteInfo: {
    flex: 1,
    paddingHorizontal: 15
  },
  favoritePrice: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.Medium,
    color: COLOR.dark,
    marginBottom: 0
  },
  favoriteLocation: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.tiny,
    color: COLOR.grey,
    marginBottom: 5,
    lineHeight: 16
  },
  favoriteContent: {
    flexDirection: 'row'
  },
  favoriteOverview: {
    flexGrow: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  trash: {
    justifyContent: 'center'
  },
  favoriteIcon: {
    fontSize: SIZE.large,
    color: COLOR.default,
    marginRight: 5
  },
  favoriteNo: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark,
    marginRight: 5,
    marginTop: 5
  },
  crv: {
    borderRadius: 8
  }
}
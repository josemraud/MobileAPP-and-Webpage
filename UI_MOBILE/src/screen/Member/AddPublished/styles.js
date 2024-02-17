
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {
 /* Publish */
 publish: {
  flex: 1,
  paddingHorizontal: 20,
  paddingVertical: 20,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 50
},
publishIcon: {
  alignSelf: 'center',
  fontSize: 120,
  color: '#309224',
  marginBottom: 10
},
publishTitle: {
  fontFamily: FAMILY.regular,
  fontSize: SIZE.large,
  color: '#309224',
  marginBottom: 10
},
publishDesc: {
  fontFamily: FAMILY.regular,
  fontSize: SIZE.medium,
  color: COLOR.grey
},
publishPreview: {
  flex: 1,
  paddingVertical: 30
},
publishBtn: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ee8923s',
  borderRadius: 5,
  paddingHorizontal: 20,
  paddingVertical: 10
},
publishBtnIcon: {
  color: COLOR.light
},
publishBtnText: {
  fontFamily: FAMILY.bold,
  fontSize: SIZE.medium,
  color: COLOR.light,
  marginLeft: 10
},
}

import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {
  coverImg: {
    flex: 1,
    height: 200
  },
  bgBlue: {
    width: '100%',
    flex: 1,
    height: 200,
    backgroundColor: COLOR.primary,
    position: 'absolute',
    opacity: 1
  },
  setting: {
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute'
  },
  settingImg: {
    width: 100,
    height: 100
  },
  settingInfo: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  settingText: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.large,
    color: COLOR.light,
    marginTop: 20,
    marginBottom: 5
  },
  settingLocation: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.light,
    opacity: 0.7
  },
  settingBg: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formBg: {
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 30
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    flex:1,
    fontFamily: FAMILY.regular,
    borderBottomWidth: 1,
    borderColor: COLOR.smoke,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: SIZE.small,
    width: '100%',
    borderRadius: 5,
    textAlignVertical: 'top',
    color: COLOR.grey
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ee8923',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20,
    fontSize: SIZE.small
  },
  formBtnText: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark,
    textTransform: 'uppercase'
  },
  formBtnIcon: {
    fontSize: 24,
    color: COLOR.dark
  },
  accordion: {
    width: '100%'
  },
  accordionTab: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 1,
  },
  accordionTabText: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark
  },
  accordionTabIcon: {
    fontSize: SIZE.medium,
    color: COLOR.grey
  },
  accordionContent: {
    paddingVertical: 10
  },
  notify: {
    backgroundColor: '#f0f0f0',
    color: COLOR.primary,
    borderColor: COLOR.primary,
    borderRadius: 5
  },
  notifyContent: {
    flexDirection: 'row',
    paddingVertical: 15
  },
  notifyChecked: {
    backgroundColor: COLOR.primary,
    borderColor: COLOR.primary,
    borderRadius: 5
  },
  notifyText: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.grey,
    marginLeft: 20
  },
}
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require('react-native')
const { Platform } = React

export default {

  /* Layout */
  layout: {
    flexGrow: 1,
  },
  layoutFx: {
    flex: 1,
  },
  layoutFxCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  layoutFxBot: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },

  /* Header */
  nav: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -15,
    marginRight: -15
  },
  navTransparent: {
    flex: 1,
    flexDirection: 'row',
    marginLeft: -15,
    marginRight: -15,
    backgroundColor: 'transparent'
  },
  navLeft: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navMiddle: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navRight: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  navRightIcon: {
    fontSize: SIZE.large,
    color: COLOR.light
  },
  /* Avatar Sizes */
  avatarTiny: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2
  },
  avatarSmall: {
    width: 64,
    height: 64,
    borderRadius: 64 / 2
  },
  avatarMedium: {
    width: 128,
    height: 128,
    borderRadius: 125 / 2
  },
  imgResponsive: {
    width: '100%',
    minHeight: 1
  },

  row: {
    flexDirection: 'row'
  },

  /* Label, TextInput, Picker, Placeholder */
  label: {

  },
  textInput: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  textInputMulti: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  picker: {

  },
  placeholder: {

  },

  /* Button */
  btnPrimary: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLOR.primary
  },
  btnDefault: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLOR.default
  },
  btnTransparent: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'transparent'
  },
  btnWarning: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  btnWarningText: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  btnDanger: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },
  btnSuccess: {
    paddingHorizontal: 15,
    paddingVertical: 15
  },

  headerLight: {
    backgroundColor: COLOR.primary
  },
  headerDark: {
    backgroundColor: COLOR.default
  },
  headerTransparent: {
    backgroundColor: 'transparent'
  },

  /* Colors */
  dark: {
    color: COLOR.dark
  },
  light: {
    color: COLOR.light
  },
  bgDark: {
    backgroundColor: COLOR.dark
  },
  bgLight: {
    backgroundColor: COLOR.light
  },
  default: {
    color: COLOR.default
  },
  grisesito: {
    color: '#adadad'
  },

  /* Sizes */
  tiny: {
    fontSize: SIZE.tiny
  },
  small: {
    fontSize: SIZE.small
  },
  medium: {
    fontSize: SIZE.medium,
    fontFamily: FAMILY.regular,
    textTransform: 'uppercase'
  },
  compact: {
    fontSize: SIZE.compact
  },
  large: {
    fontSize: SIZE.large
  },
  huge: {
    fontSize: SIZE.huge
  },
  higantic: {
    fontSize: SIZE.higantic
  },
  regular: {
    fontFamily: FAMILY.regular
  },
  bold: {
    fontFamily: FAMILY.bold
  },

  /* Footer */
  footer: {
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: COLOR.smoke,
    paddingVertical: 10
  },
  fBtn: {
    flex: 1,
    alignItems: 'center',
  },
  fBtnActive: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ee8923'
  },
  iconFtabActive: {
    fontSize: SIZE.huge,
    color: '#ee8923'
  },
  fBtnIcon: {
    fontSize: SIZE.huge,
    color: COLOR.grey,
    paddingBottom: 5
  },
  iconFtabBgActive: {
    fontSize: 24,
    color: COLOR.light,
    alignItems: 'center',
    textAlign: 'center',
    paddingTop: 5,
    borderRadius: 18,
    width: 36,
    height: 36,
    backgroundColor: '#ee8923'
  },
  fBtnBadge: {
    position: 'absolute',
    width: 20,
    height: 20,
    bordeRadius: 10,
    left: 40,
    top: -8
  },
  fBtnBadgeText: {
    color: COLOR.light
  },
}

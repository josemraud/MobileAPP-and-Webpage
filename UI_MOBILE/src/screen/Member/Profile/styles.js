
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {
  coverImg: {
    flex: 1,
    height: 200
  },
  profile: {
    flex: 1,
    height: 200
  },
  bgBlue: {
    width: '100%',
    flex: 1,
    height: 200,
    backgroundColor: COLOR.primary,
    position: 'absolute',
    opacity: 0.95
  },
  owner: {
    flex: 1,
    width: '100%',
    height: 200,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    marginBottom: 50
  },
  ownerAvatarImg: {
    borderRadius: 40,
    width: 80,
    height: 80
  },
  ownerInfo: {
    alignItems: 'center'
  },
  ownerName: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.large,
    color: COLOR.light,
    marginTop: 20,
    marginBottom: 5
  },
  ownerLocation: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.light,
    opacity: 0.7,
    marginBottom: 20
  },
  ownerBg: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  profleEdit: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    bottom: 0
  },
  formBg: {
    width: '100%',
    paddingHorizontal: 15,
    paddingTop: 30,
    paddingBottom: 30
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  textInput: {
    fontFamily: FAMILY.regular,
    borderBottomWidth: 1,
    borderColor: COLOR.smokeDark,
    fontSize: SIZE.small,
    width: '100%',
    borderRadius: 5,
    textAlignVertical: 'top',
    paddingVertical: 15,
    paddingHorizontal: 20,
    color: COLOR.grey
  },
  textInputMulti: {
    fontFamily: FAMILY.regular,
    borderBottomWidth: 1,
    borderColor: COLOR.smokeDark,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: SIZE.small,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        height: 100,
        paddingTop: 20,
      },
      android: {
        textAlignVertical: 'top',
      },
    }),
  },
  textInputHalf: {
    fontFamily: FAMILY.regular,
    borderBottomWidth: 1,
    borderColor: '#DDD',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: SIZE.small,
    width: '48.5%',
    marginBottom: 10,
    borderRadius: 5,
    color: COLOR.grey
  },
  btn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 5,
    alignItems:'center',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 20
  },
  btnText: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.medium,
    color: COLOR.dark,
    alignSelf: 'center'
  },
  formBtnText: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark,
    textTransform: 'uppercase'
  },
  formBtnIcon: {
    fontSize: SIZE.huge,
    color: COLOR.dark,
  },
  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  formPicker: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: COLOR.smokeDark,
    paddingLeft: 15
  },
  pickerText: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.dark,
  },
  accordion: {
    width: '100%',
  },
  accordionTab: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 1
  },
  accordionTabText: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark,
  },
  accordionTabIcon: {
    fontSize: SIZE.medium,
    color: COLOR.grey
  },
  accordionContent: {
    paddingVertical: 10
  },
}
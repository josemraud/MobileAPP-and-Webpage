
import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;
export default {
  propertyContent: {
    flexDirection: 'row',
    borderRadius: 5,
    borderColor: COLOR.light,
    borderWidth: 1
  },
  container: {
    flex: 0,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 0,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    marginLeft: 5,
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: "#a0a0a0"
  },  
  labellink: {
    marginLeft: 5,
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: "blue"
  },
  information: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLOR.primary,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  tabActive: {
    flex: 1,
    backgroundColor: COLOR.light,
    borderRadius: 3,
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 5
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 12,
    marginHorizontal: 5
  },
  tabTextActive: {
    textAlign: 'center',
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark
  },
  tabTextInactive: {
    textAlign: 'center',
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.light
  },
  /* OverView */
  section: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  row: {
    marginBottom: 20
  },
  propertyDetails: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    width: '48%'
  },
  bgGrey: {
    backgroundColor: COLOR.smoke,
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 0
  },
  propertyType: {
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  header: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.grey,
    marginBottom: 8
  },
  textInput: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.dark,
    backgroundColor: COLOR.smoke,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlignVertical: 'top'
  },
  textInputMulti: {
    fontFamily: FAMILY.regular,
    borderBottomWidth: 0,
    borderColor: COLOR.dark,
    backgroundColor: COLOR.smoke,
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
  noBg: {
    flex: 1,
    borderWidth: 1,
    borderColor: COLOR.light,
    padding: 2,
    borderRadius: 5
  },
  noBtn: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 5,
    marginRight: 2
  },
  noBtnText: {
    color: COLOR.grey,
    fontSize: SIZE.small
  },
  noBtnActive: {
    backgroundColor: COLOR.smoke,
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#de6624'
  },
  noBtnInactive: {
    backgroundColor: COLOR.smoke,
    paddingVertical: 12
  },
  noActiveText: {
    color: COLOR.grey,
    fontFamily: FAMILY.bold,
    fontSize: SIZE.medium,
  },
  noInactiveText: {
    color: COLOR.grey,
    fontFamily: 'Montserrat-SemiBold'
  },
  footerBtn: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between'
  },
  previousBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.smoke,
    color: COLOR.smoke,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5
  },
  previousTextDisabled: {
    color: COLOR.smokeLight,
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    marginLeft: 10,
    textTransform: 'uppercase'
  },
  previousIconDisabled: {
    color: COLOR.smokeLight
  },
  nextBtnActive: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#ee8923',
    color: COLOR.light,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5
  },
  nextText: {
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    color: COLOR.dark,
    marginRight: 10,
    marginTop: 5,
    textTransform: 'uppercase'
  },
  nextIcon: {
    color: COLOR.dark,
    marginLeft: 20
  },
  /* amenity */
  amenity: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  amenityItem: {
    backgroundColor: COLOR.smoke,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 1,
    borderRadius: 5,
    width: '33%'
  },
  amenityIcon: {
    marginBottom: 5
  },
  amenityText: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.tiny
  },
  /* photo */
  photoUpload: {
    marginVertical: 5,
    backgroundColor: COLOR.smoke,
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 5
  },
  photoUploadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    backgroundColor: COLOR.primary,
    borderColor: COLOR.smokeLight,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10
  },
  photoUploadIcon: {
    color: COLOR.light,
    marginBottom: 0
  },
  photoUploadText: {
    color: COLOR.light,
    fontFamily: FAMILY.bold,
    fontSize: SIZE.small,
    marginLeft: 10
  },
  photo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap'
  },
  photoItem: {
    backgroundColor: COLOR.smoke,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    borderRadius: 5,
    width: '33%'
  },
  photoIcon: {
    width: '100%',
    height: 100,
    borderRadius: 5
  },
  photoDelete: {
    position: 'absolute',
    backgroundColor: COLOR.light,
    right: 0,
    bottom: 0,
    marginRight: 10,
    marginBottom: 10,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5
  },
  photoDeleteIcon: {
    color: '#FF0000',
    fontSize: SIZE.huge,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center'
  }
}
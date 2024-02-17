import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require('react-native')
const { Platform } = React

export default {
  arrowIcon: {
    padding: 15
  },
  bg: {
    flex: 1,
    height: 20
  },
  propertyImg: {
    flex: 1,
    height: 360
  },
  propertyContainer: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20
  },
  propertyPrice: {
    fontFamily: FAMILY.bold,
    fontSize: 20,
    color: COLOR.dark
  },
  propertyLocation: {
    flexDirection: 'row'
  },
  locationIcon: {
    fontSize: 20,
    color: COLOR.smokeLight
  },
  locationInfo: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.smokeLight,
    marginTop: 3
  },
  count: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E5E7E9'
  },
  count1: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderColor: '#E5E7E9'
  },
  countCol: {
    flexDirection: 'row',
  },
  countItem: {
    flexGrow: 1,
    borderRightWidth: 1,
    borderColor: '#E5E7E9',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width:'33%'
  },
  countItem1: {
    flexGrow: 1,
    borderRightWidth: 1,
    borderColor: '#E5E7E9',
    paddingVertical: 20,
    paddingHorizontal: 10,
    width: '50%'
  },
  countFirst: {
    paddingLeft: 20
  },
  countNo: {
    fontFamily: FAMILY.bold
  },
  countText: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.smokeLight
  },
  countIcon: {
    color: '#ee8923',
    marginRight: 10,
    fontSize: SIZE.huge
  },

  /* OverView */
  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20
  },
  overviewTitle: {
    flex: 1,
    fontFamily: FAMILY.bold,
    marginBottom: 10
  },
  overviewDesc: {
    flex: 1,
    lineHeight: 20,
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.grey
  },
  /* gallery */
  gallery: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
    backgroundColor: '#f0f0f0'
  },
  galleryTitle: {
    flex: 1,
    fontFamily: FAMILY.bold,
    marginBottom: 10,
    color: COLOR.dark
  },
  galleryImg: {
    flex: 1,
    paddingTop: 10,
    paddingBottom: 50,
    backgroundColor: '#f0f0f0'
  },
  sliderImg: {
    flex: 1,
    width: 200,
    height: 150,
    marginLeft: 15,
    marginRight: 5,
    borderRadius: 5
  },
  /* amenities */
  amenities: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30
  },
  amenityTitle: {
    flex: 1,
    fontFamily: FAMILY.bold,
    marginBottom: 10,
    color: '#333'
  },
  amenity: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15
  },
  amenityIcon: {
    color: '#FCC300',
    fontSize: 24,
    marginBottom: 5
  },
  amenityItem: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.grey
  },
  /* Map */
  location: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f0f0f0'
  },
  locationTitle: {
    flex: 1,
    fontFamily: FAMILY.bold,
    marginBottom: 10,
    color: COLOR.dark
  },
  locationMap: {
    height: 300
  },
  mapCoOrdinates: {
    width: '100%',
    height: '100%'
  },
  /* Contact Agent */
  owner: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ownerTitle: {
    flex: 1,
    fontFamily: FAMILY.bold,
    marginBottom: 20,
    color: COLOR.dark
  },
  ownerAvatar: {
    borderRadius: 0,
    borderWidth: 0,
    borderColor: '#DDD',
    padding: 5,
    alignItems: 'center',
    marginBottom: 30
  },
  ownerAvatarImg: {

  },
  ownerInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  ownerName: {
    fontFamily: FAMILY.regular,
    fontSize: 16,
    color: COLOR.dark,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: 'center'
  },
  ownerLocation: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    color: COLOR.smokeLight
  },
  /* Tab */
  information: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: COLOR.smokeDark,
    borderBottomWidth: 1
  },
  tabActive: {
    flex: 1,
    borderRadius: 3,
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderColor: '#ee8923',
    borderBottomWidth: 5
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    borderRadius: 3,
    paddingVertical: 15,
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
    color: COLOR.grey
  },

  adGalleryClose: {
  },
  adGalleryCloseBtn: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  adGalleryCloseBtnIcon: {
    color: COLOR.dark,
    fontSize: SIZE.large
  },
  adGallerySlider: {
    flex: 1
  },
  boton:{
    marginTop: 50
  }

}

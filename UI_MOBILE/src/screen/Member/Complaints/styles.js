import { COLOR, FAMILY, SIZE } from '@theme/typography'

export default {

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
    color: COLOR.smoke,
    backgroundColor: COLOR.smoke,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlignVertical: 'top'
  },
  textInputMulti: {
    fontFamily: FAMILY.regular,
    borderBottomWidth: 0,
    borderColor: '#DDD',
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
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.default,
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 5
  },
  btnText: {
    fontFamily: FAMILY.bold,
    color: COLOR.dark,
    fontSize: SIZE.medium
  },
  
}

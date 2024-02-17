import { COLOR, FAMILY, SIZE } from '@theme/typography'

export default {

  /* Drawer Navigation */
  drawer: {
    flex: 1
  },

  /* Header */
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30
  },
  headerImg: {
    width: 72,
    height: 72,
    borderRadius: 72/2
  },
  headerName: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.compact,
    color: COLOR.primary,
    marginHorizontal: 20,
    marginVertical: 5
  },
  headerDesc: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.tiny,
    color: COLOR.primary,
    marginHorizontal: 20,
  },
  headerBg: {
    width: '100%'
  },

  /* Content */
  content: {
    flex: 1,
    paddingVertical: 30
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,    
    paddingVertical: 5
  },
  col: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemText: {
    flex: 1,
    alignItems: 'center',    
    marginHorizontal: 20,
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small
  },
  itemIcon: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.large
  },
  itemLabel: {
    fontFamily: FAMILY.regular,
    fontSize: SIZE.small,
    marginHorizontal: 30,
    marginVertical: 15
  }
  
}

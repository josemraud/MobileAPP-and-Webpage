import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;

export default {
    /* Property Type */
    propertyContent: {
        flexDirection: 'row',
        borderRadius: 5,
        borderColor: COLOR.light,
        borderWidth: 1
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
        fontSize: SIZE.compact,
        color: COLOR.primary
        },
        tabTextInactive: {
        textAlign: 'center',
        fontFamily: FAMILY.bold,
        fontSize: SIZE.compact,
        color: COLOR.light
        },
    logo: {
        marginVertical: 20,
    },
    /* Property Type */
    groupContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR.primary,
        paddingBottom: 20,
        paddingHorizontal: 20,
    },
    groupBg: {
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLOR.light,
        width: '70%',
    },
    groupBtn: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 1,
        borderColor: COLOR.light,
    },
    groupBtnText: {
        fontFamily: FAMILY.bold,
        color: COLOR.light,
        fontSize: SIZE.medium,
    },
    groupBtnActive: {
        backgroundColor: COLOR.light,
        paddingVertical: 8,
        paddingHorizontal: 5,
        color: COLOR.primary
    },
    groupBtnInactive: {
        backgroundColor: 'transparent',
        paddingVertical: 8,
        paddingHorizontal: 5,
    },
    groupActiveText: {
        fontFamily: FAMILY.bold,
        color: COLOR.primary,
        fontSize: SIZE.small,
    },
    groupInactiveText: {
        fontFamily: FAMILY.bold,
        color: COLOR.light,
        fontSize: SIZE.small,
    },

    /* Search */
    searchContainer: {
        backgroundColor: COLOR.primary
    },
    searchInputGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: COLOR.light,
        marginHorizontal: 15,
        marginVertical: 15,
        borderRadius: 5,
    },
    searchInput: {
        flex: 1,
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        paddingHorizontal: 15,
    },
    featuredBg: {
        flex: 1,
    },

    /* Featured Properties  */
    featuredItem: {
        width: 300,
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 10,
        shadowOffset: {
            width: 15,
            height: 15
        },
        shadowColor: '#999',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        marginTop: 10,
        marginRight: 5,
        marginLeft: 15,
        marginBottom: 30,
    },
    featuredImg: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        ...Platform.select({
            ios: {
                borderRadius: 5,
            },
        }),
    },
    featuredCrv: {
        ...Platform.select({
            ios: {
                width: '100%',
                height: 5,
                backgroundColor: '#FFF',
                bottom: 10,
                position: 'absolute',
            },
        }),
    },
    featuredContent: {
        paddingHorizontal: 15,
        marginBottom: 15
    },
    featuredPrice: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.large,
        color: COLOR.greyDark
    },
    featuredLocation: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.grey
    },
    featuredContent2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20
    },
    featureCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    featureIcon: {
        fontSize: SIZE.huge,
        color: COLOR.light
    },
    featureValue: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        marginHorizontal: 10
    },

    /* Sponsored Properties */
    sponsoredContainer: {
        paddingVertical: 30,
    },
    sponsoredHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 15
    },
    sponsoredCol: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '25%'
    },
    sponsoredTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        marginHorizontal: 10,
        textTransform: 'uppercase'
    },
    sponsoredItem: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 10,
        shadowOffset: {
            width: 15,
            height: 15
        },
        shadowColor: '#999',
        shadowOpacity: 0.1,
        shadowRadius: 0,
        marginTop: 10,
        marginBottom: 30,
    },
    sponsoredImg: {
        marginBottom: 10,
        width: '100%',
        height: 120,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        ...Platform.select({
            ios: {
                borderRadius: 5,
            },
        }),
    },
    sponsoredContent: {
        alignItems: 'center'
    },
    sponsoredContent2: {
        paddingHorizontal: 15,
        marginBottom: 15
    },
    sponsoredPrice: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.greyDark
    },
    sponsoredLocation: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.grey
    },
    sponsoredContent3: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginBottom: 20
    },
    sponsoredIcon: {
        fontSize: SIZE.large,
        color: COLOR.light
    },
    sponsoredValue: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        marginHorizontal: 10
    },
    
    /* Common Styles */
    btnMore: {
        backgroundColor: COLOR.smokeDark,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5
    },
    btnMoreText: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.tiny,
        color: COLOR.greyDark,
        textTransform: 'uppercase'
    },
    

    

}
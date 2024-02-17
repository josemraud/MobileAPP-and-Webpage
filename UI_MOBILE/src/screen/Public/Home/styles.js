import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;

export default {

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

    /* Top Destinations */
    destinationContainer: {
        backgroundColor: COLOR.smoke,
        paddingHorizontal: 15,
        paddingVertical: 30,
    },
    destinationHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20
    },
    destinationCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    destinationTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        marginHorizontal: 10,
        textTransform: 'uppercase'
    },
    destinationBtnMore: {
        backgroundColor: COLOR.smokeDark,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5
    },
    destinationBtnMoreText: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.tiny,
        color: COLOR.greyDark,
        textTransform: 'uppercase'
    },
    destinationContent: {
        flex: 1,
        marginHorizontal: -5,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'flex-start'
    },
    destinationBtn: {
        width: '48%',
        margin: '1%',
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    destinationImg: {
        width: '100%',
        height: 100,
        borderRadius: 5,

    },
    destinationOverlay: {
        width: '100%',
        height: 100,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    destinationName: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.light,
        marginBottom: 5
    },
    destinationCount: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.tiny,
        color: COLOR.light,
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
        alignItems: 'center'
    },
    sponsoredTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        marginHorizontal: 10,
        textTransform: 'uppercase'
    },
    sponsoredItem: {
        width: 240,
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


    /* Agents */
    agentContainer: {
        paddingVertical: 30,
        backgroundColor: COLOR.smoke
    },
    agentHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        paddingHorizontal: 15
    },
    agentCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    agentTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        marginHorizontal: 10,
        textTransform: 'uppercase'
    },
    agentItem: {
        width: 72,
        marginHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    agentImg: {
        width: 72,
        height: 72,
        marginBottom: 10,
        borderRadius: 72/2
    },
    agentContent: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    agentName: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.greyDark,
        textAlign: 'center'
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
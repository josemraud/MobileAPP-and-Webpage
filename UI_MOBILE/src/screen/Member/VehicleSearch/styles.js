import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;

export default {
    typeBg: {
        flex: 1,
    },
    typeBtn: {
        flex: 1,
        borderWidth: 0,
        marginHorizontal: 5,
    },
    typeBtnText: {
        fontFamily: FAMILY.regular,
        color: COLOR.dark,
        fontSize: 12
    },
    typeBtnActive: {
        backgroundColor: COLOR.default,
        paddingVertical: SIZE.small,
    },
    typeBtnInactive: {
        backgroundColor: COLOR.smoke,
        paddingVertical: SIZE.small,
    },
    typeActiveText: {
        fontFamily: FAMILY.bold,
        color: COLOR.light
    },
    typeInactiveText: {
        color: COLOR.dark,
        fontFamily: 'Montserrat-Regular'
    },
    propertyDetails: {
        marginVertical: 30,
        paddingHorizontal: 15
    },
    location: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    bed: {
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    price: {
        marginBottom: 20,
        paddingHorizontal: 15
    },
    propertyType: {
        marginBottom: 30,
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    header: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.dark,
        marginBottom: 10
    },
    headerPrice: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.dark,
        marginBottom: 10,
        paddingHorizontal: 5
    },
    textInput: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.dark,
        backgroundColor: COLOR.smoke,
        borderRadius: 5,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    propertyContent: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    add: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    addBtn: {
        color: COLOR.dark,
        backgroundColor: COLOR.smoke,
        borderRadius: 5,
        padding: 15
    },
    addText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.dark,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    addIcon: {
        color: COLOR.grey,
        fontSize: SIZE.small,
    },
    priceSelect: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small
    },
    pricePicker: {
        flex: 1,
        backgroundColor: COLOR.smoke,
        paddingLeft: 10,
        fontFamily: FAMILY.regular,
        borderRadius: 5,
        marginHorizontal: 5
    },
    searchBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        backgroundColor: '#ee8923',
        paddingVertical: 20,
        paddingHorizontal: 20
    },
    btnBg: {
        marginBottom: 20,
        paddingHorizontal: 20
    },
    searchBtnText: {
        fontFamily: FAMILY.bold,
        color: COLOR.dark,
        fontSize: SIZE.small,
        alignSelf: 'center',
        textTransform: 'uppercase'
    },
    searchBtnIcon: {
        fontFamily: FAMILY.bold,
        color: COLOR.dark,
        fontSize: SIZE.large,
        alignSelf: 'center'
    }
}
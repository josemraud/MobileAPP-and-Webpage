import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;

export default {
    bgImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    pageTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.compact,
        color: COLOR.light,
        paddingHorizontal: 20
    },
    imgLayout: {
        marginTop: 20
    },
    aboutContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    overviewTitle: {
        flex: 1,
        fontFamily: FAMILY.bold,
        marginBottom: 10
    },
    aboutText: {
        flex: 1,
        fontFamily: 'Montserrat-Regular',
        fontSize: SIZE.medium,
        color: COLOR.grey,
        lineHeight: 20
    },
}
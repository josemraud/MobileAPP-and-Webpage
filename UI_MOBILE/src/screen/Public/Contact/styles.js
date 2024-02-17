import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;

export default {
    bgImg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    pageCol: {
        marginTop: 20
    },
    contactTab: {
        paddingVertical: 20
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 30,
        borderColor: COLOR.smoke,
        borderBottomWidth: 1
    },
    contactItemLast: {
        borderBottomWidth: 0
    },
    contactIcon: {
        marginRight: 10,
        color: COLOR.light
    },
    contactHeader: {
        fontFamily: 'Montserrat-Regular',
        color: COLOR.greyDark,
        marginBottom: 5,
        fontSize: SIZE.small
    },
    contactDesc: {
        fontFamily: 'Montserrat-Regular',
        color: COLOR.grey,
        fontSize: SIZE.small
    },

}
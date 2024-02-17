import { COLOR, FAMILY, SIZE } from '@theme/typography'
import { I18nManager } from 'react-native'

const React = require("react-native");
const { Platform } = React;

export default {

    bgCover: {
        flex: 1
    },
    section: {
        width: '100%',
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    logo: {
        marginVertical: 20,
    },
    signBg: {
        width: '100%',
        backgroundColor: COLOR.primary,
        borderRadius: 8
    },
    textInput: {
        fontFamily: FAMILY.regular,
        borderBottomWidth: 1,
        borderColor: COLOR.smoke,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: SIZE.small,
        width: '100%'
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: COLOR.light,
        padding: 20,
        ...Platform.select({
            ios: {
                borderRadius: 8,
            },
        }),
    },
    btnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.dark,
        alignSelf: 'center'
    },
    loginBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.primary,
        textTransform: 'uppercase'
    },
    forgot: {
        width: '100%',
        justifyContent: 'flex-end'
    },
    btnForgot: {
        fontFamily: 'Montserrat-Regular',
        color: '#1877F2',
        paddingVertical: 15,
        textAlign: 'right',
        fontSize: 13,
    },
    loginBtnIcon: {
        color: COLOR.dark,
        fontSize: 24
    },
    login: {
        marginVertical: 30,
        alignItems: 'center'
    },
    account: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.medium,
        color: '#000'
    },
    btnLogin: {
        fontFamily: FAMILY.regular,
        color: '#1877F2',
        fontSize: SIZE.medium,
        justifyContent: 'center',
        padding: 10,
        textAlign: 'center',
        textTransform: 'uppercase'
    }
}
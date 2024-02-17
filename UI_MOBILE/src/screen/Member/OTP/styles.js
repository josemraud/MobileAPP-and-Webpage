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
        marginTop: 40
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
    textInputHalf: {
        flex: 1,
        fontFamily: FAMILY.regular,
        borderBottomWidth: 1,
        borderColor: COLOR.smoke,
        paddingHorizontal: 20,
        paddingVertical: 15,
        fontSize: SIZE.large,
        textAlign: 'center'
    },
    btn: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        backgroundColor: '#ee8923',
        padding: 20,
    },
    btnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.primary,
        alignSelf: 'center'
    },
    loginBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.dark,
        textTransform: 'uppercase'
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
        color: COLOR.light
    },
    btnLogin: {
        fontFamily: FAMILY.regular,
        color: COLOR.light,
        fontSize: SIZE.medium,
        justifyContent: 'center',
        padding: 10,
        textAlign: 'center',
        textTransform: 'uppercase'
    },

    codeContent: {
        flexDirection: 'row',
        marginVertical: 40,
        textAlign: 'center',
    },
    codeDesc: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.medium,
        color: COLOR.dark,
        marginHorizontal: 5,
        textAlign: 'center'
    },

    codeBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: '#1877F2',
    }
}
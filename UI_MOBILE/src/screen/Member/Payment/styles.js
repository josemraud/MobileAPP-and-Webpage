import { COLOR, FAMILY, SIZE } from '@theme/typography'
import { mediumaquamarine } from 'color-name';

const React = require("react-native");
const { Platform } = React;

export default {
   header: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.large,
        color: COLOR.dark,
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 20
    },
    /** -- Accordion -- **/
    accordionTab: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOR.grey,
        padding: 20,
        marginBottom: 1
    },
    accordionTabText: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.light,
        marginLeft: 15
    },
    accordionTabIconActive: {
        fontSize: SIZE.small,
        color: COLOR.light,
    },
    accordionTabIcon: {
        fontSize: SIZE.small,
        color: COLOR.light,
    },
    accordionContent: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    accordionLayout: {
        borderWidth: 1,
        borderColor: COLOR.smokeDark,
        borderRadius: 5,
        marginHorizontal: 5
    },
    accordion: {
        width: '100%',
    },
    /** -- Card -- **/
    card: {
        marginTop: 10
    },
    cardGroup: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: 15,
        borderBottomWidth: 0
    },
    cardLabel: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.greyDark,
        marginBottom: 10
    },
    cardInput: {
        width: '100%',
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        backgroundColor: COLOR.smokeDark,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    cardCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    cardCvv: {
        flex: 0.5,
        alignItems: 'center'
    },
    cardCvvIcon: {
        fontSize: SIZE.huge,
        color: COLOR.grey
    },
    cardPickerBg: {
        backgroundColor: COLOR.smokeDark,
        paddingHorizontal: 5,
        marginBottom: 15
    },
    cardPicker: {
        width: '100%',
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
    },
    makepayBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: COLOR.default,
        borderRadius: 5,
        marginVertical: 20
    },
    payBtn: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        backgroundColor: COLOR.greyDark,
        borderRadius: 5,
        margin: 20
    },
    payBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.dark
    },
    linearFooterGradient: {
        position: 'absolute',
        width: '100%',
        height: 50,
        borderRadius: 5
    },
    ftrBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 25,
        marginHorizontal: 15
    },
    ftrBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.dark,
        marginLeft: 5
    },
    /** -- Radio Group -- **/
    contactFormRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    contactForm: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    bankImg: {
        width: 64,
        height: 50
    },
    /** --Cash On Delivery -- **/
    codRow: {
        flex: 1,
        flexDirection: 'row',
        margin: 5
    },
    codCol: {
        marginLeft: 15
    },
    codText: {
        fontFamily: FAMILY.Bold,
        fontSize: SIZE.small,
        color: COLOR.greyDark,
    },
    codDesc: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.tiny,
        color: COLOR.grey,
    },
    codBtn: {
        backgroundColor: COLOR.primary,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 10
    },
    codBtnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: COLOR.light,
    },
    payment: {
        flex: 1,
        marginHorizontal: 15,
    },
    /*--Modal--*/
    mNewBox: {
        width: '90%',
        height: 350,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.03)',
        borderRadius: 5
    },
    closeBtn: {
        padding: 20
    },
    closeIcon: {
        fontSize: SIZE.huge,
        color: COLOR.grey,
        alignSelf: 'flex-end',
    },
    contactCheck: {
        marginVertical: 20
    },
    contactImg: {
        width: 90,
        height: 90,
        alignSelf: 'center'
    },
    confirmThank: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        color: COLOR.dark,
        textAlign: 'center',
        marginVertical: 10
    },
    confirmDesc: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.greyDark,
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 14,
        marginHorizontal: 20
    },
}
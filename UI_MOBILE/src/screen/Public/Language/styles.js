import { COLOR, FAMILY, SIZE } from '@theme/typography'

const React = require("react-native");
const { Platform } = React;

export default {
    langContainer: {
        paddingHorizontal: 15,
        paddingVertical: 15
    },
    langLabel: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.medium,
        color: COLOR.greyDark,
        marginBottom: 10
    },
    langPicker: {
        backgroundColor: COLOR.smokeDark,
        borderRadius: 5,
        paddingHorizontal: 10
    },
    langPickerText: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.small,
        color: COLOR.greyDark,
    },
}
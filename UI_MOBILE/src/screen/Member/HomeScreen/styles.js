
import { COLOR, FAMILY, SIZE } from '@theme/typography'
import { color } from 'react-native-reanimated';

const React = require("react-native");
const { Platform } = React;
export default {
    messageOverlay: {
    },
    curveImg: {
        flex: 1,
        width: '100%',
        height: 70
    },
    btnLayout: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
        paddingHorizontal: 20,
        paddingVertical: 5,
        marginTop: 5,
        marginBottom: 5
    },
    btnBox: {
        padding: SIZE.tiny,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderRadius: SIZE.tiny,
        width: '100%',
        marginBottom: 0
    },
    btnImg: {
        marginBottom: 1,
    },
    btnText: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.compact,
        color: COLOR.light,
        textAlign: 'center'
    },
    /* Messages */
    messageContainer: {
        width: '100%'
    },
    messageHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 20
    },
    messageCol: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    messageTitle: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.medium,
        textTransform: 'uppercase',
        marginLeft: 10
    },
    message: {
        flex: 1,
        paddingVertical: 30,
        alignItems: 'center',
        width: '100%'
    },
    messageDetail: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#DDD',
        marginLeft: 0,
        paddingVertical: SIZE.tiny,
        paddingHorizontal: 15,
        backgroundColor: '#FFF'
    },
    memberImg: {
        width: 48,
        height: 48,
        borderRadius: 50
    },
    messageInfo: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    messangerName: {
        fontFamily: FAMILY.bold,
        fontSize: SIZE.small,
        color: '#333',
        marginBottom: 0
    },
    messangerText: {
        fontFamily: FAMILY.regular,
        fontSize: 11,
        color: '#666',
        marginBottom: 5,
        lineHeight: 16
    },
    postedDate: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.tiny,
        color: '#999'
    },
    /* Common Styles */
    btnMore: {
        backgroundColor: COLOR.smokeDark,
        paddingHorizontal: 15,
        paddingVertical: SIZE.tiny,
        borderRadius: 5
    },
    btnMoreText: {
        fontFamily: FAMILY.regular,
        fontSize: SIZE.tiny,
        color: COLOR.greyDark,
        textTransform: 'uppercase'
    },
}
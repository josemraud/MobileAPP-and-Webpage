import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Icon, Text, View } from 'native-base'
import RNRestart from 'react-native-restart'

import styles from './styles'
import Header from '@component/Header'
import { navigate } from '@utility/navigation'
import theme from '@theme/styles'
import Languages from '@config/language'
import { setLocale, __ } from '@utility/translation'

export default class extends React.Component {

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Verification')} />
          <Content contentContainerStyle={theme.layout}>
            <View style={styles.section}>
              <View style={styles.logo}>
                <Text style={styles.codeDesc}>{__('Ingrese el codigo que le mandamos a su correo')}</Text>
              </View>
              <View style={styles.signBg}>
                <View style={theme.row}>
                  <TextInput style={styles.textInputHalf} placeholder={__('0')} />
                  <TextInput style={styles.textInputHalf} placeholder={__('0')} />
                  <TextInput style={styles.textInputHalf} placeholder={__('0')} />
                  <TextInput style={styles.textInputHalf} placeholder={__('0')} />
                </View>
                <TouchableOpacity
                  style={styles.btn} onPress={() => { navigate('MemberSignIn') }}>
                  <Text style={styles.loginBtnText}>{__('Verificar ahora')}</Text>
                  <Icon active name='arrow-right' type='MaterialCommunityIcons' style={styles.loginBtnIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.codeContent}>
                <Text style={styles.codeDesc}>{__('¿No recibio el codigo?')}</Text>
                <TouchableOpacity style={styles.codeBtn}>
                  <Text style={styles.codeBtnText}>{__('Reenviar')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
      </Container>
    )
  }
}

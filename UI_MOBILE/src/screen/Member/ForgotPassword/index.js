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
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium'/>
        <ImageBackground source={require('@asset/images/bg-crv.png')} imageStyle='cover' style={styles.bgCover}>
          <Content contentContainerStyle={theme.layout}>
            <View style={styles.section}>
              <View style={styles.logo}>
                <Image source={require('@asset/images/logolo.png')} />
              </View>
              <View style={styles.signBg}>
                <View style={theme.row}>
                  <TextInput style={styles.textInput} placeholder={__('Email Address')} />
                </View>
                <TouchableOpacity
                  style={styles.btn} onPress={() => { navigate('PublicHome') }}>
                  <Text style={styles.loginBtnText}>{__('Enviar')}</Text>
                  <Icon active name='arrow-right' type='MaterialCommunityIcons' style={styles.loginBtnIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.login}>
                <Text style={styles.account}>{__('Tienes cuentas con nosotros?')}</Text>
                <TouchableOpacity
                  transparent onPress={() => { navigate('MemberSignIn') }}>
                  <Text style={styles.btnLogin}>{__('Iniciar Sesion')}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Content>

        </ImageBackground>
      </Container >
    )
  }
}

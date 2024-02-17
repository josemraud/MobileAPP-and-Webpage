import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList } from 'react-native'
import { Container, Content, Icon, Text, View, ScrollView } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import { Fade, Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder'

import { navigate } from '@utility/navigation'
import styles from './styles'
import theme from '@theme/styles'
import { __ } from '@utility/translation'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import request from '@utility/request'
import { bind } from '@utility/component'



export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 'en',
    }

    bind(this)
  }
  async componentDidMount() {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })

  }

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title="Perfil"/>
        <Content >
          <View style={styles.messageOverlay}>
            <View style={styles.profile}>
              <Image source={require('@asset/images/avatar.png')} style={styles.avatar} />
              <View>
                <Text style={styles.profileName}>{__('Bienvenido, Felipe Cantarero!')}</Text>
                <Text style={styles.profileLocation}>{__('Tegucigalpa, Honduras')}</Text>
              </View>
            </View>
            
            <View style={styles.btnLayout}>
              <TouchableOpacity
                style={styles.btnBox} onPress={() => {
                  navigate('MemberProperties')
                }}
              >
                <Image source={require('@asset/images/btn-property.png')} resizeMode='cover' style={styles.btnImg} />
                <Text style={styles.btnText}>{__('Bienes')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnBox} onPress={() => {
                  navigate('MemberMessages')
                }}
              >
                <Image source={require('@asset/images/btn-messages.png')} style={styles.btnImg} />
                <Text style={styles.btnText}>{__('Vehiculos')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnBox} onPress={() => {
                  navigate('MemberProfile')
                }}
              >
                <Image source={require('@asset/images/btn-boy.png')} style={styles.btnImg} />
                <Text style={styles.btnText}>{__('Perfil')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnBox} onPress={() => {
                  navigate('MemberSettings')
                }}
              >
                <Image source={require('@asset/images/btn-settings.png')} style={styles.btnImg} />
                <Text style={styles.btnText}>{__('Configuracion')}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.btnBox} onPress={() => {
                  navigate('')
                }}
              >
               
                <Text style={styles.btnText}>{__('')}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnBox} />
            </View>
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

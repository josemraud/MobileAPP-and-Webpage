import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList } from 'react-native'
import { Container, Content, Icon, Text, View, Accordion, Picker } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

import { navigate } from '@utility/navigation'
import styles from './styles'
import theme from '@theme/styles'
import { __ } from '@utility/translation'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import request from '@utility/request'
import { bind } from '@utility/component'

export default class extends React.Component {
  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Publicado')} />
        <Content>
          <View style={styles.publish}>
            <Icon active name='checkmark' style={styles.publishIcon} type="FontAwesome" />
            <Text style={styles.publishTitle}>{__('Felicidades')}</Text>
            <Text style={styles.publishDesc}>{__('Tu propiedad ha sido publicada')}</Text>
            <View style={styles.publishPreview}>
              <TouchableOpacity iconLeft transparent style={styles.publishBtn} onPress={() => {
                navigate('MemberHomeScreen')
              }}>
                <Icon name="eye" type="FontAwesome" style={styles.publishBtnIcon} />
                <Text style={styles.publishBtnText}>{__('Regresar')}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

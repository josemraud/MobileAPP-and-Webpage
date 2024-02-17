import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Icon, Text, View, ScrollView } from 'native-base'
import RNPickerSelect from 'react-native-picker-select'
import RNRestart from 'react-native-restart'

import styles from './styles'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import { navigate } from '@utility/navigation'
import theme from '@theme/styles'
import Languages from '@config/language'
import { setLocale, __ } from '@utility/translation'

export default class extends React.Component {

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header statusBarType='dark' navLeftType='back' navMiddleType='medium' title={__('Contacto')} />
        <Content>
          <ImageBackground source={require('@asset/images/property-bg.png')} imageStyle='cover' style={styles.bgImg}>
            <View style={styles.contactLayout}>
              <Image source={require('@asset/images/logoloc.png')} style={styles.contactImg} />
            </View>
          </ImageBackground>
          <View>
            <View style={styles.contactTab}>
              <View style={styles.contactItem}>
                <Icon name='map' type='FontAwesome5' style={styles.contactIcon} />
                <View>
                  <Text style={styles.contactHeader}>{__('Ubicación').toUpperCase()}</Text>
                  <Text style={styles.contactDesc}>Centro Localiza, Anillo Periférico{'\n'}Tegucigalpa, Honduras</Text>
                </View>
              </View>
              <View style={styles.contactItem}>
                <Icon name='phone' type='FontAwesome' style={styles.contactIcon} />
                <View>
                  <Text style={styles.contactHeader}>{__('Teléfono').toUpperCase()}</Text>
                  <Text style={styles.contactDesc}>+504 2263-8712 / +504 3276-3465</Text>
                </View>
              </View>
              <View style={styles.contactItem}>
                <Icon name='envelope' type='FontAwesome5' style={styles.contactIcon} />
                <View>
                  <Text style={styles.contactHeader}>{__('Correo').toUpperCase()}</Text>
                  <Text style={styles.contactDesc}>soporte@applocaliza.com</Text>
                </View>
              </View>
              <View style={[styles.contactItem, styles.contactItemLast]}>
                <Icon name='globe' type='FontAwesome' style={styles.contactIcon} />
                <View>
                  <Text style={styles.contactHeader}>{__('Sitio Web').toUpperCase()}</Text>
                  <Text style={styles.contactDesc}>www.applocaliza.com</Text>
                </View>
              </View>
            </View>
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

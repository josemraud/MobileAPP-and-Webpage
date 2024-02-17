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
        <Header statusBarType='dark' navLeftType='back' navMiddleType='medium' title={__('Aboutus')} />
        <Content>
          <ImageBackground source={require('@asset/images/property-bg.png')} imageStyle='cover' style={styles.bgImg}>
            <View style={styles.imgLayout}>
              <Image source={require('@asset/images/btn-aboutus.png')} style={styles.aboutImg} />
            </View>
          </ImageBackground>
          <View style={styles.aboutContent}>
            <Text style={styles.aboutText}>
              Localiza Technologies
            {'\n\n'}Mauris dolor magna, sodales et finibus nec, feugiat nec enim. Nullam id arcu lacus.
          </Text>
          </View>
        </Content>
        <Footer currentScreen='Home'/>
      </Container>
    )
  }
}

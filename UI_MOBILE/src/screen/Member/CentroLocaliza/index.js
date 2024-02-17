import React from 'react'
import { SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, FlatList, I18nManager } from 'react-native'
import { Container, Content, Icon, Text, View,  Accordion, Picker, CheckBox } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import RadioGroup from 'react-native-custom-radio-group'
import { Fade, Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder'
import { SliderBox } from "react-native-image-slider-box";

import styles from './styles'

import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import theme from '@theme/styles'
import { navigate } from '@utility/navigation'
import request from '@utility/request'
import { bind } from '@utility/component'
import { __ } from '@utility/translation'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    bind(this)
  }
  render() {
    return (
        <Container style={theme.layoutFx}>
            <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Centro Localiza')} />
            <Content>
             <View>
                <Image source={require('@asset/images/centro-localiza.jpg')} resizeMode='cover'>
                </Image>
            </View>
          </Content>
      </Container>
    )
  }
}
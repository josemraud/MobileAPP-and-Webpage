import React from 'react'
import { SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, FlatList, I18nManager } from 'react-native'
import { Container, Content, Icon, Text, View } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import RadioGroup from 'react-native-custom-radio-group'
import { Fade, Placeholder, PlaceholderMedia, PlaceholderLine } from 'rn-placeholder'
import { SliderBox } from "react-native-image-slider-box";

import styles from './styles'

import Sponsored from './Sponsored'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import theme from '@theme/styles'
import { navigate } from '@utility/navigation'
import request from '@utility/request'
import { bind } from '@utility/component'
import { __ } from '@utility/translation'


import sponsoredList from './data/sponsored'

export const propertyType = [{
  label: __('Venta'),
  value: 'btn_buy'
}, {
  label: __('Renta'),
  value: 'btn_rent'
}, {
  label: __('Servicios'),
  value: 'btn_project'
}]

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 'en',



      sponsoredList: [],
      fetchingSponsoredList: true,

      images: [
        "https://images.pexels.com/photos/2662183/pexels-photo-2662183.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/3081701/pexels-photo-3081701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/2999012/pexels-photo-2999012.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      ],
    }

    bind(this)

    this.fetchSponsoredList = this.fetchSponsoredList.bind(this)
  }

  async componentDidMount() {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })
    await this.fetchSponsoredList()
  }

  async fetchSponsoredList() {
    await this.promisedSetState({
      fetchingSponsoredList: true
    })
    const list = await request(sponsoredList)
    await this.promisedSetState({
      sponsoredList: list,
      fetchingSponsoredList: false
    })
  }

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header statusBarType='dark' navLeftType='menu' navMiddleType='medium' title={__('Localiza')}/>
        <Content contentContainerStyle={theme.layout}>
          <View>
            <View style={styles.groupContainer}>
              <RadioGroup
                containerStyle={styles.groupBg}
                initialValue='btn_buy'
                buttonContainerStyle={styles.groupBtn}
                buttonTextStyle={styles.groupBtnText}
                buttonContainerActiveStyle={styles.groupBtnActive}
                buttonContainerInactiveStyle={styles.groupBtnInactive}
                buttonTextActiveStyle={styles.groupActiveText}
                buttonTextInactiveStyle={styles.groupInactiveText}
                radioGroupList={propertyType}
              />
            </View>
            

          </View>

          <ImageBackground source={require('@asset/images/bg-crv.png')} resizeMode='cover' style={styles.featuredBg}>
            <SliderBox 
            autoplay={true}
            images={this.state.images} />

          </ImageBackground>

          <Sponsored
            language={this.state.language}
            list={this.state.sponsoredList}
            fetching={this.state.fetchingSponsoredList}
          />

        </Content>
        <Footer currentScreen='Home'/>
      </Container>
    )
  }
}

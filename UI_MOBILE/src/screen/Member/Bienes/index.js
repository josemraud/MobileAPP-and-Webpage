import React from 'react'
import { SafeAreaView, StatusBar, TouchableOpacity, TextInput, ScrollView, Image, ImageBackground, FlatList, I18nManager } from 'react-native'
import { Container, Content, Icon, Text, View,  Accordion, Picker, CheckBox } from 'native-base'
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

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ptype: null,
      country: null,
      selected: '',
      isDisabled: false,
      isOpen: false,
      tabSelected: 'compra',
      sponsoredList: [],
      fetchingSponsoredList: true,

      images: [
        "https://images.pexels.com/photos/2662183/pexels-photo-2662183.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/3081701/pexels-photo-3081701.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "https://images.pexels.com/photos/2999012/pexels-photo-2999012.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
      ],

      images1: [
        "https://img.freepik.com/vector-gratis/interior-cocina-muebles-madera-dibujos-animados_107791-298.jpg?size=338&ext=jpg",
        "https://img.freepik.com/vector-gratis/ilustracion-muebles-cocina_98292-819.jpg?size=338&ext=jpg"
      ],
    }
    this.renderCompra = this.renderCompra.bind(this)
    this.renderRenta = this.renderRenta.bind(this)
    this.renderServicios = this.renderServicios.bind(this)

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

  renderCompra() {
    return (
          <View>
          {/*<ImageBackground source={require('@asset/images/bg-crv.png')} resizeMode='cover' style={styles.featuredBg}>
            <SliderBox 
            autoplay={true}
            images={this.state.images} />

    </ImageBackground>*/}
          <Sponsored
            language={this.state.language}
            list={this.state.sponsoredList}
            fetching={this.state.fetchingSponsoredList}
          />
          </View>
    )
  }

  renderRenta() {
    return (
          <View>
          <ImageBackground source={require('@asset/images/bg-crv.png')} resizeMode='cover' style={styles.featuredBg}>
            <SliderBox 
            autoplay={true}
            images={this.state.images1} />

          </ImageBackground>
          <Sponsored
            language={this.state.language}
            list={this.state.sponsoredList}
            fetching={this.state.fetchingSponsoredList}
          />
          </View>
    )
  }

  renderServicios() {
    return (
          <View>
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
          </View>
    )
  }


  render() {
    let tabContent
    if (this.state.tabSelected === 'compra') {
      tabContent = this.renderCompra()
    } else if (this.state.tabSelected === 'renta') {
      tabContent = this.renderRenta()
    } else if (this.state.tabSelected === 'servicios') {
      tabContent = this.renderServicios()
    }
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='menu' statusBarType='dark' navMiddleType='medium' title={__('Bienes')} />
        <Content>
          <View >
           { /*<View style={styles.information}>
              <View style={styles.propertyContent}>
                <TouchableOpacity style={this.state.tabSelected === 'compra' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'compra' })}>
                  <Text style={this.state.tabSelected === 'compra' ? styles.tabTextActive : styles.tabTextInactive}>{__('Compra')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'renta' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'renta' })}>
                  <Text style={this.state.tabSelected === 'renta' ? styles.tabTextActive : styles.tabTextInactive}>{__('Renta')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'servicios' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'servicios' })}>
                  <Text style={this.state.tabSelected === 'servicios' ? styles.tabTextActive : styles.tabTextInactive}>{__('Servicios')}</Text>
                </TouchableOpacity>
              </View>
    </View>*/}
            {tabContent}
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

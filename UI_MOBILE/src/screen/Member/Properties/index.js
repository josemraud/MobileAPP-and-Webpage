import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList, Alert } from 'react-native'
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

import Property from './Property'
import propertyList from './data/properties'


export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 'en',
      propertyList: [],
      fetchingPropertyList: true,
    }

    bind(this)

    this.fetchingPropertyList = this.fetchingPropertyList.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  onDelete() {
    Alert.alert(
      __('Alerta'),
      __('Esta seguro que quiere borrar esta propiedad?'),
      [
        {
          text: __('Cancelar'),
          style: 'cancel'
        },
        {
          text: __('OK')
        }
      ],
      { cancelable: false }
    )
  }
  async componentDidMount() {
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })

    await this.fetchingPropertyList()
  }

  async fetchingPropertyList() {
    await this.promisedSetState({
      fetchingPropertyList: true
    })
    const list = await request(propertyList)
    await this.promisedSetState({
      propertyList: list,
      fetchingPropertyList: false
    })
  }
  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navRightType='menu' navMiddleType='medium' title={__('Properties')} />
        <Content contentContainerStyle={theme.layout}>
          <View>
            <Property
              language={this.state.language}
              list={this.state.propertyList}
              fetching={this.state.fetchingPropertyList}
              onDelete={this.onDelete}
            />
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

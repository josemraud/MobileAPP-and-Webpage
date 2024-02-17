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

import Favorite from './Favorite'
import favoriteList from './data/favorites'


export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      language: 'en',
      favoriteList: [],
      fetchingFavoriteList: true,
    }

    bind(this)

    this.fetchingFavoriteList = this.fetchingFavoriteList.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }
  onDelete() {
    Alert.alert(
      __('Alerta'),
      __('Esta seguro que quiere eliminar su propiedad?'),
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

    await this.fetchingFavoriteList()
  }

  async fetchingFavoriteList() {
    await this.promisedSetState({
      fetchingFavoriteList: true
    })
    const list = await request(favoriteList)
    await this.promisedSetState({
      favoriteList: list,
      fetchingFavoriteList: false
    })
  }
  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Favoritos')} />
        <Content contentContainerStyle={theme.layout}>
          <View>
            <Favorite
              language={this.state.language}
              list={this.state.favoriteList}
              fetching={this.state.fetchingFavoriteList}
              onDelete={this.onDelete}
            />
          </View>
        </Content>
        <Footer currentScreen='Favourites' />
      </Container>
    )
  }
}

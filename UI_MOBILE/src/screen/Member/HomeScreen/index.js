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
            <Header navLeftType='prin' statusBarType='dark' navMiddleType='medium' title="Menú Principal"/>
            <Content >
              <View style={styles.messageOverlay}>
                
                <View style={styles.btnLayout}>
                  <TouchableOpacity
                    style={styles.btnBox} onPress={() => {
                      navigate('MemberBienes')
                    }}
                  >
                    <Image source={require('@asset/images/Casa.png')} resizeMode='cover' style={styles.btnImg} />
                    <Text style={styles.btnText}>{__('Bienes')}</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity
                    style={styles.btnBox} onPress={() => {
                      navigate('MemberVehiculos')
                    }}
                  >
                    <Image source={require('@asset/images/Auto.png')} style={styles.btnImg} />
                    <Text style={styles.btnText}>{__('Vehículos')}</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity
                    style={styles.btnBox} onPress={() => {
                      navigate('CentroLocaliza')
                    }}
                  >
                    <Image source={require('@asset/images/logol.png')} style={styles.btnImg} />
                    <Text style={styles.btnText}>{__('Centro Localiza')}</Text>
                  </TouchableOpacity>
    
                  <TouchableOpacity style={styles.btnBox} />
                </View>
              </View>
            </Content>
          </Container>
        )
    }
}
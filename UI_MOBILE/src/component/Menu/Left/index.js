import React, { Component } from 'react'
import { I18nManager, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { Text, Icon, View } from 'native-base'

import * as MENU from './Menu'

import styles from './styles'
import theme from '@theme/styles'
import { closeDrawer, navigate } from '@utility/navigation'
import { __ } from '@utility/translation'
import AsyncStorage from '@react-native-community/async-storage'

let email=""
class MenuLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4
    }
    this.renderMenuList = this.renderMenuList.bind(this)
  }

  async getEmail(){
    const correo = await AsyncStorage.getItem('correo');
    email=correo;
  }
  renderMenuList(menus) {
    return menus.map((menu) => {
      return <TouchableOpacity
        style={styles.item} underlayColor='transparent' onPress={() => {
          closeDrawer()
          navigate(menu.route)
        }}
      >
        <View style={styles.col}>
          <Icon name={menu.iconName} type={menu.iconType} style={styles.itemIcon} />
        </View>
        <Text style={styles.itemText}>{__(menu.name)}</Text>
      </TouchableOpacity>
    })
  }

  render() {
    return (
      <View style={styles.drawer}>
        
        <View style={styles.content}>
          <ScrollView>
            {this.renderMenuList(MENU.Data1)}
            <Text style={styles.itemLabel}>{__('Localiza')}</Text>
            {this.renderMenuList(MENU.Data2)}
          </ScrollView>
        </View>
      </View>

    )
  }
}

export default MenuLeft

import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Icon, View, Badge } from 'native-base'

import { navigate } from '@utility/navigation'

import theme from '@theme/styles'

export default class extends React.Component {
  render() {
    return (
      <View style={theme.footer}>
        <TouchableOpacity style={this.props.currentScreen === 'Home' ? theme.fBtnActive : theme.fBtn}
          onPress={() => {
           navigate('MemberVehiculos')
          }}>
          <Icon name='car' type='FontAwesome' style={this.props.currentScreen === 'Home' ? theme.iconFtabActive : theme.fBtnIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={this.props.currentScreen === 'Search' ? theme.fBtnActive : theme.fBtn}
          onPress={() => {
           navigate('MemberVehicleSearch')
          }}>
          <Icon name='search' type='FontAwesome' style={this.props.currentScreen === 'Search' ? theme.iconFtabActive : theme.fBtnIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={this.props.currentScreen === 'MemberHome' ? theme.fBtnActive : theme.fBtn}
          onPress={() => {
            navigate('MemberProfile')
          }}>
          <Icon name='user' type='FontAwesome' style={this.props.currentScreen === 'MemberHome' ? theme.iconFtabActive : theme.iconFtabBgActive} />
        </TouchableOpacity>
      </View>
    )
  }
}
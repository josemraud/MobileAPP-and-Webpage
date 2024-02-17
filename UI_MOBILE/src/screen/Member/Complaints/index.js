import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Icon, Text, Picker, View } from 'native-base'
import RNRestart from 'react-native-restart'

import styles from './styles'
import Header from '@component/Header'
import { navigate } from '@utility/navigation'
import theme from '@theme/styles'
import Languages from '@config/language'
import { setLocale, __ } from '@utility/translation'

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <Container style={theme.bgMain}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Complaints')} />

        <Content contentContainerStyle={theme.layout}>

          <View style={styles.section}>
            <View style={styles.row}>
              <Text style={styles.header}>{__('Ciudad')}</Text>
              <View style={styles.bgGrey}>
                <Picker
                  selectedValue={this.state.ptype}
                  height={20}
                >
                  <Picker.Item label={__('Chennai')} value='Chennai' />
                  <Picker.Item label={__('Bangalore')} value='Bangalore' style={styles.pickerText} />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>{__('Propiedad')}</Text>
              <View style={styles.bgGrey}>
                <Picker
                  selectedValue={this.state.ptype}
                  height={20}
                >
                  <Picker.Item label={__('Luxury Apartment')} value='Luxury Apartment' />
                  <Picker.Item label={__('Modern Villa')} value='Modern Villa' style={styles.pickerText} />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>{__('Comida')}</Text>
              <View style={styles.bgGrey}>
                <Picker
                  selectedValue={this.state.ptype}
                  height={20}
                >
                  <Picker.Item label={__('Daal')} value='Daal' />
                </Picker>
              </View>
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>{__('Maintenance')}</Text>
              <TextInput style={styles.textInputMulti} multiline numberOfLines={4} placeholder={__('Minimum 20 characters')} value='' />
            </View>
            <View style={styles.row}>
              <Text style={styles.header}>{__('Remarks')}</Text>
              <TextInput style={styles.textInputMulti} multiline numberOfLines={4} placeholder={__('Minimum 20 characters')} value='' />
            </View>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>{__('Ingresar')}</Text>
            </TouchableOpacity>
          </View>

        </Content>
      </Container>
    )
  }
}


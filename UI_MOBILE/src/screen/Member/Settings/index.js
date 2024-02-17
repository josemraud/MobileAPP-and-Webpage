import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList } from 'react-native'
import { Container, Content, Icon, Text, View, Accordion, Picker, CheckBox } from 'native-base'
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

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gender: null
    }

    this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
    this.renderAccordionContent = this.renderAccordionContent.bind(this)
    this.renderAccordionContentChangePassword = this.renderAccordionContentChangePassword.bind(this)
    this.renderAccordionContentNotifications = this.renderAccordionContentNotifications.bind(this)
  }

  renderAccordionHeader(item, expanded) {
    return (
      <View style={styles.accordionTab}>
        <Text style={styles.accordionTabText}>
          {' '}{item.title}
        </Text>
        {expanded
          ? <Icon style={styles.accordionTabIcon} name='minus' type='Foundation' />
          : <Icon style={styles.accordionTabIcon} name='plus' type='Foundation' />}
      </View>
    )
  }

  renderAccordionContent(item) {
    var fn = 'renderAccordionContent' + (item.type.charAt(0).toUpperCase() + item.type.substr(1))
    return <View style={styles.accordionContent}>
      {this[fn]()}
    </View>
  }

  renderAccordionContentChangePassword() {
    return <View>
      <TextInput style={styles.textInput} placeholder={__('Current Password')}  />
      <TextInput style={styles.textInput} placeholder={__('New Password')}  />
      <TextInput style={styles.textInput} placeholder={__('Confirm Password')}  />
      <TouchableOpacity
        style={styles.btn} onPress={() => {
          navigate('MemberHome')
        }}
      >
        <Text style={styles.formBtnText}>{__('save')}</Text>
        <Icon active name='arrow-right' type='Feather' style={styles.formBtnIcon} />
      </TouchableOpacity>
    </View>
  }

  renderAccordionContentNotifications() {
    return <View>
      <View style={styles.notifyContent}>
        <CheckBox style={styles.notify} checked={false} />
        <Text style={styles.notifyText}>{__('When someone enquired property')}</Text>
      </View>
      <View style={styles.notifyContent}>
        <CheckBox style={styles.notifyChecked} checked />
        <Text style={styles.notifyText}>{__('When someone contact me')}</Text>
      </View>
      <TouchableOpacity
        style={styles.btn} onPress={() => {
          navigate('MemberHome')
        }}
      >
        <Text style={styles.formBtnText}>{__('save')}</Text>
        <Icon active name='arrow-right' type='Feather' style={styles.formBtnIcon} />
      </TouchableOpacity>
    </View>
  }

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('')} />
        <Content>
          <View style={styles.profile}>
            <ImageBackground source={{ uri: ('https://cdn.stocksnap.io/img-thumbs/960w/ZUAZ22R9AL.jpg') }} imageStyle='cover' style={styles.coverImg} />
            <View style={styles.bgBlue} />
            <View style={styles.setting}>
              <View style={styles.settingBg}>
                <Image source={{ uri: ('https://ssl.gstatic.com/images/branding/product/1x/android_for_work_settings_512dp.png') }} style={styles.settingImg} />
              </View>
              <View style={styles.settingInfo}>
                <Text style={styles.settingText}>{__('Settings')}</Text>
              </View>
            </View>
          </View>
          <View style={styles.formBg}>                      
            <Accordion
              style={styles.accordion}
              dataArray={[
                {
                  type: 'changePassword',
                  title: __('Cambiar contraseña')
                },
                {
                  type: 'notifications',
                  title: __('Notificaciones')
                }
              ]}
              expanded={1}
              renderHeader={this.renderAccordionHeader}
              renderContent={this.renderAccordionContent}
            />
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

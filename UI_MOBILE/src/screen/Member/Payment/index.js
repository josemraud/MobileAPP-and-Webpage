import React from 'react'
import { SafeAreaView, Picker, StatusBar, TouchableOpacity, TextInput, Image } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Icon, Text, View, Accordion, Radio, CheckBox } from 'native-base'
import RNRestart from 'react-native-restart'
import LinearGradient from 'react-native-linear-gradient'
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button'
import Modal from 'react-native-modalbox'

import styles from './styles'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import { navigate } from '@utility/navigation'
import theme from '@theme/styles'
import Languages from '@config/language'
import { setLocale, __ } from '@utility/translation'

export default class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

      value: 0
    }

    this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
    this.renderAccordionContent = this.renderAccordionContent.bind(this)
    this.renderAccordionContentDebitcard = this.renderAccordionContentDebitcard.bind(this)
    this.renderAccordionContentNetbanking = this.renderAccordionContentNetbanking.bind(this)
    this.renderAccordionContentWallet = this.renderAccordionContentWallet.bind(this)
  }
  renderAccordionHeader(item, expanded) {
    return (
      <View style={styles.accordionTab}>
        {expanded
          ? <Icon name="caretdown" type="AntDesign" style={styles.accordionTabIconActive} />
          : <Icon name="caretright" type="AntDesign" style={styles.accordionTabIcon} />}
        <Text style={styles.accordionTabText}>{""}{item.title}</Text>
      </View>
    );
  }
  renderAccordionContent(item) {
    var fn = 'renderAccordionContent' + (item.type.charAt(0).toUpperCase() + item.type.substr(1));
    return <View style={styles.accordionContent}>
      {this[fn]()}
    </View>
  }
  renderAccordionContentDebitcard() {
    return <View style={styles.card}>
      <View style={styles.cardGroup}>
        <Text style={styles.cardLabel}>{__('Numero de Tarjeta')}</Text>
        <TextInput
          placeholder="Enter Card Number"
          style={styles.cardInput} />
      </View>
      <View style={styles.cardGroup}>
        <Text style={styles.cardLabel}>{__('Nombre en la Tarjeta')}</Text>
        <TextInput
          placeholder="Enter Name"
          style={styles.cardInput} />
      </View>
      <View style={styles.cardCol}>
        <View style={styles.cardGroup}>
          <Text style={styles.cardLabel}>{__('Expiracion')}</Text>
          <TextInput
            placeholder="MM-YY"
            style={styles.cardInput} />
        </View>
        <View style={styles.cardGroup}>
          <Text style={styles.cardLabel}>{__('CVV')}</Text>
          <TextInput
            placeholder="CVV"
            style={styles.cardInput} />
        </View>
        <View style={styles.cardCvv}>
          <Icon name="credit-card" type="FontAwesome" styles={styles.cardCvvIcon} />
        </View>
      </View>
      <TouchableOpacity style={styles.makepayBtn} onPress={() => this.refs.ModalConfirm.open()}>
        <Text style={styles.payBtnText}>{__('Hacer el pago')}</Text>
      </TouchableOpacity>
    </View>
  }
  renderAccordionContentNetbanking() {
    return <View style={styles.card}>

      <View style={styles.contactFormRow}>
        <RadioGroup
          size={0}
          thickness={0}
          selectedIndex={1}
          highlightColor='rgba(234, 59, 90, 1)'
          style={styles.contactForm}>
          <RadioButton>
            <Image style={styles.bankImg}
              source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV_hlEMINxx2fPLYP6aojdVCzpOqUDTwJBn0lTkM_XI0N3dyZS&s' }} />
          </RadioButton>
          <RadioButton>
            <Image style={styles.bankImg}
              source={{ uri: 'https://image3.mouthshut.com/images/imagesp/925004492s.jpg' }} />
          </RadioButton>
          <RadioButton>
            <Image style={styles.bankImg}
              source={{ uri: 'https://assets-news-bcdn.dailyhunt.in/cmd/resize/400x400_60/fetchdata13/images/a8/54/37/a85437b65b977a05a9ff50d55f7b37ef.jpg' }} />
          </RadioButton>
          <RadioButton>
            <Image style={styles.bankImg}
              source={{ uri: 'https://image3.mouthshut.com/images/imagesp/925004501s.png' }} />
          </RadioButton>
          <RadioButton>
            <Image style={styles.bankImg}
              source={{ uri: 'https://www.livechennai.com/businesslistings/News_photo/Canara-Bank15118.jpg' }} />
          </RadioButton>
        </RadioGroup>
      </View>
      <View style={styles.cardPickerBg}>
        <Picker style={styles.cardPicker}>
          <Picker.Item label="Otros Bancos" value="other banks" />
          <Picker.Item label="IOB" value="iob" />
          <Picker.Item label="HDFC" value="hdfc" />
        </Picker>
      </View>
    </View>
  }

  renderAccordionContentWallet() {
    return <View style={styles.card}>
      <View>
        <View style={styles.codRow}>
          <Radio
            color={"#333"}
            selectedColor={"rgba(234, 59, 90, 1)"}
            selected={true} />
          <View style={styles.codCol}>
            <Text style={styles.codText}>{__('Cash On Delivery')}</Text>
            <Text style={styles.codDesc}>{__('Deliver cash to your door')}</Text>
            <TouchableOpacity style={styles.codBtn} onPress={() => this.refs.ModalConfirm.open()}>
              <Text style={styles.codBtnText}>{'Proceder'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  }

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header statusBarType='dark' navLeftType='back' navMiddleType='medium' title={__('Payment')} />
        <Content contentContainerStyle={theme.layout}>
          <Text style={styles.header}>{__('Elegir Pago')}</Text>
          <View style={styles.payment}>
            <View style={styles.accordionLayout}>
              <Accordion
                style={styles.accordion}
                dataArray={[
                  {
                    type: 'debitcard',
                    title: 'Credit / Debit Card'
                  },

                  {
                    type: 'netbanking',
                    title: 'Net Banking'
                  },
                  {
                    type: 'wallet',
                    title: 'Cash on Delivery'
                  },

                ]}
                expanded={0}
                renderHeader={this.renderAccordionHeader}
                renderContent={this.renderAccordionContent}
              />
            </View>
          </View>
        </Content>
        <Modal
          ref={'ModalConfirm'}
          isOpen={this.state.isOpen}
          position={'center'}
          swipeToClose={false}
          style={styles.mNewBox}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => this.refs.ModalConfirm.close()}>
            <Icon name='close' type='MaterialCommunityIcons' style={styles.closeIcon} />
          </TouchableOpacity>
          <View>
            <View style={styles.contactCheck}>
              <Image source={require('@asset/images/checkmark.png')} resizeMode='contain' style={styles.contactImg} />
            </View>
            <Text style={styles.confirmThank}>{__('Gracias!')}</Text>
            <Text style={styles.confirmDesc}>{__('Tu informacion se ha guardado exitosamente')}</Text>
          </View>
        </Modal>
      </Container>
    )
  }
}

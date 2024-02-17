import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList, Alert } from 'react-native'
import { Container, Content, Icon, Text, View, Accordion, Picker } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'

import { navigate } from '@utility/navigation'
import styles from './styles'
import theme from '@theme/styles'
import { __ } from '@utility/translation'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import request from '@utility/request'
import { bind } from '@utility/component'
import { useValue } from 'react-native-reanimated'
import {REACT_APP_REQ} from '@env'

let id="";
let correo_us = "";
const getCorreo = async() => {
  try{
  const result = await AsyncStorage.getItem('correo');
  correo_us=result;
}catch(error){
  console.log(error);
}
}

export default class extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      gender: null,
      usuario: [],
      new_pass: '',
      new_password: '',
      current_password: '',
      password: '',
    }

    this.renderAccordionHeader = this.renderAccordionHeader.bind(this)
    this.renderAccordionContent = this.renderAccordionContent.bind(this)
    this.renderAccordionContentBasic = this.renderAccordionContentBasic.bind(this)
    this.renderAccordionContentAddress = this.renderAccordionContentAddress.bind(this)
    this.renderAccordionContentContact = this.renderAccordionContentContact.bind(this)
    this.renderAccordionContentSocial = this.renderAccordionContentSocial.bind(this)
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

  renderAccordionContentBasic() {
    return <View>
      <View style={styles.info}>
        <TextInput secureTextEntry={true} style={styles.textInput} placeholder={__('Contraseña Anterior')} 
        onChangeText={(current_password) => this.setState({current_password})} value={this.state.current_password}/>
      </View>
      <View style={styles.info}>
      <TextInput secureTextEntry={true} style={styles.textInput} placeholder={__('Nueva Contraseña')} 
      onChangeText={(new_pass) => this.setState({new_pass})} value={this.state.new_pass}/>
      </View>
      <View style={styles.info}>
        <TextInput secureTextEntry={true} style={styles.textInput} placeholder={__('Confirmar Contraseña')} 
        onChangeText={(new_password) => this.setState({new_password})} value={this.state.new_password}/>
      </View>
      <TouchableOpacity
        style={styles.btn} onPress={() => {
          this.changePassword();
        }}
      >
        <Text style={styles.formBtnText}>{__('Guardar')}</Text>
        <Icon active name='arrow-right' type='Feather' style={styles.formBtnIcon} />
      </TouchableOpacity>
    </View>
  }

  renderAccordionContentAddress() {
    return <View>
      <View style={styles.info}>
        <TextInput secureTextEntry={true} style={styles.textInput} placeholder={__('Contraseña')} 
        onChangeText={(password) => this.setState({password})} value={this.state.password}/>
      </View>
      <TouchableOpacity
        style={styles.btn} onPress={() => {
          this.deleteUser();
        }}
      >
        <Text style={styles.formBtnText}>{__('Eliminar')}</Text>
        <Icon active name='arrow-right' type='Feather' style={styles.formBtnIcon} />
      </TouchableOpacity>
    </View>
  }

  renderAccordionContentContact() {
    return <View>
      <TextInput style={styles.textInput} placeholder={__('Your Mobile No.')} />
      <TextInput style={styles.textInput} placeholder={__('Your Telephone No.')} />
      <TextInput style={styles.textInput} placeholder={__('Your Email Address')} />
      <TextInput style={styles.textInput} placeholder={__('Your Website url')} />
      <TouchableOpacity
        style={styles.btn} onPress={() => {
          navigate('MemberHome')
        }}
      >
        <Text style={styles.formBtnText}>{__('Save')}</Text>
        <Icon active name='arrow-right' type='Feather' style={styles.formBtnIcon} />
      </TouchableOpacity>
    </View>
  }

  renderAccordionContentSocial() {
    return <View>
      <TextInput style={styles.textInput} placeholder={__('Facebook')} />
      <TextInput style={styles.textInput} placeholder={__('Twitter')} />
      <TextInput style={styles.textInput} placeholder={__('YouTube')} />
      <TextInput style={styles.textInput} placeholder={__('Google+')} />
      <TouchableOpacity
        style={styles.btn} onPress={() => {
          navigate('MemberHome')
        }}
      >
        <Text style={styles.formBtnText}>{__('Save')}</Text>
        <Icon active name='arrow-right' type='Feather' style={styles.formBtnIcon} />
      </TouchableOpacity>
    </View>
  }

  async deleteUser(){
    const token = await AsyncStorage.getItem('token');
      let reqOp = {
        password: this.state.password
      }
      const response = await fetch(REACT_APP_REQ+`/user/auth/${id}`, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json',
         'api-token' : token},
         'credentials' :'include',
         body: JSON.stringify(reqOp)
      });
      var data = await response.json();
      console.log(data)
      if(data.code == 200){
        Alert.alert(
          'Usuario eliminado',
          'Su usuario fue eliminado',
          [
            {
              text: 'OK'
            }
          ]
        )
        navigate('MemberSignIn')
      }else{
          Alert.alert(
            'Error',
            'La contraseña no coincide',
            [
              {
                text: 'OK'
              }
            ]
          )
        }
  }

  async changePassword(){
    const token = await AsyncStorage.getItem('token');
    if(this.state.new_pass !== this.state.new_password){
      Alert.alert(
        'Alerta',
        'Las contraseñas no coinciden',
        [
          {
            text: 'OK'
          }
        ]
      )
    }else{
      let reqOp = {
        new_password: this.state.new_password, 
        current_password: this.state.current_password
      }
      const response = await fetch(REACT_APP_REQ+`/user/auth/${id}/newpassword`, {
         method: 'PUT',
         headers: {'Content-Type': 'application/json',
         'api-token' : token},
         'credentials' :'include',
         body: JSON.stringify(reqOp)
      });
      var data = await response.json();
      console.log(data)
      if(data.code == 200){
        Alert.alert(
          'Contraseña actualizada',
          'Su contraseña fue actualizada',
          [
            {
              text: 'OK'
            }
          ]
        )
        navigate('MemberProfile')
      }
    }
  }

  async componentDidMount(){
    await getCorreo();
    const token = await AsyncStorage.getItem('token');
    await fetch(REACT_APP_REQ+`/user/auth/${correo_us}`, {
         method: 'GET',
         headers: {'Content-Type': 'application/json',
         'api-token' : token},
         'credentials' :'include'
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            usuario: responseJson.data,
         })
      })
      .catch((error) => {
         console.error(error);
      });
      const {usuario} = this.state;
      usuario.map((user, i) => (
        id=(user.id_usuario)
      ))
  }

  render() {
    const {usuario} = this.state;
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Perfíl')} />
        <Content>
          <View style={styles.profile}>
            <View style={styles.bgBlue} />
            <View style={[styles.owner, styles.actionBarIn]}>
              <View style={styles.ownerBg}>
                
              </View>
              {usuario.map((user, i) => (
              <View style={styles.ownerInfo}>
                <Text style={styles.ownerName}>{user.nombre} {user.apellido}</Text>
                <Text style={styles.ownerLocation}>{correo_us}</Text>
              </View>))}
            </View>
          </View>

          <View style={styles.formBg}>
            <Accordion
              style={styles.accordion}
              dataArray={[
                {
                  type: 'basic',
                  title: 'Modificar Contraseña'
                },
                {
                  type: 'address',
                  title: 'Eliminar Usuario'
                }
                
              ]}
              expanded={-1}
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

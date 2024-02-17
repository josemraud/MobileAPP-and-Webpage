import React from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, Linking  } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Icon, Text, View } from 'native-base'
import RNRestart from 'react-native-restart'

import styles from './styles'
import Header from '@component/Header'
import { navigate } from '@utility/navigation'
import theme from '@theme/styles'
import Languages from '@config/language'
import { setLocale, __ } from '@utility/translation'
import {REACT_APP_REQ} from '@env'

export default class extends React.Component {

  constructor(props){
    super(props);
    AsyncStorage.clear().then(() => console.log('Cleared'));
    this.state = {
      correo: '',
      password: '',
      
  };
  this.onClickButton = this.onClickButton.bind(this);
  this.onTextChange = this.onTextChange.bind(this);
   }
 
   onTextChange(e){
    const {name, value} = e.target;
    this.setState({[name]:value});
    
} 

async refreshPage() {
  await window.location.reload(false);
}

async onClickButton(e) {
 if(this.state.correo.toLowerCase().replace(/\s+/g, '') == "" || this.state.password == ""){
  alert('Debe llenar todos los campos.');
 }
 else{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({correo:this.state.correo.toLowerCase().replace(/\s+/g, ''), password:this.state.password,
    })
};
  const response = await fetch(REACT_APP_REQ+'/user/session/', requestOptions);
  const data = await response.json();
  if(data.code == 200){
    this.setState({ postId: data.id });
    let hora = new Date();
    AsyncStorage.setItem('token', data.token)
    AsyncStorage.setItem('correo', this.state.correo.toLowerCase().replace(/\s+/g, ''))
    alert(data.msg)
    navigate('MemberHomeScreen')
  }
  else if(data.code == 400){
    alert(data.msg)
    this.refreshPage();
  }
}
};

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='prin' statusBarType='dark' navMiddleType='medium' title={__('Inicio de Sesión')} />

          <Content contentContainerStyle={theme.layout}>
            <View style={styles.section}>
              <View style={styles.logo}>
                <Image source={require('@asset/images/logolo.png')} />
              </View>
              <View style={styles.signBg}>
                <View style={theme.row}>
                  <TextInput style={styles.textInput}  keyboardType={'email-address'} name='correo' placeholder={__('Correo electrónico')} 
                  onChangeText={(correo) => this.setState({correo})} />
                </View>
                <View style={theme.row}>
                  <TextInput secureTextEntry={true} style={styles.textInput}  name='password' placeholder={__('Contraseña')} 
                  onChangeText={(password) => this.setState({password})} />
                </View>
                <TouchableOpacity
                  style={styles.btn} onPress={this.onClickButton}>
                  <Text style={styles.loginBtnText}>{__('Iniciar sesión')}</Text>
                  <Icon active name='arrow-right' type='MaterialCommunityIcons' style={styles.loginBtnIcon} />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgot} onPress={() => {Linking.openURL('http://www.applocaliza.com/#/recuperar')}}>
                <Text style={styles.btnForgot}>{__('¿Olvidó su contraseña?')}</Text>
              </TouchableOpacity>
              <View style={styles.login}>
                <Text style={styles.account}>{__('Aún no tienes cuenta?')}</Text>
                <TouchableOpacity
                  transparent onPress={() => { navigate('MemberSignUp') }}>
                  <Text style={styles.btnLogin}>{__('Regístrate ahora')}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </Content>
      </Container >
    )
  }
}

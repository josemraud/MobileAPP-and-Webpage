import React from 'react';
import { Alert, StatusBar, TouchableOpacity, TextInput, Image, ImageBackground,Picker} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Container, Content, Icon, Text, View} from 'native-base';
import RNRestart from 'react-native-restart';

import styles from './styles';
import Header from '@component/Header';
import { navigate } from '@utility/navigation';
import theme from '@theme/styles';
import Languages from '@config/language';
import { setLocale, __ } from '@utility/translation';
import {REACT_APP_REQ} from '@env'

import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_RAO4nxVWUrwtpLENlcFfK");

export default class extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {
      articleId: null,
      errorMessage: null,
      correo: '',
      nombre: '',
      id_pais: '',
      country: null,
      fecha_nacimiento: "",
      telefono: '',
      password: '',
      apellido:'',
      dataSource:[],
      year:'', 
      month:'', 
      day:'',
      confirm:'',
      emailError:'',
      nameError:'',
      lastnameError:'',
      dateError:'',
      phoneError:'',
      passwordError:'',
      confirmError:'',
  };
  this.onClickButton = this.onClickButton.bind(this);
  this.onTextChange = this.onTextChange.bind(this);
   }
 
   onTextChange(e){
    const {name, value} = e.target;
    this.setState({[name]:value});
    
} 

componentDidMount= () =>{
  fetch(REACT_APP_REQ+'/countries/', {
         method: 'GET',
         headers: {'Content-Type': 'application/json'}
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            dataSource: responseJson.data,
            country: responseJson.data.id_pais,
         })
      })
      .catch((error) => {
         console.error(error);
      });
}

async onClickButton(e) {
  if(this.state.nombre == "" || this.state.apellido == "" || this.state.telefono == "" || this.state.password == "" ||
  this.state.correo.toLowerCase().replace(/\s+/g, '') == "" || this.state.confirm == "" || this.state.day == "" || this.state.month == "" || this.state.year == ""){
    alert('Debe llenar todos los campos');
  }
  else{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({correo:this.state.correo.toLowerCase().replace(/\s+/g, ''),
      nombre:this.state.nombre, apellido:this.state.apellido, password:this.state.password,
      fecha_nacimiento: this.state.year+"-"+this.state.month+"-"+this.state.day, id_pais:this.state.id_pais,telefono:this.state.telefono
    })
  }
  const response = await fetch(REACT_APP_REQ+'/user/auth/', requestOptions);
  const data = await response.json();
  if(data.code == 201){
    this.setState({ postId: data.id });
    emailjs.send("service_ht0xjsb","template_gzp65n9",{
      from_name: "Equipo Localiza",
      nombre: this.state.correo.toLowerCase().replace(/\s+/g, ''),
      message: 'Hola '+this.state.nombre+' '+this.state.apellido+', bienvenido a localiza, puedes seguir este enlace para confirmar tu correo'+' '+'http://www.applocaliza.com/#/confirm'+'/'+data.id_usuario,
      reply_to: this.state.correo.toLowerCase().replace(/\s+/g, ''),
      });
    Alert.alert(  
      'Correo de confirmación enviado',  
      '¿No encuentras el correo? Revisa tu carpeta de spam',  
      [    
          {text: 'OK', onPress: () => console.log('OK Pressed')},  
      ],  
      {cancelable: false}  
  )  
    navigate('MemberSignIn')
  }
  else if(data.code == 400)
  {
    alert(data.msg)
  }
};
 
};
 
emailValidator(){
  if(this.state.correo.toLowerCase().replace(/\s+/g, '')=="")
  {
    this.setState({emailError:"Es necesario ingresar un correo"})
  }
  else{
    this.setState({emailError:""})
  }
}

nameValidator(){
  if(this.state.nombre=="" || this.state.nombre.length < 3){
    this.setState({nameError:"Es necesario ingresar su nombre"})
  }
  else{
    this.setState({nameError:""})
  }
}

lastnameValidator(){
  if(this.state.apellido=="" || this.state.apellido.length < 3){
    this.setState({lastnameError:"Es necesario ingresar su apellido"})
  }
  else{
    this.setState({lastnameError:""})
  }
}

dateValidator(){
   if(this.state.year.length < 4 || this.state.year.length > 4){
    this.setState({dateError:"Debe ingresar un año valido"})
  }
  else if(this.state.month.length > 2 || this.state.month > 12){
    this.setState({dateError:"Debe ingresar un mes valido"})
  }
  else if(this.state.day.length > 2 || this.state.day > 31){
    this.setState({dateError:"Debe ingresar un dia valido"})
  }
  else if(this.state.year ==""){
    this.setState({dateError:"Es necesario ingresar su año de nacimiento"})
  }
  else if(this.state.month == "" ){
    this.setState({dateError:"Es necesario ingresar su mes de nacimiento"})
  }
  else if(this.state.day == ""){
    this.setState({dateError:"Es necesario ingresar su dia de nacimiento"})
  }
  else{
    this.setState({dateError:""})
  }
}

phoneValidator(){
  if(this.state.telefono==""){
    this.setState({phoneError:"Es necesario ingresar su numero de telefono"})
  }
  else if(this.state.telefono.length < 8){
    this.setState({phoneError:"Debe ingresar un telefono con 8 caracteres o mas"})
  }
  else{
    this.setState({phoneError:""})
  }
}

passwordValidator(){
  if(this.state.password==""){
    this.setState({passwordError:"Es necesario ingresar una contraseña para su usuario"})
  }
  else if(this.state.password.length < 8){
    this.setState({passwordError:"Debe ingresar una contraseña con 8 caracteres o mas"})
  }
  else{
    this.setState({passwordError:""})
  }
}

confirmValidator(){
  if(this.state.password === this.state.confirm) {
    this.setState({confirmError:""})
  }
  else if(this.state.password == "" ||this.state.confirm == ""){
    this.setState({confirmError:""})
  }
  else if(this.state.password !== this.state.confirm) {
    this.setState({confirmError:"Las contraseñas no coinciden"})
  }
}

  render() {
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='prin' statusBarType='dark' navMiddleType='medium' title={__('Registrarse')} />
          <Content contentContainerStyle={theme.layout}>
            <View style={styles.section}>
              <View style={styles.logo}>
                <Image source={require('@asset/images/logolo.png')} />
              </View>
              <View style={styles.signBg}>

                <View style={theme.row}>                 
                  <TextInput style={styles.textInputHalf} name="nombre"placeholder={__('Nombre')} 
                   onChangeText={(nombre) => this.setState({nombre})} onBlur={()=>this.nameValidator()}
                  />
                  <TextInput style={styles.textInputHalf} name="apellido" placeholder={__('Apellido')} 
                   onChangeText={(apellido) => this.setState({apellido})} onBlur={()=>this.lastnameValidator()}/>
                </View>
                <View style={theme.row}>
                <Text style={styles.error}>{this.state.nameError}</Text>
                <Text style={styles.error}>{this.state.lastnameError}</Text>
                </View>

                <View style={theme.row}> 
                  <TextInput style={styles.textInputT} keyboardType={'numeric'} name="year" placeholder={__('Año')} 
                   onChangeText={(year) => this.setState({year})}  onBlur={()=>this.dateValidator()} 
                  />
                  <TextInput style={styles.textInputT} keyboardType={'numeric'} name="month" placeholder={__('Mes')} 
                   onChangeText={(month) => this.setState({month})} onBlur={()=>this.dateValidator()}
                   />
                   <TextInput style={styles.textInputT} keyboardType={'numeric'} name="day" placeholder={__('Dia')} 
                   onChangeText={(day) => this.setState({day})} onBlur={()=>this.dateValidator()}/>
                </View>
                <View style={theme.row}>
                <Text style={styles.error}>{this.state.dateError}</Text>
                </View>
              

                <View style={styles.row}>
        <View style={styles.bgGrey}>
          <Picker selectedValue={this.state.id_pais}
            onValueChange={(itemValue, itemIndex) => this.setState({id_pais: itemValue })}
            >
            <Picker.Item label="Seleccione un Pais" isDisabled itemStyle={{height:50}}/>  
            {this.state.dataSource.map((item)=>(
            <Picker.Item label={item.nombre_pais} value={item.id_pais} />
            ))}
          </Picker>
        </View>
      </View>
                <View style={theme.row}>
                  <TextInput keyboardType={'numeric'} name="telefono" style={styles.textInput} placeholder={__('Numero de telefono')}
                   onChangeText={(telefono) => this.setState({telefono})} onBlur={()=>this.phoneValidator()}/>
                </View>
                <View style={theme.row}>
                <Text style={styles.error}>{this.state.phoneError}</Text>
                </View>

                <View style={theme.row}>
                  <TextInput style={styles.textInput} keyboardType={'email-address'} name="correo" placeholder={__('Correo electronico')}
                   onChangeText={(correo) => this.setState({correo})} onBlur={()=>this.emailValidator()}/>
                </View>
                <View style={theme.row}>
                <Text style={styles.error}>{this.state.emailError}</Text>
                </View>

                <View style={theme.row}>
                  <TextInput secureTextEntry={true} name="password" style={styles.textInput} placeholder={__('Contraseña')}
                   onChangeText={(password) => this.setState({password})} onBlur={()=>this.passwordValidator()}/>
                </View>
                <View style={theme.row}>
                <Text style={styles.error}>{this.state.passwordError}</Text>
                </View>

                <View style={theme.row}>
                  <TextInput secureTextEntry={true} name="confirm" style={styles.textInput} placeholder={__('Confirme la Contraseña')}
                   onChangeText={(confirm) => this.setState({confirm})} onBlur={()=>this.confirmValidator()}/>
                </View>
                <View style={theme.row}>
                <Text style={styles.errorC}>{this.state.confirmError}</Text>
                </View>

                <TouchableOpacity
                  style={styles.btn} onPress={this.onClickButton}>
                  <Text style={styles.loginBtnText}>{__('Registrarse')}</Text>
                  <Icon active name='arrow-right' type='MaterialCommunityIcons' style={styles.loginBtnIcon} />
                </TouchableOpacity>
              </View>
              <View style={styles.login}>
                <Text style={styles.account}>{__('¿Ya tienes una cuenta?')}</Text>
                <TouchableOpacity
                  transparent onPress={() => { navigate('MemberSignIn') }}>
                  <Text style={styles.btnLogin}>{__('Iniciar sesion')}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Content>
      </Container >
    )
  }
}

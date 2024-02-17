import React, {Component} from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList, Alert, ScrollView, 
  StyleSheet, Picker,
  Dimensions, Linking} from 'react-native'
import { Container, Content, Icon, Text, View, Accordion, Avatar, CheckBox } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage'
import RadioGroup from 'react-native-custom-radio-group'
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import uuid from 'react-native-uuid';
import {st} from "../../../db/index";

import RNFetchBlob from 'react-native-fetch-blob';
import { navigate } from '@utility/navigation'
import styles from './styles'
import theme from '@theme/styles'
import { __ } from '@utility/translation'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import request from '@utility/request'
import { bind } from '@utility/component'
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import { BackHandler, DeviceEventEmitter } from 'react-native';
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

let lat_ini = 0;
let long_ini = 0;
let MarkerPos = {
  latitude: 0,
  longitude: 0
}
export default class extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0,
        longitudeDelta: 0,
      },
      ptype: null,
      country: null,
      region: null,
      selected: '',
      isDisabled: false,
      isOpen: false,
      tabSelected: 'overview',
      datos: [],
      dataSource:[],
      dataProp:[],
      dataSource1:[],
      dataSource2:[],
      terms: false,
      usuario:[],
      coun:"",
      reg:"",
      cit:"",
      image: null,
      images:[],
      desc_bien: "",
      bathrooms : "",
      dimensiones : "",
      direccion : "",
      habitaciones  : "",
      id_ciudad : "",
      id_tipo_bien  : "",
      id_usuario  : id,
      identidad_propietario : "",
      latitud: 0,
      longitud: 0,
      nombre_propietario: "",
      parqueo: "",
      pisos: "",
      paises:[],
      precio: "",
      seo: false,
      venta_renta: ""
    }
    this.onClickButton = this.onClickButton.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.getRegion = this.getRegion.bind(this);
    this.getCiudad = this.getCiudad.bind(this);
  }
  
  onDelete() {
    Alert.alert(
      'Alerta',
      'Are you sure you want to delete this vessel?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK'
        }
      ],
      { cancelable: false }
    )
  }

async componentDidMount() {
  await getCorreo();
  if(this.state.latitud===0){
    this.getLoc()
  }
  const token = await AsyncStorage.getItem('token');
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
      fetch(REACT_APP_REQ+'/property/type/', {
         method: 'GET',
         headers: {'Content-Type': 'application/json'}
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            dataProp: responseJson.data,
            ptype: responseJson.data.id_pais,
         })
      })
      .catch((error) => {
         console.error(error);
      });
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
      console.log(id)
   }

   getRegion(country){
      let token =  AsyncStorage.getItem('token');
      fetch(REACT_APP_REQ+`/region/${country}`, {
          method: 'GET',
          headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({
              dataSource1: responseJson.data
          })
        })
        .catch((error) => {
          console.error(error);
        });
   }

   getCiudad(region){
    let token =  AsyncStorage.getItem('token');
    fetch(REACT_APP_REQ+`/city/${region}`, {
           method: 'GET',
           headers: {'Content-Type': 'application/json'}
        })
        .then((response) => response.json())
        .then((responseJson) => {
           this.setState({
              dataSource2: responseJson.data
           })
        })
        .catch((error) => {
           console.error(error);
        });
      }

    ChoosePics = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
      maxFiles:10,
    })
      .then((images) => {
        this.setState({
          images: images.map((i) => {
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
              data: i.data,
              exif: i.exif,
            };
          }),
        });
      })
      .catch((e) => alert(e));
  }
  getLoc(){
    
    Geolocation.getCurrentPosition((position) => {
      lat_ini = parseFloat(position.coords.latitude)
      long_ini = parseFloat(position.coords.longitude)
      
      var initialRegion = {
        latitude: lat_ini,
        longitude: long_ini,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

      MarkerPos = {
        latitude: parseFloat(position.coords.latitude),
        longitude: parseFloat(position.coords.longitude)
      }

      this.setState({latitud: lat_ini.toString(), longitud:long_ini.toString()})
      this.setState({initialPosition: initialRegion})
    },
    (error) => {if(Platform.OS === 'android')
    LocationServicesDialogBox.checkLocationServicesIsEnabled({ 
                    message: "<h2>¿Usar GPS?</h2> \
                                Esta app necesita usar su ubicación. ¿Desea activarla?<br/><br/>", 
                    ok: "SI", 
                    cancel: "NO" 
                }).then(() => { 
                    locationTracking(dispatch, getState, geolocationSettings), 
                    this.getLoc()
                })},
    {enableHighAccuracy: true, timeout: 20000});
  
  }

  renderImage(image) {
    return (
      <Image
        style={{ 
          height: 120,
          width: 120 }}
        source={image}
      />
    );
  }

  renderAsset(image) {
    return this.renderImage(image);
  }

  async onClickButton() {
    const token = await AsyncStorage.getItem('token');
    let datos={
      desc_bien:this.state.desc_bien,
      bathrooms :this.state.bathrooms,
      dimensiones : this.state.dimensiones,
      direccion : this.state.direccion,
      habitaciones  : this.state.habitaciones,
      id_ciudad : this.state.id_ciudad,
      id_tipo_bien  : this.state.ptype,
      id_usuario  : id,
      identidad_propietario : this.state.identidad_propietario,
      latitud: MarkerPos.latitude.toString(),
      longitud: MarkerPos.longitude.toString(),
      nombre_propietario: this.state.nombre_propietario,
      parqueo: this.state.parqueo,
      pisos: this.state.pisos,
      precio: this.state.precio,
      seo: false,
      venta_renta: this.state.venta_renta
    };
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'api-token' : token},
                'credentials' :'include',
               
                body: JSON.stringify(datos
      )
    };
    const response = await fetch(REACT_APP_REQ+'/property/', requestOptions);
    const err = await response.text();
    let valid=(err.substring(0, 2))
    {if(valid === "<!"){
      Alert.alert(
        'Su sesión expiró',
        'Vuelva a iniciar sesión',
        [
          {
            text: 'OK'
          }
        ]
      )
      navigate("MemberSignIn")
    }}
    var data = JSON.parse(err);
    if(data.code == 201){
      this.setState({ postId: data.id });
      let veh = data.id_bien;
      this.state.images.forEach((foto) => {
        let myuuid=uuid.v4();
        var newFileName="BI-"+veh+"-"+myuuid+".jpg";
        const storageRef = st.ref(`/bienes/${newFileName}`);
        let Blob = RNFetchBlob.polyfill.Blob;
        let fs = RNFetchBlob.fs;
        window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest;
        window.Blob = Blob;
        let Fetch = RNFetchBlob.polyfill.Fetch
        window.fetch = new Fetch({
            auto : true,
            binaryContentTypes : [
                'image/',
                'video/',
                'audio/',
                'foo/',
            ]
          }).build()
          let uploadBlob = "";
          const mime = 'image/jpeg';
          fs.readFile(foto.uri, 'base64')
            .then((data) => Blob.build(data, { type: `${mime};BASE64` })
          ).then((blob) => {
            uploadBlob = blob;
            const task = storageRef.put(blob, { contentType: mime });
            task.on("state-changed", (snapshot)=>{
              console.log(snapshot);
            })
            let formFoto={
              id_bien: veh,
              nombre_foto: newFileName,
            } 
            const requestOptions_pic = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
                      
                        body: JSON.stringify(formFoto)
            }; 
            fetch(REACT_APP_REQ+'/property/pics/', requestOptions_pic);
          })
        });
        alert("Su solicitud fue ingresada correctamente")
        navigate('MemberAddPublished')
    }
    else
    {
      alert("Compruebe que todos los datos estén llenos")
    }
  };


  render() {
     
    const { datos } = this.state;
    let tabContent=""
    if (this.state.tabSelected === 'overview') {
      
      tabContent=
      <View style={styles.section}> 
      <View style={styles.row}>
        <Text style={styles.header} name="desc_bien">{__('Descripción de la propiedad')} </Text>
        <TextInput style={styles.textInputMulti} multiline numberOfLines={8}  placeholder={__('Descripción de la propiedad')} 
        onChangeText={(desc_bien) => this.setState({desc_bien})} value={this.state.desc_bien}/>
      </View>
      <View style={styles.row}>
          <Text style={styles.header} name="dimensiones">{__('Dimensiones')}</Text>
          <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={__('Dimensiones')} 
          onChangeText={(dimensiones) => this.setState({dimensiones})} 
          value={this.state.dimensiones}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.header} name="nombre_propietario">{__('Propietario actual')}</Text>
          <TextInput style={styles.textInput} placeholder={__('Propietario actual')} 
          onChangeText={(nombre_propietario) => this.setState({nombre_propietario})}
          value={this.state.nombre_propietario}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.header} name="identidad_propietario">{__('Identidad del propietario')}</Text>
          <TextInput style={styles.textInput} placeholder={__('Identidad del propietario')}
           onChangeText={(identidad_propietario) => this.setState({identidad_propietario})} 
           value={this.state.identidad_propietario}/>
        </View>
        <View style={styles.row}>
          <Text style={styles.header}>{__('Precio en Dólares')}</Text>
          <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={__('Precio en Dólares')}  name="precio" onChangeText={(precio) => this.setState({precio})}
          value={this.state.precio} />
        </View>
        <View style={styles.row}>
          <Text style={styles.header}>{__('Objetivo')}</Text>
          <View style={styles.bgGrey}>
            <Picker
              selectedValue={this.state.venta_renta} itemStyle={{height:50}}
              onValueChange={(itemValue, itemIndex) => this.setState({ venta_renta: itemValue })}>
              <Picker.Item label={__("Seleccione su objetivo")}/>  
              <Picker.Item label={__('Venta')} value="Venta" />
              <Picker.Item label={__('Renta')} value="Renta"
               />
            </Picker>
          </View>
        </View>
        
      <View style={styles.footerBtn}>
        <TouchableOpacity >
         
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtnActive} onPress={() => this.setState({ tabSelected: 'detalles' })} >
          <Text style={styles.nextText}>{__('Siguiente')}</Text>
          <Icon name='arrow-forward' type='MaterialIcons' style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
    </View>



    } else if (this.state.tabSelected === 'location') {
      if(this.state.latitud===0){
        this.getLoc()
      }
      tabContent=

      
      <View style={styles.section}>

      <MapView height={200}
          initialRegion={{latitude: MarkerPos.latitude,
            longitude: MarkerPos.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421}}
        >
        <Marker draggable
          coordinate={MarkerPos}
          onDragEnd={ (e) => ( MarkerPos=e.nativeEvent.coordinate)}
          />
        </MapView>
        <View style={styles.row}>
      </View>

        <View style={styles.row}>
        <Text style={styles.header_instruction} name="instruction">{__('Manten presionado el marcador para moverlo')}</Text>
      </View>
        
      <View style={styles.row}>
        <Text style={styles.header} name="direccion">{__('Dirección')}</Text>
        <TextInput style={styles.textInput} placeholder={'Dirección'}  onChangeText={(direccion) => this.setState({direccion})}
        value={this.state.direccion} />
      </View>


      <View style={styles.row}>
        <Text style={styles.header}>{__('País')}</Text>
        <View style={styles.bgGrey}>
          <Picker selectedValue={this.state.country} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => {if(itemValue!=this.state.country){this.getRegion(itemValue), this.getCiudad(0), this.setState({ country: itemValue})}}}>
            <Picker.Item label="Seleccione un país"/>  
            {this.state.dataSource.map((item)=>(
            <Picker.Item label={item.nombre_pais} value={item.id_pais} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.header}>{__('Región')}</Text>
        <View style={styles.bgGrey}>
          <Picker
            selectedValue={this.state.region} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => {if(itemValue!=this.state.region){this.getCiudad(itemValue), this.setState({ region: itemValue })}}}>
              <Picker.Item label="Seleccione una región" />  
            {this.state.dataSource1.map((item)=>(
            <Picker.Item label={item.nombre_region} value={item.id_region} />
            ))}
          </Picker>
        </View>
      </View>

      
      <View style={styles.row}>
        <Text style={styles.header} >{__('Ciudad')}</Text>
        <View style={styles.bgGrey}>
          <Picker
            selectedValue={this.state.id_ciudad} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => this.setState({ id_ciudad: itemValue })}>
            <Picker.Item label="Seleccione una ciudad"/> 
            {this.state.dataSource2.map((item)=>(
            <Picker.Item label={item.nombre_ciudad} value={item.id_ciudad} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.footerBtn}>
        <TouchableOpacity style={styles.previousBtn} onPress={() => this.setState({ tabSelected: 'detalles' })}>
          <Icon name='arrow-back' type='MaterialIcons' style={styles.previousIconDisabled} />
          <Text style={styles.previousTextDisabled}>{__('Anterior')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtnActive} onPress={() => this.setState({ tabSelected: 'photos' })} >
          <Text style={styles.nextText}>{__('Siguiente')}</Text>
          <Icon name='arrow-forward' type='MaterialIcons' style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
    </View>

    } else if (this.state.tabSelected === 'detalles') {
      if(this.state.latitud===0){
        this.getLoc()
      }
      tabContent=
      <View style={styles.section}>
<View style={styles.row}>
        <Text style={styles.header}>{__('Tipo de propiedad')}</Text>
        <View style={styles.bgGrey}>
          <Picker selectedValue={this.state.ptype} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => { this.setState({ ptype: itemValue})}}>
            <Picker.Item label="Seleccione un tipo de propiedad"/>  
            {this.state.dataProp.map((item)=>(
            <Picker.Item label={item.desc_tipo_bien} value={item.id_tipo_bien} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="habitaciones">{__('Habitaciones')}</Text>
        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={__('Número de habitaciones')} 
         onChangeText={(habitaciones) => this.setState({habitaciones})} value={this.state.habitaciones}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="bathrooms">{__('Baños')}</Text>
        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={__('Número de baños')} 
         onChangeText={(bathrooms) => this.setState({bathrooms})} value={this.state.bathrooms}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="pisos">{__('Pisos')}</Text>
        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={__('Número de pisos')} 
         onChangeText={(pisos) => this.setState({pisos})}  value={this.state.pisos}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="parqueo">{__('Parqueo')}</Text>
        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={__('Número de parqueos')} 
         onChangeText={(parqueo) => this.setState({parqueo})} value={this.state.parqueo} />
      </View>
      <View style={styles.footerBtn}>
          <TouchableOpacity style={styles.previousBtn} onPress={() => this.setState({ tabSelected: 'overview' })}>
            <Icon name='arrow-back' type='MaterialIcons' style={styles.previousIconDisabled} />
            <Text style={styles.previousTextDisabled}>{__('Anterior')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
          style={styles.nextBtnActive} onPress={() => this.setState({ tabSelected: 'location' })} >
          <Text style={styles.nextText}>{__('Siguiente')}</Text>
          <Icon name='arrow-forward' type='MaterialIcons' style={styles.nextIcon} />
        </TouchableOpacity>
        </View>

    
      </View>

    } else if (this.state.tabSelected === 'photos') {
      tabContent=
      <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.header}>{__('Subir Fotos')}</Text>
        <View style={styles.photoUpload}>
        <TouchableOpacity onPress={this.ChoosePics} style={styles.photoUploadBtn}>
	        <Text style={styles.text}>Seleccione las fotos</Text>
        </TouchableOpacity>   
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.header}>{__('Fotos')}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.photo}>
            {this.state.images
              ? this.state.images.map((i) => (
                  <View style={styles.photoItem} key={i.uri}>{this.renderAsset(i)}</View>
                ))
              : null}
        </View>
      </View>
      <View style={styles.container}>
      <View style={styles.checkboxContainer}>
        <Text style={styles.label}>Al hacer clic en "Agregar", aceptas nuestros  <Text style={styles.labellink}
      onPress={() => Linking.openURL('http://www.applocaliza.com/#/legal')}>Términos y Condiciones
      </Text>
      </Text>
     
      </View>
    </View>
      <View style={styles.footerBtn}>
        <TouchableOpacity style={styles.previousBtn} onPress={() => this.setState({ tabSelected: 'location' })}>
          <Icon name='arrow-back' type='MaterialIcons' style={styles.previousIconDisabled} />
          <Text style={styles.previousTextDisabled}>{__('Anterior')}</Text>
        </TouchableOpacity>
        <View style={styles.container}>
    </View>
        <TouchableOpacity
            style={styles.nextBtnActive}  onPress={this.onClickButton}>
            <Text style={styles.nextText}>{__('Agregar')}</Text>
            <Icon name='done' type='MaterialIcons' style={styles.nextIcon} />
          </TouchableOpacity>
      </View>
    </View>
      
    }
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Agregar Propiedad')} />
        <Content>
          <View >
            <View style={styles.information}>
              <View style={styles.propertyContent}>
                <TouchableOpacity style={this.state.tabSelected === 'overview' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'overview' })}>
                  <Text style={this.state.tabSelected === 'overview' ? styles.tabTextActive : styles.tabTextInactive}>{__('General')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'detalles' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'detalles' })}>
                  <Text style={this.state.tabSelected === 'detalles' ? styles.tabTextActive : styles.tabTextInactive}>{__('Detalles')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'location' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'location' })}>
                  <Text style={this.state.tabSelected === 'location' ? styles.tabTextActive : styles.tabTextInactive}>{__('Ubicación')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'photos' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'photos' })}>
                  <Text style={this.state.tabSelected === 'photos' ? styles.tabTextActive : styles.tabTextInactive}>{__('Fotos')}</Text>
                </TouchableOpacity>

              </View>
            </View>
            {tabContent}
          </View>
        </Content>
        <Footer currentScreen='Home' />
      </Container>
    )
  }
}

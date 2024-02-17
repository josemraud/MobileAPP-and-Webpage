import React, {Component} from 'react'
import { StatusBar, TouchableOpacity, TextInput, Image, ImageBackground, FlatList, Alert, ScrollView,Picker, Linking} from 'react-native'
import { Container, Content, Icon, Text, View, Accordion,CheckBox, Avatar } from 'native-base'
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
    super(props);
    this.state = {
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
      coun:"",
      reg:"",
      cit:"",
      image: null,
      images:[],
      usuario:[],
      desc_vehiculo: "",
      cabina: "",
      color: "",
      caja: "",
      combustible: "",
      kilometraje: "",
      marca: "",
      modelo: "",
      motor: "",
      placa: "",
      year: "",
      id_ciudad: "",
      id_tipo_vehiculo: "",
      id_usuario: id,
      identidad_propietario: "",
      nombre_propietario: "",
      precio: "",
      seo: false,
      usado_nuevo: "Usado"
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
      fetch(REACT_APP_REQ+'/vehicle/type/', {
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
      }); await fetch(REACT_APP_REQ+`/user/auth/${correo_us}`, {
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
      console.log(id);
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
      forceJpg: false,
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

 

  renderImage(image) {
    return (
      <Image
        style={{
          height: 120,
          width: 120}}
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
      desc_vehiculo: this.state.desc_vehiculo,
      cabina: this.state.cabina,
      color: this.state.color,
      caja: this.state.caja,
      combustible: this.state.combustible,
      kilometraje: this.state.kilometraje,
      marca: this.state.marca,
      modelo: this.state.modelo,
      motor: this.state.motor,
      placa: this.state.placa,
      year: this.state.year,
      id_ciudad: this.state.id_ciudad,
      id_tipo_vehiculo: this.state.ptype,
      id_usuario: id,
      identidad_propietario: this.state.identidad_propietario,
      nombre_propietario: this.state.nombre_propietario,
      precio: this.state.precio,
      seo: false,
      usado_nuevo: "Usado"
    };
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'api-token' : token},
                'credentials' :'include',
               
                body: JSON.stringify(datos
      )
    };
    const response = await fetch(REACT_APP_REQ+'/vehicle/', requestOptions);
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
      let veh = data.id_vehiculo;
      this.state.images.forEach((foto) => {
        let myuuid=uuid.v4();
        var newFileName="VH-"+veh+"-"+myuuid;
        const storageRef = st.ref(`/vehiculos/${newFileName}`);
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
              console.log(snapshot)
            })
            let formFoto={
              id_vehiculo: veh,
              nombre_foto: newFileName,
            } 
            const requestOptions_pic = {
              method: 'POST',
              headers: {'Content-Type': 'application/json'},
                      
                        body: JSON.stringify(formFoto)
            }; 
            fetch(REACT_APP_REQ+'/vehicle/pics/', requestOptions_pic);
          })
        });
        alert("Su solicitud fue ingresada correctamente")
        navigate('MemberAddPublished')
    }
    else
    {
      alert(data.code)
    }
  };


  render() {
    const { datos } = this.state;
    let tabContent=""
    if (this.state.tabSelected === 'overview') {
      tabContent=
      <View style={styles.section}> 
        
      <View style={styles.row}>
        <Text style={styles.header} name="desc_bien">{__('Descripción del vehículo')} </Text>
        <TextInput style={styles.textInputMulti} multiline numberOfLines={8}  placeholder={__('Descripción del bien')} 
        onChangeText={(desc_vehiculo) => this.setState({desc_vehiculo})} value={this.state.desc_vehiculo}/>
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
          <Text style={styles.header}>{__('Precio en dólares')}</Text>
          <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={__('Precio en dólares')}  name="precio" onChangeText={(precio) => this.setState({precio})}
          value={this.state.precio} />
        </View>


      <View style={styles.row}>
        <Text style={styles.header} name="marca">{__('Marca')}</Text>
        <TextInput style={styles.textInput} placeholder={__('Marca')} 
         onChangeText={(marca) => this.setState({marca})} value={this.state.marca}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="modelo">{__('Modelo')}</Text>
        <TextInput style={styles.textInput} placeholder={__('Modelo')} 
         onChangeText={(modelo) => this.setState({modelo})} value={this.state.modelo}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="year">{__('Año')}</Text>
        <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={__('Año')} 
         onChangeText={(year) => this.setState({year})}  value={this.state.year}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header} name="placa">{__('Placa')}</Text>
        <TextInput style={styles.textInput} placeholder={__('Placa')} 
         onChangeText={(placa) => this.setState({placa})} value={this.state.placa}/>
      </View>
     
     
      <View style={styles.footerBtn}>
        <TouchableOpacity >
         
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.nextBtnActive} onPress={() => this.setState({ tabSelected: 'location' })} >
          <Text style={styles.nextText}>{__('Siguiente')}</Text>
          <Icon name='arrow-forward' type='MaterialIcons' style={styles.nextIcon} />
        </TouchableOpacity>
      </View>
    </View>



    } else if (this.state.tabSelected === 'location') {
    
      tabContent=


      <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.header}>{__('País')}</Text>
        <View style={styles.bgGrey}>
          <Picker selectedValue={this.state.country} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => {if(itemValue!=this.state.country){this.getRegion(itemValue), this.getCiudad(0), this.setState({ country: itemValue})}}}>
            <Picker.Item label="Seleccione un país" isDisabled/>
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
            <Picker.Item label="Seleccione una ciudad" isDisabled/> 
            {this.state.dataSource2.map((item)=>(
            <Picker.Item label={item.nombre_ciudad} value={item.id_ciudad} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.footerBtn}>
        <TouchableOpacity style={styles.previousBtn} onPress={() => this.setState({ tabSelected: 'overview' })}>
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

      tabContent=
      <View style={styles.section}>
      <View style={styles.row}>
        <Text style={styles.header}>{__('Tipo de Vehículo')}</Text>
        <View style={styles.bgGrey}>
          <Picker selectedValue={this.state.ptype} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => { this.setState({ ptype: itemValue})}}>
            <Picker.Item label="Seleccione un tipo de vehículo" value="disabled" />  
            {this.state.dataProp.map((item)=>(
            <Picker.Item label={item.desc_tipo_vehiculo} value={item.id_tipo_vehiculo} />
            ))}
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
          <Text style={styles.header}>{__('Combustible')}</Text>
          <View style={styles.bgGrey}>
            <Picker
              selectedValue={this.state.combustible}
              onValueChange={(itemValue, itemIndex) => this.setState({ combustible: itemValue })}>
              <Picker.Item label="Seleccione el combustible" value={null}/>  
              <Picker.Item label={__('Gasolina')} value="Gasolina" />
              <Picker.Item label={__('Diesel')} value="Diesel"/>
              <Picker.Item label={__('Gas')} value="Gas" />
              <Picker.Item label={__('Eléctrico')} value="Eléctrico" style={styles.pickerText}/>
            </Picker>
          </View>
        </View>
        <View style={styles.row}>
        <Text style={styles.header} name="motor">{__('Motor')}</Text>
        <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={__('Motor')} 
         onChangeText={(motor) => this.setState({motor})}  value={this.state.motor}/>
      </View>
      <View style={styles.row}>
        <Text style={styles.header}>{__('Caja')}</Text>
        <View style={styles.bgGrey}>
          <Picker
            selectedValue={this.state.caja} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => this.setState({ caja: itemValue })}>
            <Picker.Item label="Seleccione el tipo de caja" value={null}/>  
            <Picker.Item label={__('Mecánica')} value="Mecánica" />
            <Picker.Item label={__('Automática')} value="Automática"/>
            <Picker.Item label={__('Tritónica')} value="Tritónica" />
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
        <Text style={styles.header}>{__('Cabina')}</Text>
        <View style={styles.bgGrey}>
          <Picker
            selectedValue={this.state.cabina} itemStyle={{height:50}}
            onValueChange={(itemValue, itemIndex) => this.setState({ cabina: itemValue })}>
            <Picker.Item label="Seleccione el tipo de cabina" value={null}/>  
            <Picker.Item label={__('Cabina sencilla')} value="Cabina sencilla" />
            <Picker.Item label={__('Cabina doble')} value="Cabina doble"/>
            <Picker.Item label={__('Cabina y media')} value="Cabina y media" />
          </Picker>
        </View>
      </View>
      <View style={styles.row}>
          <Text style={styles.header} name="color">{__('Color')}</Text>
          <TextInput style={styles.textInput} placeholder={__('Color')} 
          onChangeText={(color) => this.setState({color})} 
          value={this.state.color}/>
        </View>
        
        <View style={styles.row}>
          <Text style={styles.header}>{__('Kilometraje')}</Text>
          <TextInput keyboardType={'numeric'} style={styles.textInput} placeholder={__('Kilometraje')}  name="precio" onChangeText={(kilometraje) => this.setState({kilometraje})}
          value={this.state.kilometraje} />
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
          
          <TouchableOpacity style={styles.previousBtn} onPress={() => this.setState({ tabSelected: 'photos' })}>
            <Icon name='arrow-back' type='MaterialIcons' style={styles.previousIconDisabled} />
            <Text style={styles.previousTextDisabled}>{__('Anterior')}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.nextBtnActive}  onPress={this.onClickButton}>
            <Text style={styles.nextText}>{__('Agregar')}</Text>
            <Icon name='done' type='MaterialIcons' style={styles.nextIcon} />
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
      <View style={styles.footerBtn}>
        <TouchableOpacity style={styles.previousBtn} onPress={() => this.setState({ tabSelected: 'location' })}>
          <Icon name='arrow-back' type='MaterialIcons' style={styles.previousIconDisabled} />
          <Text style={styles.previousTextDisabled}>{__('Anterior')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.nextBtnActive} onPress={() => this.setState({ tabSelected: 'detalles' })} >
            <Text style={styles.nextText}>{__('Siguiente')}</Text>
            <Icon name='arrow-forward' type='MaterialIcons' style={styles.nextIcon} />
          </TouchableOpacity>
      </View>
    </View>
      
    }
    return (
      <Container style={theme.layoutFx}>
        <Header navLeftType='back' statusBarType='dark' navMiddleType='medium' title={__('Agregar Vehículo')} />
        <Content>
          <View >
            <View style={styles.information}>
              <View style={styles.propertyContent}>
                <TouchableOpacity style={this.state.tabSelected === 'overview' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'overview' })}>
                  <Text style={this.state.tabSelected === 'overview' ? styles.tabTextActive : styles.tabTextInactive}>{__('General')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'location' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'location' })}>
                  <Text style={this.state.tabSelected === 'location' ? styles.tabTextActive : styles.tabTextInactive}>{__('Ubicación')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'photos' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'photos' })}>
                  <Text style={this.state.tabSelected === 'photos' ? styles.tabTextActive : styles.tabTextInactive}>{__('Fotos')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={this.state.tabSelected === 'detalles' ? styles.tabActive : styles.tabInactive} onPress={() => this.setState({ tabSelected: 'detalles' })}>
                  <Text style={this.state.tabSelected === 'detalles' ? styles.tabTextActive : styles.tabTextInactive}>{__('Detalles')}</Text>
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

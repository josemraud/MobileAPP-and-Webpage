import React from 'react'
import { StatusBar, TouchableOpacity, Button, Image, ImageBackground } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { Container, Content, Icon, Text, View } from 'native-base'
import MapView, { Marker } from 'react-native-maps'

import styles from './styles'
import DatePicker from '@component/Form/DatePicker'
import TimePicker from '@component/Form/TimePicker'
import { navigate } from '@utility/navigation'
import theme from '@theme/styles'
import { __ } from '@utility/translation'
import request from '@utility/request'
import { bind } from '@utility/component'
import galleryList from './data/gallery'
import Similar from './Similar'
import similarList from './data/similar'
import Header from '@component/Header'
import Footer from '@component/FooterBienes'
import {REACT_APP_REQ} from '@env'

import Thumbnail from './Thumbnail'
import GalleryList from './GalleryList'

let id="";
let usuario = "";
let dato = "";
const getDato = async() => {
  try{
  const result = await AsyncStorage.getItem('bien');
  dato=result;
}catch(error){
  console.log(error);
}
}

const getCorreo = async() => {
  try{
  const result = await AsyncStorage.getItem('correo');
  usuario=result;
  console.log(usuario)

}catch(error){
  console.log(error);
}
}

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121
      },
      language: 'es',
      tabSelected: 'info',

      user: [],
      bienes: [],

      galleryList: [],
      fetchingGalleryList: true,

      similarList: [],
      fetchSimilarList: true

    }

    bind(this)

    this.fetchingGalleryList = this.fetchingGalleryList.bind(this)
  }

  async componentDidMount () {
    await getCorreo();
    await fetch(REACT_APP_REQ+`/user/auth/${usuario}`, {
         method: 'GET',
         headers: {'Content-Type': 'application/json'}
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            user: responseJson.data,
         })
      })
      .catch((error) => {
         console.error(error);
      });
      
     const {user} = this.state;
      user.map((user, i) => (
        id=(user.id_usuario)
      ))
      console.log(id);
    await getDato();
    await fetch(REACT_APP_REQ+`/property/${dato}`, {
         method: 'GET',
         headers: {'Content-Type': 'application/json'}
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            bienes: responseJson.data,
         })
      })
      .catch((error) => {
         console.error(error);
      });
    const language = await AsyncStorage.getItem('language')
    await this.promisedSetState({
      language
    })
    await this.fetchingGalleryList()
  }

  async fetchingGalleryList () {
    await this.promisedSetState({
      fetchingGalleryList: true
    })
    const list = await request(galleryList)
    await this.promisedSetState({
      galleryList: list,
      fetchingGalleryList: false
    })
  }
  async onClickButton() {
    const token = await AsyncStorage.getItem('token');
    let datos={
      id_usuario : id,
      id_bien:dato,
      
    };
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'api-token' : token},
                'credentials' :'include',
               
                body: JSON.stringify(datos
      )
    };
    const response = await fetch(REACT_APP_REQ+'/property/appointment/', requestOptions);
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
    }
  else{
    alert("Nuestro equipo se pondrá en contacto con usted")

  }}
  }
  render () {
    
    const {bienes}=this.state;
    return (
      bienes.map((bien, i) => (
        <Container style={theme.layoutFx}>
          <StatusBar backgroundColor='rgba(0,0,0,0)' animated barStyle='dark-content' />
          <Header statusBarType='dark' navLeftType='back' navMiddleType='medium' title={__('Detalles de Propiedad')}/>
          <Content contentContainerStyle={theme.layout}>
            
            <Thumbnail img={bien.id_bien}/>
            <View style={styles.propertyContainer}>
              <View style={theme.row}>
                <Text style={styles.propertyPrice}>$ {bien.precio}</Text>
              </View>
              <View style={styles.propertyLocation}>
                <Icon active name='map-marker-radius' style={styles.locationIcon} type='MaterialCommunityIcons' />
                <Text style={styles.locationInfo}>{bien.direccion}</Text>
              </View>
            </View>
            <View style={styles.count}>
              <View style={[styles.countItem, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='bed' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.habitaciones}</Text>
                    <Text style={styles.countText}>{__('Cuartos')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem}>
                <View style={styles.countCol}>
                  <Icon name='bathtub' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.bathrooms}</Text>
                    <Text style={styles.countText}>{__('Baños')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem}>
                <View style={styles.countCol}>
                  <Icon name='expand' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.dimensiones}</Text>
                    <Text style={styles.countText}>m²</Text>
                  </View>
                </View>
              </View>
            </View>
            <ImageBackground source={require('@asset/images/shadow.png')} imageStyle='cover' style={styles.bg} />
            <View style={styles.overview}>
              <Text style={styles.overviewTitle}>{__('Descripción')}</Text>
              <Text style={styles.overviewDesc}>{bien.desc_bien}
              </Text>
            </View>
            <View>
            <View style={styles.gallery}>
          <Text style={styles.galleryTitle}>{__('Galería')}</Text>
        </View>
              <GalleryList img={bien.id_bien}/>
            </View>
            <View style={styles.location}>
              <Text style={styles.locationTitle}>{__('Ubicación')}</Text>
              <View style={styles.locationMap}>
                <MapView
                  region={{latitude: parseFloat(bien.latitud),
                          longitude: parseFloat(bien.longitud),
                          latitudeDelta: 0.015,
                          longitudeDelta: 0.0121}}
                  style={styles.mapCoOrdinates}
                >
                  <Marker
                    coordinate={{latitude: parseFloat(bien.latitud),
                      longitude: parseFloat(bien.longitud),
                      latitudeDelta: 0.015,
                      longitudeDelta: 0.0121}}
                  />
                </MapView>
              </View>
            </View>


            <View style={styles.count1}>
              <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='building' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.desc_tipo_bien}</Text>
                    <Text style={styles.countText}>{__('Tipo')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='expand' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.dimensiones} m²</Text>
                    <Text style={styles.countText}>{__('Tamaño')}</Text>
                  </View>
                </View>
              </View>
            </View>


            <View style={styles.count1}>
            <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='level-up-alt' type='FontAwesome5' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.pisos}</Text>
                    <Text style={styles.countText}>{__('Pisos')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='bed' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.habitaciones}</Text>
                    <Text style={styles.countText}>{__('Habitaciones')}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.count1}>
            <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='bathtub' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.bathrooms}</Text>
                    <Text style={styles.countText}>{__('Baños')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='car' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{bien.parqueo}</Text>
                    <Text style={styles.countText}>Estacionamientos</Text>
                  </View>
                </View>
              </View>
              </View>


            <View>
              <View style={styles.owner}>
                <Text style={styles.ownerTitle}>{__('Contacta a nuestros agentes')}</Text>
                <View style={styles.ownerAvatar}>
                  <Image source={require('@asset/images/logolo.png')} style={styles.ownerAvatarImg} />
                </View>
                <Button
                    title="Solicitar una cita"
                    color="#F68031"
                    onPress={this.onClickButton}
                  />
              </View>
            </View>
          </Content>
          <Footer currentScreen='Home'/>
        </Container>
  ))
    )
  }
}

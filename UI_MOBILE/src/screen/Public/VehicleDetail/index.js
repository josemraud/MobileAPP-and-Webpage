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
import Footer from '@component/FooterVehiculos'

import Thumbnail from './Thumbnail'
import GalleryList from './GalleryList'
import {REACT_APP_REQ} from '@env'

let id="";
let usuario = "";
let dato = "";
const getDato = async() => {
  try{
  const result = await AsyncStorage.getItem('vehiculo');
  dato=result;
}catch(error){
  console.log(error);
}
}

const getCorreo = async() => {
  try{
  const result = await AsyncStorage.getItem('correo');
  usuario=result;

}catch(error){
  console.log(error);
}
}

export default class extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      language: 'es',
      tabSelected: 'info',

      user: [],
      vehiculos: [],

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
    await fetch(REACT_APP_REQ+`/vehicle/${dato}`, {
         method: 'GET',
         headers: {'Content-Type': 'application/json'}
      })
      .then((response) => response.json())
      .then((responseJson) => {
         this.setState({
            vehiculos: responseJson.data,
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
      id_vehiculo: dato,
      
    };
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json',
                'api-token' : token},
                'credentials' :'include',
               
                body: JSON.stringify(datos
      )
    };
    const response = await fetch(REACT_APP_REQ+'/vehicle/appointment/', requestOptions);
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
    
    const {vehiculos}=this.state;
    return (
      vehiculos.map((vehiculo, i) => (
        <Container style={theme.layoutFx}>
          <StatusBar backgroundColor='rgba(0,0,0,0)' animated barStyle='dark-content' />
          <Header statusBarType='dark' navLeftType='back' navMiddleType='medium' title={__('Detalles de Propiedad')}/>
          <Content contentContainerStyle={theme.layout}>
            
            <Thumbnail img={vehiculo.id_vehiculo}/>
            <View style={styles.propertyContainer}>
              <View style={theme.row}>
                <Text style={styles.propertyPrice}>$ {vehiculo.precio}</Text>
              </View>
              <View style={styles.propertyLocation}>
                <Icon active name='map-marker-radius' style={styles.locationIcon} type='MaterialCommunityIcons' />
                <Text style={styles.locationInfo}>{vehiculo.marca} {vehiculo.modelo} {vehiculo.year}</Text>
              </View>
            </View>
            <View style={styles.count}>
              <View style={[styles.countItem, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='car' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.cabina}</Text>
                    <Text style={styles.countText}>{__('Cabina')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem}>
                <View style={styles.countCol}>
                  <Icon name='gas-pump' type='FontAwesome5' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.combustible}</Text>
                    <Text style={styles.countText}>{__('Combustible')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem}>
                <View style={styles.countCol}>
                  <Icon name='tachometer' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.kilometraje}</Text>
                    <Text style={styles.countText}>km</Text>
                  </View>
                </View>
              </View>
            </View>
            <ImageBackground source={require('@asset/images/shadow.png')} imageStyle='cover' style={styles.bg} />
            <View style={styles.overview}>
              <Text style={styles.overviewTitle}>{__('Descripción')}</Text>
              <Text style={styles.overviewDesc}>{vehiculo.desc_vehiculo}
              </Text>
            </View>
            <View>
            <View style={styles.gallery}>
          <Text style={styles.galleryTitle}>{__('Galería')}</Text>
        </View>
              <GalleryList img={vehiculo.id_vehiculo}/>
            </View>
            

            <View style={styles.count}>
              <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='truck' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.desc_tipo_vehiculo}</Text>
                    <Text style={styles.countText}>{__('Tipo de Vehiculo')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='car' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.cabina}</Text>
                    <Text style={styles.countText}>{__('Cabina')}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.count}>
              
              <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='building' type='FontAwesome5' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.marca}</Text>
                    <Text style={styles.countText}>{__('Marca')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='car-side' type='FontAwesome5' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.modelo}</Text>
                    <Text style={styles.countText}>{__('Modelo')}</Text>
                  </View>
                </View>
              </View>
            </View>


            <View style={styles.count}>
              <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='cogs' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.motor}</Text>
                    <Text style={styles.countText}>{__('Motor')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='certificate' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.usado_nuevo}</Text>
                    <Text style={styles.countText}>{__('Estado')}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.count}>
              <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='gas-pump' type='FontAwesome5' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.combustible}</Text>
                    <Text style={styles.countText}>{__('Combustible')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='wrench' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.caja}</Text>
                    <Text style={styles.countText}>{__('Caja')}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.count}>
              <View style={[styles.countItem1, styles.countFirst]}>
                <View style={styles.countCol}>
                  <Icon name='palette' type='FontAwesome5' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.color}</Text>
                    <Text style={styles.countText}>{__('Color')}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.countItem1}>
                <View style={styles.countCol}>
                  <Icon name='tachometer' type='FontAwesome' style={styles.countIcon} />
                  <View>
                    <Text style={styles.countNo}>{vehiculo.kilometraje}</Text>
                    <Text style={styles.countText}>km</Text>
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

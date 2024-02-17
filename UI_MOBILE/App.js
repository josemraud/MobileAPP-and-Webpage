import React from 'react'
import { Dimensions } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createDrawerNavigator } from '@react-navigation/drawer'
/* Drawer Menu */
import DrawerContent from '@component/Menu/Left'

/* Public Screens */
import PublicHome from '@screen/Public/Home'
import PublicLanguage from '@screen/Public/Language'
import PublicAboutUs from '@screen/Public/AboutUs'
import PublicContact from '@screen/Public/Contact'
import PublicProperties from '@screen/Public/Properties'
import PublicVehicles from '@screen/Public/Vehicles'
import PublicPropertyDetail from '@screen/Public/PropertyDetail'
import PublicVehicleDetail from '@screen/Public/VehicleDetail'
import PublicPropertySearch from '@screen/Public/PropertySearch'


/* Members Screens */
import CentroLocaliza from '@screen/Member/CentroLocaliza'
import MemberBienes from '@screen/Member/Bienes'
import MemberVehiculos from '@screen/Member/Vehiculos'
import MemberVehicleSearch from '@screen/Member/VehicleSearch'
import MemberVehicleAdd from '@screen/Member/VehicleAdd'
import MemberHomeScreen from '@screen/Member/HomeScreen'
import MemberPro from '@screen/Member/Home'
import MemberFavorites from '@screen/Member/Favorites'
import MemberProperties from '@screen/Member/Properties'
import MemberPropertyAdd from '@screen/Member/PropertyAdd'
import MemberAddPublished from '@screen/Member/AddPublished'
import MemberProfile from '@screen/Member/Profile'
import MemberSettings from '@screen/Member/Settings'
import MemberPayment from '@screen/Member/Payment'
import MemberComplaints from '@screen/Member/Complaints'
import MemberSignUp from '@screen/Member/SignUp'
import MemberOTP from '@screen/Member/OTP'
import MemberSignIn from '@screen/Member/SignIn'
import MemberForgotPassword from '@screen/Member/ForgotPassword'

/* Navigation */
import { navigationRef } from '@utility/navigation'
import { setDefaultLocale } from '@utility/translation'
import AsyncStorage from '@react-native-community/async-storage'


const Stack = createStackNavigator()
const Drawer = createDrawerNavigator()

const { width } = Dimensions.get('window')

const forFade = ({ current, closing }) => ({
  cardStyle: {
    opacity: current.progress
  }
})

const options = {
  cardStyleInterpolator: forFade
}

function DrawerRoot() {
  return (
    <Drawer.Navigator
      initialRouteName='Drawer'
      drawerContent={(props) => <DrawerContent {...props} />}
      drawerStyle={{ width: width - 100 }}
    >
      <Drawer.Screen name='MemberHomeScreen' component={MemberHomeScreen} />
      <Drawer.Screen name='MemberBienes' component={MemberBienes} />
      <Drawer.Screen name='MemberVehiculos' component={MemberVehiculos} />
    </Drawer.Navigator>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      initialhomscreen: "MemberSignIn",
      isAppInitiated: false
    }

    this.checkIsAppInitiated = this.checkIsAppInitiated.bind(this)
  }

  async componentDidMount() {
    this.InitialHome();
    await this.checkIsAppInitiated();
  }

  async checkIsAppInitiated() {
    await setDefaultLocale()
    this.setState({
      isAppInitiated: true
    })
  }
  async InitialHome(){
    if((await AsyncStorage.getItem('token')).toString()===null){
      this.setState({
        initialhomscreen: 'MemberSignIn'
      })
    }else {
      this.setState({
        initialhomscreen: 'MemberHomeScreen'
      })
    }
  }

  render() {
    if (!this.state.isAppInitiated) {
      return null
    }
    return (
      <NavigationContainer ref={navigationRef}> 
        <Stack.Navigator initialRouteName={this.state.initialhomscreen} headerMode='none'>
      
          <Stack.Screen name='Drawer' component={DrawerRoot} />
          <Stack.Screen name='PublicLanguage' component={PublicLanguage} options={options} />
          <Stack.Screen name='PublicAboutUs' component={PublicAboutUs} options={options} />
          <Stack.Screen name='PublicContact' component={PublicContact} options={options} />
          <Stack.Screen name='PublicProperties' component={PublicProperties} options={options} />
          <Stack.Screen name='PublicVehicles' component={PublicVehicles} options={options} />
          <Stack.Screen name='PublicPropertyDetail' component={PublicPropertyDetail} options={options} />
          <Stack.Screen name='PublicVehicleDetail' component={PublicVehicleDetail} options={options} />
          <Stack.Screen name='PublicPropertySearch' component={PublicPropertySearch} options={options} />
          <Stack.Screen name='PublicHome' component={PublicHome} options={options} />

          <Stack.Screen name='MemberVehicleAdd' component={MemberVehicleAdd} options={options} />
          <Stack.Screen name='CentroLocaliza' component={CentroLocaliza} options={options} />
          <Stack.Screen name='MemberBienes' component={MemberBienes} options={options} />
          <Stack.Screen name='MemberVehiculos' component={MemberVehiculos} options={options} />
          <Stack.Screen name='MemberVehicleSearch' component={MemberVehicleSearch} options={options} />
          <Stack.Screen name='MemberPro' component={MemberPro} options={options} />
          <Stack.Screen name='MemberSignUp' component={MemberSignUp} options={options} />
          <Stack.Screen name='MemberOTP' component={MemberOTP} options={options} />
          <Stack.Screen name='MemberSignIn' component={MemberSignIn} options={options} />
          <Stack.Screen name='MemberForgotPassword' component={MemberForgotPassword} options={options} />
          <Stack.Screen name='MemberFavorites' component={MemberFavorites} options={options} /> 
          <Stack.Screen name='MemberProperties' component={MemberProperties} options={options} />
          <Stack.Screen name='MemberPropertyAdd' component={MemberPropertyAdd} options={options} />
          <Stack.Screen name='MemberAddPublished' component={MemberAddPublished} options={options} />
          <Stack.Screen name='MemberProfile' component={MemberProfile} options={options} />
          <Stack.Screen name='MemberSettings' component={MemberSettings} options={options} />
          <Stack.Screen name='MemberPayment' component={MemberPayment} options={options} />
          <Stack.Screen name='MemberComplaints' component={MemberComplaints} options={options} />
         
        </Stack.Navigator>
       
      </NavigationContainer>
    )
  }
}

import React, { Component } from 'react';
import storage from '@react-native-firebase/storage';
import styles from './styles';
import firebase from 'firebase';
import { Image } from 'react-native'

let casa = "";
let name = "";
class Display extends Component {
    constructor(props) {
        super(props);
        casa=props.casa;
        name=props.name;
       console.log(props.name);
        this.state = {
            image: '',
            loading: false
        };
       this.getImage('image');
    }

    getImage (image) {
      const imageRef = firebase.storage().ref('/vehiculos/' + name);
      console.log(name);
       imageRef.getDownloadURL().then((url) => {
          this.state.image = url
          this.setState(this.state)
        })
      }

    render() {
        return (
          <Image source={{uri: this.state.image}} style={styles.propertyImg}  />
        );
    }
}

export default Display;
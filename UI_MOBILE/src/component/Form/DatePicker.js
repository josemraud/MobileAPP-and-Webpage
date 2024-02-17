import React from 'react'
import { TouchableOpacity, Text, Platform, View } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import Dialog from 'react-native-dialog'
import PropTypes from 'prop-types'
import moment from 'moment'

import { bind } from '@utility/component'

class Picker extends React.Component {
  constructor (props) {
    super(props)

    const date = moment(props.value, props.format)

    this.state = {
      visibleDateTimePicker: false,
      date: date.isValid() ? date : null
    }

    bind(this)

    this.open = this.open.bind(this)
    this.onCancelIos = this.onCancelIos.bind(this)
    this.onOkIos = this.onOkIos.bind(this)
    this.renderPicker = this.renderPicker.bind(this)
    this.renderIOS = this.renderIOS.bind(this)
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevProps.value !== this.props.value) {
      const date = moment(this.props.value, this.props.format)
      this.setState({
        date: date.isValid() ? date : null
      })
    }
  }

  async open () {
    const date = moment(this.props.value, this.props.format)
    await this.promisedSetState({
      visibleDateTimePicker: true,
      date: date.isValid() ? date : null
    })
  }

  onCancelIos () {
    this.setState({
      visibleDateTimePicker: false
    })
  }

  async onOkIos () {
    await this.promisedSetState({
      visibleDateTimePicker: false
    })
    await this.props.onChange(this.state.date ? this.state.date.format(this.props.format) : '')
  }

  renderPicker () {
    const { onChange, value, ...props } = this.props

    return (
      <DateTimePicker
        testID='dateTimePicker'
        timeZoneOffsetInMinutes={0}
        value={this.state.date ? this.state.date.toDate() : (new Date())}
        mode='date'
        display='calendar'
        {...props}
        onChange={async (event, date) => {
          if (date === undefined) {
            await this.promisedSetState({
              visibleDateTimePicker: false
            })
          } else {
            const m = moment(date)
            await this.promisedSetState({
              date: m.isValid() ? m : null
            })
            if (Platform.OS === 'android') {
              this.onOkIos()
            }
          }
        }}
      />
    )
  }

  renderIOS () {
    return (
      <Dialog.Container visible>
        <Dialog.Title>Date</Dialog.Title>
        <View>{this.renderPicker()}</View>
        <Dialog.Button label='Cancel' onPress={this.onCancelIos} />
        <Dialog.Button label='Ok' onPress={this.onOkIos} />
      </Dialog.Container>
    )
  }

  render () {
    let picker
    if (this.state.visibleDateTimePicker) {
      if (Platform.OS === 'android') {
        picker = this.renderPicker()
      } else if (Platform.OS === 'ios') {
        picker = this.renderIOS()
      }
    }

    const buttonProps = {}
    if (this.props.buttonStyle) {
      buttonProps.style = this.props.buttonStyle
    }

    const textProps = {}
    if (this.props.textStyle) {
      textProps.style = this.props.textStyle
    }

    return (
      <>
        <TouchableOpacity {...buttonProps} onPress={this.open}>
          <Text {...textProps}>
            {this.state.date ? this.state.date.format(this.props.displayFormat) : this.props.placeholder}
          </Text>
          {this.props.componentRight}
        </TouchableOpacity>
        {picker}
      </>
    )
  }
}

Picker.propTypes = {
  placeholder: PropTypes.string,
  format: PropTypes.string,
  displayFormat: PropTypes.string,
  buttonStyle: PropTypes.object,
  textStyle: PropTypes.object,
  componentRight: PropTypes.element
}

Picker.defaultProps = {
  placeholder: '',
  format: 'YYYY-MM-DD',
  displayFormat: 'DD/MM/YYYY',
  buttonStyle: null,
  textStyle: null,
  renderRight: null
}

export default Picker

import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import EcoRecherche from '../../components/geo/EcoRecherche'

export class geoLoc extends Component {
  render() {
    return (
      <ScrollView>
        <EcoRecherche/>
      </ScrollView>
    )
  }
}

export default geoLoc

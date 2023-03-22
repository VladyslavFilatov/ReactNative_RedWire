import React from 'react'
import { View, Text, ScrollView, StyleSheet } from 'react-native'

const ContentShow = ({params}) => {

    /* const text = `<p>it is a long established fact that a reader will be distracted 
    by the readable content of a page when looking at its layout.</p>
    <p>it is a long established fact that a reader will be distracted by the 
    readable content of a page when looking at its layout.</p>
    <p>it is a long established fact that a reader will be distracted by the r
    eadable content of a page when looking at its layout.</p>` */

  return (
    <View>
      <View style={{padding:10}}>
        <Text style={styles.acticleTtitle}>
            {params.postData.title}
        </Text>
        <Text style={styles.acticleContent}>
            {params.postData.content.replace(/<p>/g,"").replace(/<\/p>/g,"\n\n")}
            </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    acticleTtitle:{
        fontSize: 30,
        marginBottom: 30,
        fontWeight: '300',
        color: '#444444',
    },
    acticleContent: {
        fontSize: 18,
        color: '#444444',
    }
})
export default ContentShow
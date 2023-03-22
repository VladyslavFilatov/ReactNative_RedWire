import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import ContentShow from '../../../../utils/contentShow'
import YouTube from 'react-native-youtube';
import Video from 'react-native-video';
import { useRoute } from '@react-navigation/native';


const VideoScreen = () => {

  const {params} = useRoute();
  return (
    <ScrollView>
      <View>
        <YouTube
          videoId={params.postData.videoId}
          style={{alignSelf:'stretch',height:300}}
          play={false}
          onReady= {e => console.log('ready')}
          onChangeState={e => console.log(e)}
          onError={error => console.log(error)}
        />
        <ContentShow params={params}/>
      </View>
    </ScrollView>
  )
}

export default VideoScreen;
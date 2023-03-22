import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import { getArticles, getMoreArticles } from '../../../store/actions';

const HomeScreen = ({navigation}) => {
  const [loadingMore, setLoadingMore] = useState(false);
  const articles = useSelector(state => state.articles);
  const dispatch= useDispatch();

  useEffect(() => {
    dispatch(getArticles())
  },[dispatch])

  const renderCard = () => (
    articles.posts.map((item) => (
      <TouchableOpacity
        key={item.id}
        onLongPress={() => navigation.navigate('Article_screen', {
          id: item.id,
          postData: item
        })}
        >
        <Card>
          <Card.Title style={styles.cardTitle}>
            <Text>{item.title}</Text>
          </Card.Title>
          <Card.Divider/>
          <Text style={styles.cardText}>
            {item.excerpt}
          </Text>
        </Card>
      </TouchableOpacity>
    ))

  )

  const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
    const paddingToBottom = 50;
    return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
  }
  return (
    <ScrollView 
      onScroll={({nativeEvent}) => {
        if(isCloseToBottom(nativeEvent)){
          if(!loadingMore){
            setLoadingMore(true)
            dispatch(getMoreArticles(articles)).then(() => {
              setLoadingMore(false);
            })
          }
        }
      }}
      scrollEventThrottle={400}
    >
      { articles && articles.posts ?
        renderCard()
        : null
      }
      {loadingMore ?
        <View style={{marginTop:50, marginBottom: 50}}>
          <ActivityIndicator color='black'/>
        </View>
        : null
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  cardTitle: {
    fontSize: 20,
    textAlign: 'left',
  },
  cardText:{
    marginBottom: 10,
    marginTop: 10,
  }
});

export default HomeScreen;
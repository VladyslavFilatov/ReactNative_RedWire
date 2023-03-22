import React, { Component } from 'react';
import { Platform, View, Text } from 'react-native';
import { createNativeStackNavigator, HeaderTitle } from '@react-navigation/native-stack';
import { Colors, LogoText, CustomHeader } from '../utils/tools';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import VideosScreen from '../components/home/videos';
import VideoScreen from '../components/home/videos/video'
import HomeScreen from '../components/home/articles';
import ArticleScreen from '../components/home/articles/article'
import { BottomSheet } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import { color } from 'react-native-reanimated';



export const Stack = createNativeStackNavigator();

const LeftIcon = () => {
    const navigation = useNavigation()
    return(
        <View style={{margin:10}}>
            <AntDesign name="menufold" size={30} color={Colors.white} onPress={() => navigation.openDrawer()}/>
        </View>
    )
}

//<Text style={{color:Colors.white, fontSize:20}} onPress={() => navigation.openDrawer()}>||||</Text>


export const screenOptions = {
    headerTitleAlign:'center',
    headerTintColor: Colors.red,
    headerStyle:{
        backgroundColor: Colors.black,
        borderBottomWidth: 6,
        borderBottomColor: Colors.red,
        height: Platform.OS === 'ios' ? 110 : 60,
    },
    headerTitle: () => <LogoText style={{fontSize:25}}/>
}

export const VideosStack = () => (
    <Stack.Navigator
        screenOptions={{
            //headerLeft: (props) => <LeftIcon/>,
            ...screenOptions
        }}
        initialRouteName='Videos_screen'
    >
        <Stack.Screen name='Videos_screen' component={VideosScreen} options={{headerLeft: (props) => <LeftIcon/>}}/>
        
    </Stack.Navigator>
)

export const HomeStack = () => (
    <Stack.Navigator
        screenOptions={{
            //header: (props) => <CustomHeader />,
            //headerLeft: (props) => <LeftIcon/>,
            ...screenOptions,
            headerBackTitleVisible:false
        }}
        initialRouteName='Home_screen'
    >
        <Stack.Screen name='Home_screen' component={HomeScreen} options={{headerLeft: (props) => <LeftIcon/>}}/>
        <Stack.Screen name='Article_screen' component={ArticleScreen} />
    </Stack.Navigator>
)
//options={{headerShown:false}}
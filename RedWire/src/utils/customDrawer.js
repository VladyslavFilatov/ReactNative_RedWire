import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { Button } from '@rneui/base';
import { Colors, LogoText } from './tools';
import { useDispatch } from 'react-redux';
import  { logoutUser } from '../store/actions'

const SideDrawerCustom = (props) => {

    const dispatch = useDispatch();

    const mainOptions = [
        { title:'News',location:"Home" },
        { title:'Videos',location:"Videos" },
        { title:'Profile',location:"Profile" }
    ]

  return (
    <DrawerContentScrollView {...props}>
        <View>
            <LogoText
                style={{fontSize:40, textAlign:'center',color:Colors.black2}}
            />
        </View>
        { mainOptions.map((item) => (
            <Button
                key={item.location}
                title={item.title}
                onPress={() => props.navigation.navigate(item.location)}
                buttonStyle={styles.drawerButton}
                titleStyle={{width:'100%'}}
            />
        ))}
        <Button
            title="Logout"
            onPress={() => dispatch(logoutUser())}
            buttonStyle={styles.drawerButton}
            titleStyle={{width:'100%'}}
        />
        
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
    drawerButton: {
        backgroundColor: Colors.black,
        borderBottomWidth: 1,
        borderBottomColor: Colors.black2,
    }
})

export default SideDrawerCustom;
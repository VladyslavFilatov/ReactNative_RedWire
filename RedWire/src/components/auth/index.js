import React, { useState, useCallback, useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from '@rneui/base';
import {LogoText, Colors, showToast } from '../../utils/tools';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { registerUser, loginUser, clearAuthError } from '../../store/actions';
import { useFocusEffect } from '@react-navigation/native';

const AuthScreen = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error)
  const [ formType, setFormType ] = useState(true)
  const [ securEntry, setSecureEntry ] = useState(true);
  const [loading, setLoading] = useState(false)

  const handleSubmit = (values) => {
    setLoading(true)
    if (formType){
      // register
      dispatch(registerUser(values));
      
    } else {
      //sing in
      dispatch(loginUser(values))
    }
  }

  useEffect(() => {
    if (error) {
      showToast('error', 'Sorry', error)
      setLoading(false)
    }
  },[error])

  useFocusEffect(
    useCallback(()=>{
      return () => dispatch(clearAuthError())
    },[])
  )

  return (
    <ScrollView contentContainerStyle={styles.contentContainer}>
      <View style={styles.conteiner}>
        <LogoText/>
        <Formik 
          initialValues={{email:'', 
          password:''}}
          validationSchema={Yup.object({
            email: Yup.string()
            .email('Invalid email adress')
            .required('The email is required'),
            password: Yup.string()
            .max(10, 'Must be 10 or less')
            .required('The password is required'),
          })}
          onSubmit={ values => handleSubmit(values) }
        >
          { ({handleChange, handleBlur, handleSubmit, values, touched, errors}) => (
            <>
              <Input
                placeholder='Email'
                leftIcon = {{ type:'antdesing', name:'mail', color:Colors.white }}
                inputStyle={styles.inputStyle}
                placeholderTextColor={Colors.grey}
                inputContainerStyle={styles.inputContainerStyle}

                renderErrorMessage={ errors.email && touched.email }
                errorMessage={ errors.email }
                errorStyle={{ color:Colors.black }}

                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
              />
              <Input
                placeholder='Password'
                secureTextEntry={securEntry}
                leftIcon = {{ type:'antdesing', name:'lock', color:Colors.white }}
                inputStyle={styles.inputStyle}
                placeholderTextColor={Colors.grey}
                inputContainerStyle={styles.inputContainerStyle}
                rightIcon = {{
                  type:'entypo', 
                  name: securEntry ? 'eye' : 'eye-with-line',
                  //color:Colors.white 
                  onPress: () => setSecureEntry(!securEntry) 
                }}

                renderErrorMessage={ errors.password && touched.password }
                errorMessage={ errors.password }
                errorStyle={{ color:Colors.black }}

                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />
              <Button
                title={ formType ? 'Register' : 'Login' }
                buttonStyle= {{
                  backgroundColor: Colors.black,
                  marginTop: 20
                }}
                titleStyle={{ width:'100%' }}
                onPress={handleSubmit}
                loading={loading}
              />
              <Button
                type='clear'
                title={ `${!formType ? 'Already Registered' : 'Need to Sing in?'}` }
                buttonStyle= {{
                  marginTop: 20
                }}
                titleStyle={{ width:'100%', color:Colors.white }}
                onPress={() => setFormType(!formType)}
                //loading={}
              />
            </>
          )}
        </Formik>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex:1,
    backgroundColor: Colors.red
  },
  conteiner: {
    padding: 50,
    alignItems: 'center'
  },
  inputStyle: {
    fontSize: 15,
    color: Colors.white
  },
  inputContainerStyle: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.black,
  }
})

export default AuthScreen;
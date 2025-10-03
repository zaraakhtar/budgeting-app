import { useSignIn } from '@clerk/clerk-expo'
import { Link } from 'expo-router' // useRouter is no longer needed
import { Text, TextInput, TouchableOpacity, View ,Image} from 'react-native'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { styles } from '../../assets/styles/auth.styles'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants/colors'
import { useState } from 'react'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  // const router = useRouter() // REMOVE THIS

  const [emailAddress, setEmailAddress] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId });
        
        // router.replace('/') // REMOVE THIS LINE
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      if (err.errors?.[0]?.code === 'form_password_incorrect') {
      setError("Password is incorrect. Please try again.")
    } else {
      setError("An unexpected error occurred. Please try again.")
    }
  }

  }

  return (
    <KeyboardAwareScrollView 
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        enableOnAndroid={true}
        enableAutoAutomaticScroll={true}
        // extraScrollHeight={70}
        >
    <View style= {styles.container}>
      <Image
              source={require('../../assets/images/revenue-i4.png')}
              style={styles.illustration} />
      <Text style={styles.title}>Welcome Back</Text>

      {error ? (
          <View style={styles.errorBox}>
            <Ionicons name="alert-circle" size={20} color={COLORS.expense} />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity onPress={() => setError("")}>
              <Ionicons name="close" size={20} color={COLORS.textLight} />
            </TouchableOpacity>
          </View>
        ) : null}


      <TextInput 
              style={[styles.input, error && styles.errorInput ]}
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Enter email"
              placeholderTextColor="#9A8478"
              onChangeText={(email) => setEmailAddress(email)}
            />
     <TextInput
             style={[styles.input, error && styles.errorInput ]}
             placeholderTextColor="#9A8478"
             value={password}
             placeholder="Enter password"
             secureTextEntry={true}
             onChangeText={(password) => setPassword(password)}
           />


      <TouchableOpacity style={styles.button} onPress={onSignInPress}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>


      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don&apos;t have an account?</Text>
        <Link href="/sign-up" asChild>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Sign up</Text>
        </TouchableOpacity>
        </Link>
      </View>
      </View>
    </KeyboardAwareScrollView>
  )
}
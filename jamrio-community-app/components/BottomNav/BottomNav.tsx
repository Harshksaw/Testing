import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import styles from './styles'

const BottomNav = () => {

  const [active, setActive] = useState<string>("Matching")

  return (
    // <View style={styles.container}>
    //   <Text>Home</Text>
    //   <Text>Messages</Text>
    //   <Text>Profile</Text>
    // </View>
    <View style={styles.container}>
    <View style={styles.icons}>
      {/* Profile */}
      {
        active === "Profile" ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainerActive}>
        <Image source={{uri: "https://img.icons8.com/fluency-systems-filled/48/FA58B6/user.png" }} style={styles.icon}/>
      </TouchableOpacity>
        ) : (

          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer} onPress={() => setActive("Profile")}>
            <Image source={{uri: "https://img.icons8.com/fluency-systems-regular/48/FFFFFF/guest-male.png"}} style={styles.icon}/>
          </TouchableOpacity>
        )
      }

      {/* Matching */}
      {
        active === "Matching" ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainerActive}>
        <Image source={{uri: "https://img.icons8.com/sf-regular-filled/48/FA58B6/like.png"}} style={styles.icon}/>
      </TouchableOpacity>
        ) : (

          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer} onPress={() => setActive("Matching")}>
            <Image source={{uri: "https://img.icons8.com/sf-regular/48/FFFFFF/like.png"}} style={styles.icon}/>
          </TouchableOpacity>
        )
      }
      
      {/* Notifications */}
      {
        active === "Notification" ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainerActive}>
        <Image source={{uri: "https://img.icons8.com/ios-filled/48/FA58B6/appointment-reminders--v1.png" }} style={styles.icon}/>
      </TouchableOpacity>
        ) : (
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer} onPress={() => setActive("Notification")}>
          <Image source={{uri: "https://img.icons8.com/ios/48/FFFFFF/appointment-reminders--v1.png"}} style={styles.icon}/>
        </TouchableOpacity>
        )
      }
      
      {/* Messages */}
      {
        active === "Message" ? (
          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainerActive}>
        <Image source={{uri: "https://img.icons8.com/material-rounded/48/FA58B6/filled-chat.png"}} style={styles.icon}/>
      </TouchableOpacity>
        ) : (

          <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer} onPress={() => setActive("Message")}>
            <Image source={{uri: "https://img.icons8.com/material-outlined/48/FFFFFF/filled-chat.png"}} style={styles.icon}/>
          </TouchableOpacity>
        )
      }

      
    </View>
  </View>
  )
}

export default BottomNav
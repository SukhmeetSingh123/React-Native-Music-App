import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player'

import Icon from 'react-native-vector-icons/MaterialIcons'
import { playbackService } from '../../musicPlayerServices'
const controlCenter =()=> {
    const playBackState=usePlaybackState();
    //next Button
    const skipToNext =async ()=>{
        await TrackPlayer.skipToNext();
    }

    //previous Button
    const skipToPrevious =async ()=>{
        await TrackPlayer.skipToPrevious();
    }

    const togglePlayback =async (playbackState:any)=>{
        const currentTrack=await TrackPlayer.getCurrentTrack();
        if (currentTrack !==null) {
          if(playbackState?.state === State.Paused || playbackState?.state ===State.Ready){
                await TrackPlayer.play()
            }else{
                await TrackPlayer.pause()
            }
        }
    }
    return (
      <View style={styles.container}>
        <Pressable onPress={skipToPrevious}>
            <Icon style={styles.icon} name='skip-previous' size={40}/>
        </Pressable>
        <Pressable onPress={()=> togglePlayback(playBackState)}>
            <Icon style={styles.icon} 
            name={playBackState && playBackState.state === State.Playing ? "pause" : "play-arrow"}

            size={75}/>
        </Pressable>
        <Pressable onPress={skipToNext}>
            <Icon style={styles.icon} name='skip-next' size={40}/>
        </Pressable>
      </View>
    )
}

const styles = StyleSheet.create({
    container: {
      marginBottom: 56,
  
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {
      color: '#FFFFFF',
    },
    playButton: {
      marginHorizontal: 24,
    },
  });
export default controlCenter

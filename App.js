import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {useSharedValue,useAnimatedScrollHandler} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Page from './Components/Page';

const words=["Hello!","My Name is","Abhishek Pal","(-_-)"]

export default function App() {

  const translateX=useSharedValue(0);

  const scrollHandler=useAnimatedScrollHandler((event) => {
  
    translateX.value=event.contentOffset.x;
  
  });

  return (
   <Animated.ScrollView style={styles.container}
    horizontal showsHorizontalScrollIndicator={false}
     decelerationRate="fast" onScroll={scrollHandler} scrollEventThrottle={16} pagingEnabled >
     {words.map((title, index)=>{
       return <Page  key={index} title={title} index={index} translateX={translateX} />;
       
     })}
   </Animated.ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,256,0.5)'
  },
});

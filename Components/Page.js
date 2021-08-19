import React from 'react'
import { StyleSheet, Text, View,Dimensions } from 'react-native';
import Animated, {useSharedValue,useAnimatedStyle,interpolate, Extrapolate} from 'react-native-reanimated';

const {height,width}=Dimensions.get('window'); 

const SIZE=width*0.7;

const Page = (props) => {
    const {index,translateX,title}= props;

   const inputRanges=[(index-1)*width,index*width,(index+1)*width];

    const animatedStyles=useAnimatedStyle(()=>{

        const scale=interpolate(translateX.value,inputRanges,[0,1,0],Extrapolate.CLAMP);
        const bRadius=interpolate(translateX.value,inputRanges,[0,SIZE/2,0],Extrapolate.CLAMP);


        return{
            borderRadius:bRadius,
            transform:[{scale:scale}]
        }
    });

    const titleAnimatedStyles=useAnimatedStyle(()=>{

        const translateY =interpolate(translateX.value,inputRanges,[height/2,0,-height/2],Extrapolate.CLAMP);
        const opacity =interpolate(translateX.value,inputRanges,[-2,1,-2],Extrapolate.CLAMP);

        return {
           transform:[{translateY:translateY}],
           opacity
        }
    });

    return (
        <View  style={[styles.container,{backgroundColor:`rgba(0,0,256,0.${props.index+1})`}]}>

            <Animated.View style={[styles.square,animatedStyles]}  />
            <Animated.View style={[{ position:'absolute' },titleAnimatedStyles]}>
            <Text style={styles.title}>{title}</Text>
            </Animated.View>
            
        </View>
    )
}

export default Page;

const styles = StyleSheet.create({
    container:{ 
        height:height,
        width:width,
        alignItems:'center',
        justifyContent:'center',
        
    },
    square:{
        height:SIZE,
        width:SIZE,
        backgroundColor:'rgba(0,0,256,0.5)',
        borderRadius:SIZE/5,
    
    },
    title:{
        fontSize:30,
        color:'white',
        fontWeight:'700'
    },

})

import {
    ViroAnimations,
} from 'react-viro';

/*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
export const _createMarkerItemAnimation = (item) => {
    ////console.log(animationsData)
    let animation = {};
    //animationsData.map((item, index) => {
        //console.log(item.nom + ", " +item.properties.scaleX)
        animation[item.nom] = {
            properties: {

                opacity: item.properties.opacity ,
                positionX: item.properties.positionX ,
                positionY: item.properties.positionY ,
                positionZ: item.properties.positionZ ,
                rotateX: item.properties.rotateX,
                rotateY: item.properties.rotateY,
                rotateZ: item.properties.rotateZ,
                scaleX: item.properties.scaleX,
                scaleY: item.properties.scaleY,
                scaleZ: item.properties.scaleZ,
                translateX: item.properties.translateX,
                translateY: item.properties.translateY,
                translateZ: item.properties.translateZ,
                color: item.properties.color,                
            },
            duration: item.duration ? item.duration : 500,
            easing: item.easing ? item.easing : "Bounce",
            delay: item.delay ? item.delay : 0,
        }
    //})
   // console.log(animation)
    return ViroAnimations.registerAnimations(animation);
}
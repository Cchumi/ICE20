import {
    ViroAnimations,
} from 'react-viro';

/*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
export const _createAllAnimations = (animationsData) => {
    ////console.log(animationsData)
    let animations = {};
    animationsData.map((item, index) => {
        //console.log(item.nom + ", " +item.properties.scaleX)
        animations[item.nom] = {
            properties: {

                opacity: item.properties.opacity ,
                positionX: item.properties.positionX ,
                positionY: item.properties.positionY ,
                positionZ: item.properties.positionZ ,
                scaleX: item.properties.scaleX,
                scaleY: item.properties.scaleY,
                scaleZ: item.properties.scaleZ
            },
            duration: item.duration ? item.duration : 500,
            easing: item.easing ? item.easing : "Bounce"
        }
    })
    //console.log(animations)
    return ViroAnimations.registerAnimations(animations);
}
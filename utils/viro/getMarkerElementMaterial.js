import {
    ViroMaterials,
} from 'react-viro';

/*CREATION DES DIFFERENTS MARKERS IMAGE OU OBJ*/
export const _createMarkerItemMaterial = (item) => {
    let material = {};
    let materials2 = {};
    // `${item.properties.diffuseTextureUrl}`
    //materialsData.map((item, index) => {
        //console.log('materials')
        //console.log(item.properties.diffuseTextureUrl)
        let diffuseTexture = ''
       // materials2.push(item.nom)
        if(item.properties.diffuseTextureUrl) {
            //console.log('diffuse url ', item.properties.diffuseTextureUrl)
            diffuseTexture = {diffuseTexture: {
            uri: item.properties.diffuseTextureUrl 
        },}
        }
        
        material[item.nom] = {
            ...diffuseTexture,
            /*diffuseTexture: {
                uri: item.properties.diffuseTextureUrl ? item.properties.diffuseTextureUrl.toString() : undefined
            },*/
            shininess: item.properties.shininess,
            diffuseColor: item.properties.diffuseColor,
            lightingModel: item.properties.lightingModel,
            wrapS: item.properties.wrapS,
            wrapT: item.properties.wrapT,
            chromaKeyFilteringColor: item.properties.chromaKeyFilteringColor
        }
   // })
    //console.log(material)
    return ViroMaterials.createMaterials(material);
}
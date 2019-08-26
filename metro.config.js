var path = require("path");

var config = {
    watchFolders: [
     path.resolve(__dirname,"./"),
    ],

    resolver: {
      assetExts: ['mp3', 'pb', 'png', 'gif', 'jpg', 'obj', 'mtl', 'JPG', 'vrx', 'fbx', 'hdr', 'gltf', 'glb', 'bin', 'arobject'],
    }
}
module.exports = config;
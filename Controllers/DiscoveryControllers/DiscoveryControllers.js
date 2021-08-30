/// -  Kullanıcıları keşfet fonksiyonları
const DiscoverFunctions = require('../../Functions/DiscoveryFunctions/DiscoveryFunctions')




module.exports = {
    discovery: async (request,response) => {
        try{
        const discovery = await DiscoverFunctions.discovery();
        await response.send(discovery)
        }catch (error){
            response.send(error)
        }
    }
}
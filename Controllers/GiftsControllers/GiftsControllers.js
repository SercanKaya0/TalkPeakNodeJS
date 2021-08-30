/// - Hediyeler şeması modülü
const GiftsSchemas = require('../../Schemas/GiftsSchema/GiftsSchema');

module.exports = {
    all_gifts : (request,response) => {
        /// - Tüm hediyeleri çekme
        const GitfsAll = new GiftsSchemas({},{collection:'gifts'});
        const AllGifts = GitfsAll.model('gifts',GitfsAll)
        AllGifts.find()
        .then(result=>{
            response.send(result)
        })
    }
}
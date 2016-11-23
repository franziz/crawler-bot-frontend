import async from "async";

class CrawlersMeta{
    constructor(){
        this.rawData = []
    }
    
    getCrawlers(filter){
        this.crawlers = this.rawData.filter(n => {return n.type === filter})
        return this.crawlers
    }
}
export default CrawlersMeta
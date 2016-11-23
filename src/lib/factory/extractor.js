import CrawlersMetaExtractor from "../extractor/crawlersMeta";

class ExtractorFactory{
    constructor(){
        this.CRAWLERS_META = 0;
    }
    
    getExtractor(extractorName){
        if(extractorName === this.CRAWLERS_META){
            return new CrawlersMetaExtractor();
        }
    }
}

export default ExtractorFactory
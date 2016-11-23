import CrawlersMeta from "../model/crawlersMeta";
import async        from "async";
import $            from "jquery";

class CrawlersMetaExtractor{
    getCrawlersMeta(callback){
        $.get("http://220.100.163.132:8303/crawlers_meta", (result)=>{
            callback(null, result)
        })
    }
    
    getCrawlersStatus(crawlers, callback){
        async.map(crawlers, (item, mapCallback)=>{
            let url = `http://220.100.163.132:8303/status/${item.name}`
            $.get(url, (results)=>{
                let newCrawler = Object.assign({}, item, {status:{
                    insertTime: null,
                    convertedTime: null
                }})
                
                if(results.length > 0){
                    let singleResult      = Object.assign({}, results[0])
                    let lastInsertTime    = (singleResult.last_insert_time != undefined)? singleResult.last_insert_time.$date:null;
                    let lastConvertedTime = (singleResult.last_converted_time != undefined)? singleResult.last_converted_time.$date:null;
                    newCrawler = Object.assign({}, item, {status:{
                        insertTime: lastInsertTime,
                        convertedTime: lastConvertedTime
                    }})
                }
                mapCallback(null, newCrawler)  
            })
        }, (err, newCrawlers)=>{
            callback(null, newCrawlers)  
        })
    }
    
    sortByConvertedTime(crawlers, callback){
        let newCrawlers = [...crawlers].sort((a,b)=>{
            if(a.status.convertedTime > b.status.convertedTime){
                return 1
            }else if (a.status.convertedTime === b.status.convertedTime){
                return 0
            }else if(a.status.convertedTime < b.status.convertedTime){
                return -1
            }
        })
        callback(null, newCrawlers)
    }
    
    extract(callback){
        async.waterfall([
                this.getCrawlersMeta,
                this.getCrawlersStatus,
                this.sortByConvertedTime
            ],
            (err, result)=>{
                let crawlersMeta = new CrawlersMeta();
                crawlersMeta.rawData= result
                callback(crawlersMeta)
            }
        )
    }
}

export default CrawlersMetaExtractor;
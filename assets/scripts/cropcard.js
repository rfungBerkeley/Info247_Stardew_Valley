$(function(){

//// Load crops JSON
//function loadCrops(file, callback) {
//    var thisfile = new XMLHttpRequest();
//    thisfile.overrideMimeType("application/json");
//    thisfile.open("GET", file, true);
////    thisfile.responseType = "json";
//    thisfile.onreadystatechange = function() {
//        if (thisfile.readyState === 4 && thisfile.status == "200") {
//            callback(thisfile.responseText);
//        }
//    }
//    thisfile.send(null);
//}
//
//function getCrop(name){
//    loadCrops("./assets/scripts/stardew_valley-crops.json", function (text) {
//        crops = JSON.parse(text);
//        thisCrop = crops.find(crop => crop.item == name);
//        return(thisCrop);
//    })
//}  
    
function loadItems(){
    fetch('./assets/scripts/stardew_valley-crops.json')
    .then(response => response.json())
    .then(data => data.forEach(item => {
        let itemLabel = $("<p></p>").text(item.item);
        let itemImg = $("<img>").attr("src","./assets/icons/crops/" + item.item);
        
        let newItem = $("<div></div").prepend(itemLabel, itemImg).attr("item-name", item.item)
        
        $(".crops-encyclopedia #" + item.season)
            .append(newItem);
    }))
}
    
//    
//function loadCrop(){
//    getData().forEach(item => {
//            
//            var newitem = $("<div></div>").text(item.item).attr({
//                "type": item.type,
//                "seed-price": item.seed_price,
//                "growth-time": item.growth_time,
//                "yield" : item.yield_per_harvest,
//                "base_price" : item.base_price,
//                "base_price_silver": item.base_price_silver,
//                "base_price_gold": item.base_price_gold,
//                "base_price_iridium": item.base_price_iridium,
//            });
//            
//            $(".crops-encyclopedia #" + item.season).append(newitem);
//            
//        })
//} 
    
loadItems();

//fetch('./assets/scripts/stardew_valley-crops.json')
//    .then(response => response.json())
//    .then(data => {
//    
//        data.forEach(item => {
//            
//            var newitem = $("<div></div>").text(item.item).attr({
//                "type": item.type,
//                "seed-price": item.seed_price,
//                "growth-time": item.growth_time,
//                "yield" : item.yield_per_harvest,
//                "base_price" : item.base_price,
//                "base_price_silver": item.base_price_silver,
//                "base_price_gold": item.base_price_gold,
//                "base_price_iridium": item.base_price_iridium,
//            });
//            
//            $(".crops-encyclopedia #" + item.season).append(newitem);
//            
//        }
//        )
//        
    
    



//$("body").click(function () {
//    alert(getCrop("sweet_gem_berry"));
//});
  
    
    
});


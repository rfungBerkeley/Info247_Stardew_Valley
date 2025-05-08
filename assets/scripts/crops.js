$(function(){
// Start    
    
    // Load JSON database and create DOM element for each
    function loadItems(){
        
        // Load JSON
        fetch('./assets/scripts/stardew_valley-crops.json')
        .then(response => response.json())
        .then(data => data.forEach(item => {

            // Create div for each item in JSON and add to html
            let itemName = (item.item).replace('_',' '); // format item name;

            let itemLabel = $('<p></p>').text(itemName);
            let itemImg = $('<img>').attr('src','./assets/icons/crops/' + item.item + '.png');

            let newItem = $('<div></div').prepend(itemLabel, itemImg)
                .attr({
                    "class" : 'item',
                    "item-name": item.item,
                    "season" : item.season,
                })

            $('#seasons #' + item.season)
                .append(newItem);
            
            // Display default crop
            if( item.item == "parsnip"){
                $(newItem).trigger("click");
            } 
        }))
    }
    
    // Change page according to selected crop item clicked
    function setCrop(clicked){
        const name = $(clicked).attr("item-name");

        // Toggle 'active' item
        $('#all-items .item').removeClass('active');
        $(clicked).addClass('active');

        fetch('./assets/scripts/stardew_valley-crops.json')
            .then(response => response.json())
            .then(data => {
                let crop = data.find(item => item.item == name);
            
                // Reset classes
                $('#quick-look #keg').removeClass('not-applicable');
                $('#quick-look #keg tr:last-child').removeClass('not-applicable');
                $('#quick-look #preserves').removeClass('not-applicable');
                $('#quick-look #dehydrator').removeClass('not-applicable');

                // Load text for basic facts
                $('#quick-look img').attr({
                    "src" : './assets/icons/crops/' + crop.item + '.png',
                    "alt": crop.item
                });
                $('#quick-look .name').text(crop.item);
                $('#quick-look .type').text(crop.type);

                $('#quick-look .yield').text((crop.yield_per_harvest) 
                                            ? (crop.yield_per_harvest) : ("Cannot be harvested") );
                $('#quick-look .growth').text((crop.growth_time) 
                                            ? (crop.growth_time) : ("Cannot grow") );

                $('#quick-look #details .base-price').text(crop.base_price || 0);
                $('#quick-look #details .silver-price').text(crop.base_price_silver || 0);
                $('#quick-look #details .gold-price').text(crop.base_price_gold || 0);
                $('#quick-look #details .iridium-price').text(crop.base_price_iridium || 0);
            
                // Calculation for maximal profit
                let harvests = 0;
                    
                if( crop.type == "tree" ){
                    harvests = crop.number_harvests;
                }
                else {
                    harvests = crop.hyper_speed_gro_number_harvest;
                }
                
                let maximum = Math.floor(harvests * crop.base_price_iridium * crop.yield_per_harvest);
                let normalmax = Math.floor(crop.number_harvests * crop.base_price * crop.yield_per_harvest);
                
                $('#quick-look .max-maximum').text(maximum || 'Cannot be determined');
           

                // Load text for keg products
                $('#quick-look #keg .product').text(crop.keg_product || 'Cannot be juiced');
                $('#quick-look #keg .base-price').text(crop.keg_base_price || 0);
                $('#quick-look #keg .silver-price').text(crop.keg_base_price_silver || 0);
                $('#quick-look #keg .gold-price').text(crop.keg_base_price_gold || 0);
                $('#quick-look #keg .iridium-price').text(crop.keg_base_price_iridium || 0);
                if(!crop.keg_product){
                    $('#quick-look #keg').addClass('not-applicable');
                }
                if(crop.keg_product == 'juice' || crop.keg_product == 'coffee' ){
                    $('#quick-look #keg tr:last-child').addClass('not-applicable');
                }

                // Load text for preserves jar products
                $('#quick-look #preserves .product').text(crop.perserves_jar_product || 'Cannot be preserved');
                $('#quick-look #preserves .base-price').text(crop.perserves_base_jar_price || 0);
                if(!crop.perserves_jar_product){
                    $('#quick-look #preserves').addClass('not-applicable');
                }
                    
                // Load text for dehydrator
                $('#quick-look #dehydrator .product').text(crop.dehydrator_product || 'Cannot be dehydrated');
                $('#quick-look #dehydrator .base-price').text(crop.dehydrator_base_price || 0);
                $('#quick-look #dehydrator .silver-price').text(crop.dehydrator_base_price_silver || 0);
                $('#quick-look #dehydrator .gold-price').text(crop.dehydrator_base_price_gold || 0);
                $('#quick-look #dehydrator .iridium-price').text(crop.dehydrator_base_price_iridium || 0);
                if(!crop.dehydrator_product){
                    $('#quick-look #dehydrator').addClass('not-applicable');
                }
            
                // Update plots
                const cropSelect = document.querySelector('#observablehq-viewof-selectCrop-0a965857 select');
                if (cropSelect) {
                    for (let option of cropSelect.options) {
                        if (option.text === crop.item) {
                            cropSelect.value = option.value;
                            cropSelect.dispatchEvent(new Event('input', { bubbles: true }));
                            break;
                        }
                    }
                }
            
                const currentSeason = $(clicked).attr("season");
                let order = 0;

                const seasonSelect = document.querySelector('#observablehq-viewof-selectSource-0a965857 select');
                if (seasonSelect) {
                    for (let option of seasonSelect.options) {
                        if (option.text === currentSeason) {
                            seasonSelect.value = option.value;
                            seasonSelect.dispatchEvent(new Event('input', { bubbles: true }));
                            break;
                        }
                    }
                } 
            
                $('.plot-d6a7b5').addClass("hello");

        })
    };
    
    // On initial page load
    loadItems();
    
    // Change page contents and graph display when crop item clicked
    $('#all-items').on('click','.item', function () {
        setCrop(this);
    });
    
// End
});
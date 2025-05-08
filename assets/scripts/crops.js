$(function(){
// Start    
    
    // Load JSON database and create DOM element for each
    function loadItems(){
        // Load JSON
        fetch('./assets/scripts/stardew_valley-crops.json')
        .then(response => response.json())
        .then(data => data.forEach(item => {
            //alphabetical order of crops
            data.sort((a, b) => a.item.localeCompare(b.item))

            // Create div for each item in JSON and add to html

            let itemName = (item.item).replace('_',' '); // format item name;

            let itemLabel = $('<p></p>').text(itemName);
            let itemImg = $('<img>').attr('src','./assets/icons/crops/' + item.item + '.png');

            let newItem = $('<div></div').prepend(itemLabel, itemImg)
                .attr({
                    "class" : 'item',
                    "item-name": item.item
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

                // Load text for basic facts
                $('#quick-look img').attr({
                    "src" : './assets/icons/crops/' + crop.item + '.png',
                    "alt": crop.item
                });
                $('#quick-look .name').text(crop.item);
                $('#quick-look .type').text(crop.type);

                $('#quick-look .yield').text((crop.yield_per_harvest) 
                                            ? (crop.yield_per_harvest) : ("This crop cannot be harvested.") );
                $('#quick-look .growth').text((crop.growth_time) 
                                            ? (crop.growth_time) : ("This crop does not grow.") );

                $('#quick-look #details .base-price').text(crop.base_price);
                $('#quick-look #details .silver-price').text(crop.base_price_silver);
                $('#quick-look #details .gold-price').text(crop.base_price_gold);
                $('#quick-look #details .iridium-price').text(crop.base_price_iridium);
            
                // Calculation for maximal profit
                let harvests = 0;
                    
                if( crop.type == "tree" ){
                    harvests = crop.number_harvests;
                }
                else {
                    harvests = crop.hyper_speed_gro_number_harvest;
                }
                
                let maximum = harvests * crop.base_price_iridium * crop.yield_per_harvest;
                let normalmax = crop.number_harvests * crop.base_price * crop.yield_per_harvest;
                
                $('#quick-look .max-maximum').text(maximum);
                $('#quick-look .normal-maximum').text(normalmax);
            

                // Load text for keg products
                if(crop.keg_product){
                    $('#quick-look #keg .product').text(crop.keg_product);
                    $('#quick-look #keg .base-price').text(crop.keg_base_price);
                    $('#quick-look #keg .silver-price').text(crop.keg_base_price_silver);
                    $('#quick-look #keg .gold-price').text(crop.keg_base_price_gold);
                    $('#quick-look #keg .iridium-price').text(crop.keg_base_price_iridium);
                } else {
                    $('#quick-look #keg span').text('');
                    $('#quick-look #keg .product').text("Cannot be processed by keg.");
                }

                // Load text for preserves jar products
                if(crop.perserves_jar_product){
                    $('#quick-look #preserves .product').text(crop.perserves_jar_product);
                    $('#quick-look #preserves .base-price').text(crop.perserves_base_jar_price);
                } else {
                    $('#quick-look #preserves span').text('');
                    $('#quick-look #preserves .product').text("Cannot be processed by preserves jar.");
                }

                // Load text for dehydrator
                if(crop.dehydrator_product){
                    $('#quick-look #dehydrator .product').text(crop.dehydrator_product);
                    $('#quick-look #dehydrator .base-price').text(crop.dehydrator_base_price);
                    $('#quick-look #dehydrator .silver-price').text(crop.dehydrator_base_price_silver);
                    $('#quick-look #dehydrator .gold-price').text(crop.dehydrator_base_price_gold);
                    $('#quick-look #dehydrator .iridium-price').text(crop.dehydrator_base_price_iridium);
                } else {
                    $('#quick-look #dehydrator span').text('');
                    $('#quick-look #dehydrator .product').text("Cannot be processed by dehydrator.");
                }       
            
                // Update plots
                const observableSelect = document.querySelector('#observablehq-viewof-selectCrop-4538c7e3 select');
                if (observableSelect) {
                    for (let option of observableSelect.options) {
                        if (option.text === crop.item) {
                            observableSelect.value = option.value;
                            observableSelect.dispatchEvent(new Event('input', { bubbles: true }));
                            break;
                        }
                 }
            }   

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
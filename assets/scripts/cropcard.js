$(function(){ 
    
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
                    "item-name": item.item
                })

            $('#crops-encyclopedia #' + item.season)
                .append(newItem);
        }))
    }


    loadItems();


    $('#crops-encyclopedia').on('click','.item', function () {

        const name = $(this).attr("item-name");

        // Toggle 'active' item
        $('#crops-encyclopedia .item').removeClass('active');
        $(this).addClass('active');

        fetch('./assets/scripts/stardew_valley-crops.json')
            .then(response => response.json())
            .then(data => {
                let crop = data.find(item => item.item == name);

                // Load text for basic facts
                $('#crop-card img').attr({
                    "src" : './assets/icons/crops/' + crop.item + '.png',
                    "alt": crop.item
                });
                $('#crop-card .name').text(crop.item);
                $('#crop-card .type').text(crop.type);

                $('#crop-card .yield').text((crop.yield_per_harvest) 
                                            ? (crop.yield_per_harvest) : ("This crop cannot be harvested.") );
                $('#crop-card .growth').text((crop.growth_time) 
                                            ? (crop.growth_time) : ("This crop does not grow.") );

                $('#crop-card .base-price').text(crop.base_price);
                $('#crop-card .silver-price').text(crop.base_price_silver);
                $('#crop-card .gold-price').text(crop.base_price_gold);
                $('#crop-card .iridium-price').text(crop.base_price_iridium);

                // Load text for keg products
                if(crop.keg_product){
                    $('#crop-card #keg .product').text(crop.keg_product);
                    $('#crop-card #keg .base-price').text(crop.keg_base_price);
                    $('#crop-card #keg .silver-price').text(crop.base_price_silver);
                    $('#crop-card #keg .gold-price').text(crop.base_price_gold);
                    $('#crop-card #keg .iridium-price').text(crop.base_price_iridium);
                } else {
                    $('#crop-card #keg span').text('');
                    $('#crop-card #keg .product').text("Cannot be processed by keg.");
                }

                // Load text for preserves jar products
                if(crop.perserves_jar_product){
                    $('#crop-card #preserves .product').text(crop.perserves_jar_product);
                    $('#crop-card #preserves .base-price').text(crop.perserves_base_jar_price);
                } else {
                    $('#crop-card #preserves span').text('');
                    $('#crop-card #preserves .product').text("Cannot be processed by preserves jar.");
                }

                // Load text for dehydrator
                if(crop.dehydrator_product){
                    $('#crop-card #dehydrator .product').text(crop.dehydrator_product);
                    $('#crop-card #dehydrator .base-price').text(crop.dehydrator_base_price);
                    $('#crop-card #dehydrator .silver-price').text(crop.dehydrator_price_silver);
                    $('#crop-card #dehydrator .gold-price').text(crop.dehydrator_price_gold);
                    $('#crop-card #dehydrator .iridium-price').text(crop.dehydrator_price_iridium);
                } else {
                    $('#crop-card #dehydrator span').text('');
                    $('#crop-card #dehydrator .product').text("Cannot be processed by dehydrator.");
                }  

            })
    });
    
});


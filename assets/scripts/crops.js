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
        $('#all-crops .item').removeClass('active');
        $(clicked).addClass('active');

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

                $('#crop-card #basic .base-price').text(crop.base_price);
                $('#crop-card #basic .silver-price').text(crop.base_price_silver);
                $('#crop-card #basic .gold-price').text(crop.base_price_gold);
                $('#crop-card #basic .iridium-price').text(crop.base_price_iridium);

                // Load text for keg products
                if(crop.keg_product){
                    $('#crop-card #keg .product').text(crop.keg_product);
                    $('#crop-card #keg .base-price').text(crop.keg_base_price);
                    $('#crop-card #keg .silver-price').text(crop.keg_base_price_silver);
                    $('#crop-card #keg .gold-price').text(crop.keg_base_price_gold);
                    $('#crop-card #keg .iridium-price').text(crop.keg_base_price_iridium);
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
                    $('#crop-card #dehydrator .silver-price').text(crop.dehydrator_base_price_silver);
                    $('#crop-card #dehydrator .gold-price').text(crop.dehydrator_base_price_gold);
                    $('#crop-card #dehydrator .iridium-price').text(crop.dehydrator_base_price_iridium);
                } else {
                    $('#crop-card #dehydrator span').text('');
                    $('#crop-card #dehydrator .product').text("Cannot be processed by dehydrator.");
                }
            
            
                // Select item for charts
                const cropChartOptions = $('#inputs-3a86ea-1').children();
            
                let dropdown = $('#inputs-3a86ea-1');
               
            
                // Iterate through all dropdown items to match the inner HTML to the selected crop
                for( let i=0; i < cropChartOptions.length; i++){
                    
                    if(cropChartOptions[i].innerHTML == crop.item){
                
                        // Refresh select container
                        new Runtime().module(define, name => {
                            switch (name){
                                case "viewof selectSource": return new Inspector(container);
                                case "selection": return {fulfilled(value) { setSelection(value); }};
                            }
                        });
                    } 
                }
            
                // Update plots
                const observableSelect = document.querySelector('#observablehq-viewof-selectCrop-3f8b5a92 select');
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
    $('#all-crops').on('click','.item', function () {
        setCrop(this);
    });
    
// End
});
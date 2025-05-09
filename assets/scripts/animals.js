$(function () {
    // Load all animal items and set up interactivity
    function loadItems() {
        fetch('./assets/scripts/stardew_valley-animals.json')
            .then(response => response.json())
            .then(data => data.forEach(item => {

                let itemName = (item.item).replace('_',' ');
                let itemLabel = $('<p></p>').text(itemName);
                let itemImg = $('<img>').attr('src','./assets/icons/animals/' + item.item + '.png');

                let newItem = $('<div></div>').prepend(itemLabel, itemImg)
                    .attr({
                        "class": 'item',
                        "item-name": item.item
                    });

                $('#buildings #' + item.building).append(newItem);

                // Set default
                if (item.item === "white chicken") {
                    $(newItem).trigger("click");
                }
            }));
    }

    // Update the animal details panel when an item is clicked
    function setAnimal(clicked) {
        const name = $(clicked).attr("item-name");

        $('.item').removeClass('active');
        $(clicked).addClass('active');

        fetch('./assets/scripts/stardew_valley-animals.json')
            .then(response => response.json())
            .then(data => {
                const animal = data.find(item => item.item === name);
                if (!animal) return;
            
                // Reset classes
                $('#quick-look #other').removeClass('not-applicable');
                $('.prices td').removeClass('not-applicable');

                // Basic info
                $('#quick-look img').attr({
                    "src": './assets/icons/animals/' + animal.item + '.png',
                    "alt": animal.item
                });
                $('#quick-look .name').text(animal.item);
                $('#quick-look .building').text(animal.building);
                $('#quick-look .machine').text(animal.machine);

                $('#quick-look .type').text(animal.product);
                $('#standard .base-price').text(animal.base_price);
                $('#standard .silver-price').text(animal.base_silver);
                $('#standard .gold-price').text(animal.base_gold);
                $('#standard .iridium-price').text(animal.base_iridium);

                // Processed goods — machines
                $('#processed .product').text(animal.processed);
                $('#processed .base-price').text(animal.processed_price);
                $('#processed .silver-price').text(animal.processed_price_silver);
                $('#processed .gold-price').text(animal.processed_price_gold);
                $('#processed .iridium-price').text(animal.processed_price_iridium);

                // Product type 2
                $('#other .product').text(animal.product2 || 'Only produces ' + animal.product);
                $('#other .base-price').text(animal.product2_base || 0);
                $('#other .silver-price').text(animal.product2_silver || 0);
                $('#other .gold-price').text(animal.product2_gold || 0);
                $('#other .iridium-price').text(animal.product2_iridium || 0);
                if(!animal.product2){
                    $('#quick-look #other').addClass('not-applicable');
                }
            
                // Gray out others
                $('.prices span').each( function(){
                    if( $(this).text() == '0'){
                        $(this).parent().addClass('not-applicable');
                    }
                });
            });
    }

    // Initialize page
    loadItems();

    // Event delegation for animal item clicks
    $('#buildings').on('click', '.item', function () {
        setAnimal(this);
    });
});

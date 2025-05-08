$(function () {
    // Load all animal items and set up interactivity
    function loadItems() {
        fetch('./assets/scripts/stardew_valley-animal.json')
            .then(response => response.json())
            .then(data => data.forEach(item => {

                let itemName = (item.item).replace('_',' ');
                let itemLabel = $('<p></p>').text(itemName);
                let itemImg = $('<img>').attr('src','./assets/icons/animal/' + item.item + '.png');

                let newItem = $('<div></div>').prepend(itemLabel, itemImg)
                    .attr({
                        "class": 'item',
                        "item-name": item.item
                    });

                $('#seasons #' + item.season).append(newItem);

                // Set default
                if (item.item === "Pig") {
                    $(newItem).trigger("click");
                }
            }));
    }

    // Update the animal details panel when an item is clicked
    function setAnimal(clicked) {
        const name = $(clicked).attr("item-name");

        $('.item').removeClass('active');
        $(clicked).addClass('active');

        fetch('./assets/scripts/stardew_valley-animal.json')
            .then(response => response.json())
            .then(data => {
                const animal = data.find(item => item.item === name);
                if (!animal) return;

                // Basic info
                $('#quick-look img').attr({
                    "src": './assets/icons/animals/' + animal.item + '.png',
                    "alt": animal.item
                });
                $('#quick-look .name').text(animal.item);
                $('#quick-look .type').text(animal.product);

                $('#standard .base-price').text(animal.base_price);
                $('#standard .silver-price').text(animal.base_silver);
                $('#standard .gold-price').text(animal.base_gold);
                $('#standard .iridium-price').text(animal.base_iridium);

                // Processed goods — machines
                $('#preserves .product').text(animal.processed);
                $('#preserves .base-price').text(animal.processed_price);

                // keg -- product type 2
                $('#keg .product').text(animal.product2 || 'N/A');
                $('#keg .base-price').text(animal.product2_base || 'N/A');
                $('#keg .silver-price').text(animal.product2_silver || 'N/A');
                $('#keg .gold-price').text(animal.product2_gold || 'N/A');
                $('#keg .iridium-price').text(animal.product2_iridium || 'N/A');
            });
    }

    // Initialize page
    loadItems();

    // Event delegation for animal item clicks
    $('#seasons').on('click', '.item', function () {
        setAnimal(this);
    });
});

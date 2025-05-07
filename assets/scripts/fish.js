$(function(){
    // Load JSON database and create DOM element for each
    function loadItems() {
        fetch('./assets/scripts/stardew_valley-fish.json')
            .then(response => response.json())
            .then(data => data.forEach(item => {

                let itemName = (item.item).replace('_',' ');
                let itemLabel = $('<p></p>').text(itemName);
                let itemImg = $('<img>').attr('src','./assets/icons/fish/' + item.item + '.png');

                let newItem = $('<div></div>').prepend(itemLabel, itemImg)
                    .attr({
                        "class": 'item',
                        "item-name": item.item
                    });

                $('#seasons #' + item.season).append(newItem);

                // Set default
                if (item.item === "pufferfish") {
                    $(newItem).trigger("click");
                }
            }));
    }

    // Change page according to selected fish item clicked
    function setFish(clicked) {
        const name = $(clicked).attr("item-name");

        $('.item').removeClass('active');
        $(clicked).addClass('active');

        fetch('./assets/scripts/stardew_valley-fish.json')
            .then(response => response.json())
            .then(data => {
                let fish = data.find(item => item.item === name);
                if (!fish) return;

                // Basic info
                $('#quick-look img').attr({
                    "src": './assets/icons/fish/' + fish.item + '.png',
                    "alt": fish.item
                });
                $('#quick-look .name').text(fish.item);
                $('#quick-look .type').text(fish.type);
                $('#quick-look .location').text(fish.location || '');

                $('#quick-look .base-price').text(fish.base_price);
                $('#quick-look .silver-price').text(fish.base_price_silver);
                $('#quick-look .gold-price').text(fish.base_price_gold);
                $('#quick-look .iridium-price').text(fish.base_price_iridium);


                // Load text for fish smoker products
                $('#quick-look #smoker .base-price').text(fish.smoked_base_price);
                $('#quick-look #smoker .silver-price').text(fish.smoked_base_price_silver);
                $('#quick-look #smoker .gold-price').text(fish.smoked_base_price_gold);
                $('#quick-look #smoker .iridium-price').text(fish.smoked_base_price_iridium);

                // Load text for preserves jar products (roe)
                if (fish.roe) {
                    $('#quick-look #preserves .product').text("Roe");
                    $('#quick-look #preserves .roe-price').text(fish.roe || '');
                    $('#quick-look #preserves .aged-roe').text(fish.aged_roe || '');
                } else {
                    $('#quick-look #preserves .product').text("Does not make roe.");
                    $('#quick-look #preserves .base-price').text('');
                }
         
                const observableSelect = document.querySelector('#observablehq-viewof-selectFish-191b9ae9 select');
                if (observableSelect) {
                    for (let option of observableSelect.options) {
                        if (option.text === fish.item) {
                            observableSelect.value = option.value;
                            observableSelect.dispatchEvent(new Event('input', { bubbles: true }));
                            break;
                        }
                    }
                }
                
            });
    }

    // Initial load
    loadItems();

    // On item click
    $('#seasons').on('click', '.item', function () {
        setFish(this);
    });
});

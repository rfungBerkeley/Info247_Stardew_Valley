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
                $('#fish-card img').attr({
                    "src": './assets/icons/fish/' + fish.item + '.png',
                    "alt": fish.item
                });
                $('#fish-card .name').text(fish.item);
                $('#fish-card .type').text(fish.type);
                $('#fish-card .location').text(fish.location || '');

                $('#fish-card .base-price').text(fish.base_price);
                $('#fish-card .silver-price').text(fish.base_price_silver);
                $('#fish-card .gold-price').text(fish.base_price_gold);
                $('#fish-card .iridium-price').text(fish.base_price_iridium);

                // Smoked (keg)
                $('#fish-card #keg .base-price').text(fish.smoked_base_price);
                $('#fish-card #keg .silver-price').text(fish.smoked_base_price_silver);
                $('#fish-card #keg .gold-price').text(fish.smoked_base_price_gold);
                $('#fish-card #keg .iridium-price').text(fish.smoked_base_price_iridium);

                // Roe (preserves)
                if (fish.perserves_jar_product) {
                    $('#fish-card #preserves .product').text(fish.roe);
                    $('#fish-card #preserves .base-price').text(fish.roe_price || '');
                } else {
                    $('#fish-card #preserves .product').text("Does not make roe.");
                    $('#fish-card #preserves .base-price').text('');
                }

                /* Optional Observable integration (disabled for now)
                const observableSelect = document.querySelector('#observablehq-viewof-selectCrop-3f8b5a92 select');
                if (observableSelect) {
                    for (let option of observableSelect.options) {
                        if (option.text === fish.item) {
                            observableSelect.value = option.value;
                            observableSelect.dispatchEvent(new Event('input', { bubbles: true }));
                            break;
                        }
                    }
                }
                */
            });
    }

    // Initial load
    loadItems();

    // On item click
    $('#seasons').on('click', '.item', function () {
        setFish(this);
    });
});

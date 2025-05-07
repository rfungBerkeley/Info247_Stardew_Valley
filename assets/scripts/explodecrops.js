document.addEventListener('DOMContentLoaded', () => {
    const cropIcons = [
      'assets/icons/crops/amaranth.png',
      'assets/icons/crops/ancient fruit.png',
      'assets/icons/crops/apple.png',
      'assets/icons/crops/blueberry.png',
      'assets/icons/crops/cranberries.png',
      'assets/icons/crops/grape.png',
      'assets/icons/crops/hops.png',
      'assets/icons/crops/melon.png',
      'assets/icons/crops/banana.png',
      'assets/icons/crops/corn.png',
      'assets/icons/crops/beet.png',
      'assets/icons/crops/parsnip.png',
      'assets/icons/crops/crocus.png',
      'assets/icons/crops/cauliflower.png',
      'assets/icons/crops/sunflower.png',
      'assets/icons/crops/yam.png',
      'assets/icons/crops/blackberry.png',
      'assets/icons/crops/broccoli.png',
      'assets/icons/crops/cactus fruit.png',
      'assets/icons/crops/cherry.png',
      'assets/icons/crops/garlic.png',
      'assets/icons/crops/leek.png',
      'assets/icons/crops/starfruit.png'
    ];
  
    const chartWidth = 2000;
    const chartHeight = 2000;
    const iconDimension = 36;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
  
    const nodes = cropIcons.map((img, i) => {
      const angle = (i / cropIcons.length) * 2 * Math.PI;
      return { angle, img };
    });
  
    const svg = d3.select('#crops-container')
      .append('svg')
      .attr('width', chartWidth)
      .attr('height', chartHeight);
  
    const icons = svg.selectAll('image')
      .data(nodes)
      .enter()
      .append('image')
      .attr('xlink:href', d => d.img)
      .attr('width', iconDimension)
      .attr('height', iconDimension)
      .attr('x', centerX - iconDimension / 2)
      .attr('y', centerY - iconDimension / 2);
  
    document.getElementById('cropBtn').addEventListener('click', (e) => {
      e.preventDefault();  
      const btn = e.currentTarget; 
      const targetHref = btn.getAttribute('href'); 
  
      // Trigger explosion animation
      icons.transition()
        .duration(2000)
        .ease(d3.easeCircleOut)
        .attr('x', () => centerX + (Math.random() - 0.6) * chartWidth - iconDimension / 2)
        .attr('y', () => centerY + (Math.random() - 0.6) * chartHeight - iconDimension / 2)
        .style('opacity', 0)
        .attr('transform', () => `rotate(${Math.random() * 720}) scale(${0.5 + Math.random()})`);
  
      // animation time
      setTimeout(() => {
        window.location.href = targetHref;}, 1500);  
    });
  });
  
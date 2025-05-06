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
    ];
  
    const chartWidth = 700;
    const chartHeight = 700;
    const iconDimension = 36;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
  
    const nodes = cropIcons.map((img, i) => {
      const angle = (i / cropIcons.length) * 2 * Math.PI;
      return { angle, img };
    });
  
    const svg = d3.select('#container')
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
  
    document.getElementById('explodeBtn').addEventListener('click', (e) => {
      e.preventDefault();  
      const btn = e.currentTarget; 
      const targetHref = btn.getAttribute('href'); 
  
      // Trigger explosion animation
      icons.transition()
        .duration(1000)
        .ease(d3.easeBounceInOut)
        .attr('x', d => centerX + 700 * Math.cos(d.angle) - iconDimension / 2)
        .attr('y', d => centerY + 700 * Math.sin(d.angle) - iconDimension / 2)
        .style('opacity', 0);
  
      // animation time
      setTimeout(() => {
        window.location.href = targetHref;}, 2000);  
    });
  });
  
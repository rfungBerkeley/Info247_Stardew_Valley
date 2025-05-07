document.addEventListener('DOMContentLoaded', () => {
    const fishIcons = [
      'assets/icons/fish/albacore.png',
      'assets/icons/fish/crimsonfish.png',
      'assets/icons/fish/ice pip.png',
      'assets/icons/fish/clam.png',
      'assets/icons/fish/midnight carp.png',
      'assets/icons/fish/lionfish.png',
      'assets/icons/fish/rainbow trout.png',
      'assets/icons/fish/sandfish.png',
      'assets/icons/fish/sea cucumber.png',
      'assets/icons/fish/pike.png',
      'assets/icons/fish/void salmon.png',
      'assets/icons/fish/sturgeon.png',
      'assets/icons/fish/stingray.png',
      'assets/icons/fish/catfish.png',
      'assets/icons/fish/carp.png',
      'assets/icons/fish/tuna.png',
    ];
  
    const chartWidth = 700;
    const chartHeight = 700;
    const iconDimension = 36;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
  
    const nodes = fishIcons.map((img, i) => {
      const angle = (i / fishIcons.length) * 2 * Math.PI;
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
  
    document.getElementById('fishBtn').addEventListener('click', (e) => {
      e.preventDefault();  
      const btn = e.currentTarget; 
      const targetHref = btn.getAttribute('href'); 
  
      // Trigger explosion animation
      icons.transition()
        .duration(1000)
        .ease(d3.easeBounceInOut)
        .attr('x', () => centerX + (Math.random() - 0.5) * chartWidth - iconDimension / 2)
        .attr('y', () => centerY + (Math.random() - 0.5) * chartHeight - iconDimension / 2)
        .style('opacity', 0)
        .attr('transform', () => `rotate(${Math.random() * 720}) scale(${0.5 + Math.random()})`);
  
      // animation time
      setTimeout(() => {
        window.location.href = targetHref;}, 1500);  
    });
  });
  
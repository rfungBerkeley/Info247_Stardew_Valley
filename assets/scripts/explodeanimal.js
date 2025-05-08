document.addEventListener('DOMContentLoaded', () => {
    const animalIcons = [
      'assets/icons/animals/blue chicken.png',
      'assets/icons/animals/brown cow.png',
      'assets/icons/animals/dinosaur.png',
      'assets/icons/animals/duck.png',
      'assets/icons/animals/goat.png',
      'assets/icons/animals/golden chicken.png',
      'assets/icons/animals/ostrich.png',
      'assets/icons/animals/pig.png',
      'assets/icons/animals/rabbit.png',
      'assets/icons/animals/void chicken.png',
      'assets/icons/animals/white cow.png',
      'assets/icons/animals/white chicken.png',
      'assets/icons/animals/blue chicken.png',
      'assets/icons/animals/brown cow.png',
      'assets/icons/animals/dinosaur.png',
      'assets/icons/animals/duck.png',
      'assets/icons/animals/goat.png',
      'assets/icons/animals/golden chicken.png',
      'assets/icons/animals/ostrich.png',
      'assets/icons/animals/pig.png',
      'assets/icons/animals/rabbit.png',
      'assets/icons/animals/void chicken.png',
      'assets/icons/animals/white cow.png',
      'assets/icons/animals/white chicken.png',
    ];
  
    const chartWidth = 1500;
    const chartHeight = 1500;
    const iconDimension = 36;
    const centerX = chartWidth / 2;
    const centerY = chartHeight / 2;
  
    const nodes = animalIcons.map((img, i) => {
      const angle = (i / animalIcons.length) * 2 * Math.PI;
      return { angle, img };
    });
  
    const svg = d3.select('#animal-container')
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
  
    document.getElementById('animalBtn').addEventListener('click', (e) => {
      e.preventDefault();  
      const btn = e.currentTarget; 
      const targetHref = btn.getAttribute('href'); 
  
      // Trigger explosion animation
      icons.transition()
        .duration(2500)
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
  
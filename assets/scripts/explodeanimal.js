document.addEventListener('DOMContentLoaded', () => {
    const animalIcons = [
      'assets/icons/animals/Blue_Chicken.png',
      'assets/icons/animals/Brown_Cow.png',
      'assets/icons/animals/Dinosaur.png',
      'assets/icons/animals/Duck.png',
      'assets/icons/animals/Goat.png',
      'assets/icons/animals/Golden_Chicken.png',
      'assets/icons/animals/Ostrich.png',
      'assets/icons/animals/Pig.png',
      'assets/icons/animals/Rabbit.png',
      'assets/icons/animals/Void_Chicken.png',
      'assets/icons/animals/White_Cow.png',
      'assets/icons/animals/White_Chicken.png',
      'assets/icons/animals/Blue_Chicken.png',
      'assets/icons/animals/Brown_Cow.png',
      'assets/icons/animals/Dinosaur.png',
      'assets/icons/animals/Duck.png',
      'assets/icons/animals/Goat.png',
      'assets/icons/animals/Golden_Chicken.png',
      'assets/icons/animals/Ostrich.png',
      'assets/icons/animals/Pig.png',
      'assets/icons/animals/Rabbit.png',
      'assets/icons/animals/Void_Chicken.png',
      'assets/icons/animals/White_Cow.png',
      'assets/icons/animals/White_Chicken.png'
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
  
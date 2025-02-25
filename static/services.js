
const fortunes = [
    " AIM IS TO PROVIDE BETTER ENV FOR ALL ON PC AND LAPS",
    " A journey of a thousand miles will begin with a single step.",
    " A DREAM PROJECT IN MAKING",
    " A new beginning is near, glowing with endless potential.",
    " A challenge will bring out your greatest strength.",
    " The most beautiful flowers often bloom in the most unlikely gardens.",
    " An unexpected adventure will change your life.",
    " A quiet place will reveal the answers you've been searching for.",
    " Your kindness will lead to unexpected blessings.",
    " The simplest moments will hold the greatest meaning."
  ];
  
  // Flip Card Functionality
  function flipCard(cardElement) {
    const cardInner = cardElement.querySelector('.card-inner');
    const isFlipped = cardInner.style.transform === 'rotateY(180deg)';
  
    // Add 'card-flipping' class to temporarily disable shadow
    cardElement.classList.add('card-flipping');
  
    // Trigger stars ONLY when flipping from the front to the back
    if (!isFlipped) {
      createMagicalStars(cardElement);
    }
  
    // Toggle flipping state
    cardInner.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
  
    // Assign new fortunes if showing the back
    if (!isFlipped) {
      const fortunesText = cardElement.querySelectorAll('.fortune-text');
      const personalizedMessage = cardElement.querySelector('.personalized-message');
      fortunesText.forEach((fortuneText) => {
        fortuneText.textContent = fortunes[Math.floor(Math.random() * fortunes.length)];
      });
      personalizedMessage.textContent = `Here’s your fortune:`;
    }
  
    // Remove the 'card-flipping' class after the animation ends
    setTimeout(() => {
      cardElement.classList.remove('card-flipping');
    }, 600); // Match the flip transition duration (0.6s)
  }
  
  // Function to Create Magical Stars
  function createMagicalStars(cardElement) {
    const particleCount = 15; // Number of stars
    const rect = cardElement.getBoundingClientRect(); // Get card position and dimensions
  
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
  
      // Randomize position: around the card's top and sides
      const edge = Math.random() < 0.5 ? 'horizontal' : 'vertical'; // Randomize edge
      let startX, startY;
  
      if (edge === 'horizontal') {
        // Horizontal edges (top or bottom)
        startX = rect.left + Math.random() * rect.width; // Random point along the card's width
        startY = rect.top; // Top of the card
      } else {
        // Vertical edges (left or right)
        startX = Math.random() < 0.5 ? rect.left : rect.right; // Left or right of the card
        startY = rect.top + Math.random() * rect.height; // Random point along the card's height
      }
  
      // Random angle and distance for star movement
      const angle = Math.random() * Math.PI * 2; // Random angle (0 to 360 degrees)
      const distance = Math.random() * 150 + 50; // Random distance (50px to 200px)
      const endX = startX + Math.cos(angle) * distance; // Move outward
      const endY = startY + Math.sin(angle) * distance;
  
      // Style the particle
      particle.style.left = `${startX}px`;
      particle.style.top = `${startY}px`;
      particle.style.position = 'fixed'; // Fixed to ensure proper positioning
      particle.style.transform = `translate(0, 0)`; // Start at the edge
      particle.style.opacity = 1; // Fully visible at the start
  
      // Append the particle to the body
      document.body.appendChild(particle);
  
      // Trigger outward animation
      requestAnimationFrame(() => {
        particle.style.transform = `translate(${endX - startX}px, ${endY - startY}px) scale(1.2)`;
        particle.style.opacity = 0; // Gradual fade-out
      });
  
      // Remove the particle after animation ends
      setTimeout(() => {
        particle.remove();
      }, 1500); // Matches the animation duration
    }
  }
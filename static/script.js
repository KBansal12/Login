/*nav bar*/
var getHubergerIcon = document.getElementById("hamburger-menu");
var getHubergerCrossIcon = document.getElementById("hamburger-cross");
var getMobileMenu = document.getElementById("mobile-menu");

getHubergerIcon.addEventListener("click", function () {
    console.log("hello");
    getMobileMenu.style.display = "flex";
    setTimeout(function () {
        getMobileMenu.style.transform = "translateX(0%)"; // Slide in the menu
    }, 50); // Add a small delay for better transition effect
});

getHubergerCrossIcon.addEventListener("click", function () {
    console.log("hello");
    getMobileMenu.style.transform = "translateX(-100%)"; // Slide out the menu
    setTimeout(function () {
        getMobileMenu.style.display = "none";
    }, 300); // Wait for the transition to end before hiding
});

// Check if screen size changes to desktop view and hide mobile menu
window.addEventListener("resize", function () {
    if (window.innerWidth > 770) {
        getMobileMenu.style.display = "none";
    }
});
/*nav bar*/
/*text animation*/
// function([string1, string2],target id,[color1,color2])    
consoleText(['SATYANDER KAUSHIK', 'TRYING SOMETHING NEW', 'THIS IS SECOND.'], 'text',['white','white','white']);

function consoleText(words, id, colors) {
if (colors === undefined) colors = ['#fff'];
var visible = true;
var con = document.getElementById('console');
var letterCount = 1;
var x = 1;
var waiting = false;
var target = document.getElementById(id)
target.setAttribute('style', 'color:' + colors[0])
window.setInterval(function() {

if (letterCount === 0 && waiting === false) {
  waiting = true;
  target.innerHTML = words[0].substring(0, letterCount)
  window.setTimeout(function() {
    var usedColor = colors.shift();
    colors.push(usedColor);
    var usedWord = words.shift();
    words.push(usedWord);
    x = 1;
    target.setAttribute('style', 'color:' + colors[0])
    letterCount += x;
    waiting = false;
  }, 1000)
} else if (letterCount === words[0].length + 1 && waiting === false) {
  waiting = true;
  window.setTimeout(function() {
    x = -1;
    letterCount += x;
    waiting = false;
  }, 1000)
} else if (waiting === false) {
  target.innerHTML = words[0].substring(0, letterCount)
  letterCount += x;
}
}, 120)
window.setInterval(function() {
if (visible === true) {
  con.className = 'console-underscore hidden'
  visible = false;

} else {
  con.className = 'console-underscore'

  visible = true;
}
}, 400)
}

/*text animation*/

$(document).ready(function () {
  let currentCardIndex = 0;
  const cards = $('.we-card');
  const totalCards = cards.length;

  function updateCarousel() {
    cards.removeClass('active prev-1 next-1 prev-2 next-2 prev-3 next-3');
    $(cards[currentCardIndex]).addClass('active');

    const prevIndex_1 = (currentCardIndex - 1 + totalCards) % totalCards;
    const nextIndex_1 = (currentCardIndex + 1) % totalCards;
    const prevIndex_2 = (currentCardIndex - 2 + totalCards) % totalCards;
    const nextIndex_2 = (currentCardIndex + 2) % totalCards;
    const prevIndex_3 = (currentCardIndex - 3 + totalCards) % totalCards;
    const nextIndex_3 = (currentCardIndex + 3) % totalCards;

    $(cards[prevIndex_1]).addClass('prev-1');
    $(cards[nextIndex_1]).addClass('next-1');
    $(cards[prevIndex_2]).addClass('prev-2');
    $(cards[nextIndex_2]).addClass('next-2');
    $(cards[prevIndex_3]).addClass('prev-3');
    $(cards[nextIndex_3]).addClass('next-3');
  }

  updateCarousel();

  $('.right').click(function () {
    currentCardIndex = (currentCardIndex + 1) % totalCards;
    updateCarousel();
  });

  $('.left').click(function () {
    currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
    updateCarousel();
  });
});

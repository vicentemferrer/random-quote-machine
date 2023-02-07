function adminAnchor(quote, author) {
  const tweet = `"${ quote }" - ${ author }`;
  $('#tweet-quote').prop('href', `https://twitter.com/intent/tweet/?text=${ tweet }`);
}

function setQuote(quote, author) {
  $('span').text(`${ quote }`);
  $('#author').text(`- ${ author }`);
}

const getRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

function setColor() {
  const color = getRandomColor();
  $('.color-bg').css('background-color', color);
  $('.color-text').css('color', color);
}

function getQuote() {
  const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://quotes15.p.rapidapi.com/quotes/random/",
    "method": "GET",
    "headers": {
      "X-RapidAPI-Key": "e15f3519famsh57c9a294cbac6aep1f4734jsneea0f0d86653",
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com"
    }
  };
  
  $.ajax(settings).done(({ content, originator: { name } }) => {
    if (content.length > 300) {
      getQuote();
      return true;
    }
    adminAnchor(content, name);
    setQuote(content, name);
    setColor();
  });
}

$(document).ready(() => {
  getQuote();
  $('#new-quote').click(getQuote)
});
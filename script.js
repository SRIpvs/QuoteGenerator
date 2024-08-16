let quote = [];

let quotebtn = document.querySelector('#new-quote');

let qoutetext = document.querySelector('#quote');

let qcontainer = document.querySelector('.quote-container');

let authortext = document.querySelector('#author');

let twtbtn = document.querySelector('#twitter');

let loader = document.querySelector('.loader');


function showloadingspin() {

    qcontainer.hidden = true;
    loader.hidden = false;
}

function stoploadingspin() {
    if (!loader.hidden) {
        loader.hidden = true;
        qcontainer.hidden = false;
    }
}

//To get a random quote 

function newquote() {

    let r = Math.floor(Math.random() * quote.length);

    if (quote[r].text.length > 40) {
        qoutetext.classList.add('long-quote');
    }
    else {
        qoutetext.classList.remove('long-quote');
    }

    qoutetext.innerText = quote[r].text;

    authortext.innerText = quote[r].author;


}

// Fetching quotes from quoteAPI

let getquote = async () => {
    showloadingspin();

    const apiUrl = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

    try {
        let response = await fetch(apiUrl);

        quote = await response.json();

        newquote();

        stoploadingspin();
    }
    catch (error) {
        getquote();
    }

}

// Tweet our quote in X platform

function tweetquote() {

    const twturl = `https://x.com/compose/post?text=${qoutetext.innerText} - ${authortext.innerText}`;
    window.open(twturl, '_blank');

}

// Adding event listeners to the buttons

quotebtn.addEventListener('click', getquote);
twtbtn.addEventListener('click', tweetquote);

getquote();


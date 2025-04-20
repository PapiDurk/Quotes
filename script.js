// Used for logging data and will be useful when using api's
// View info inside the website console
// View the elements in the console to see css and html
// console.log("Hello World!");

// 429 error is from too many requests being sent to the server and can't do anything about it except wait.

const quoteContainer= document.getElementById('quote-container');
const quoteText= document.getElementById('quote');
const authorText= document.getElementById('author');
const twitterBtn= document.getElementById('twitter');
const newQuoteBtn= document.getElementById('new-quote');
const loader= document.getElementById('loader');


let apiQuotes = [];
// let localQuotes = [];


function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}


function hideLoadingSpinner() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Show new Quote
function newQuote() {
    showLoadingSpinner();
    // Pick a random quote from the apiQuotes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    // authorText.textContent = quote.author;
    // Check if author field is blank and replace it with 'Unknown'
    if (!quote.author) {
        authorText.textContent = 'Unknown';
    } else {
        authorText.textContent = quote.author;
    }


    // Check quote length to determine styling
    if (quote.text.length > 120) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    // Set Quote, Hide Loader
    quoteText.textContent = quote.text;
    hideLoadingSpinner();
}


// Local Quotes
// function newQuote() {
//     // Pick a random quote from the apiQuotes array
//     const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//     console.log(quote);
// }


// Get Quotes From API
// Fetching data from the API
// asynchronous function can run anytime independently and it won't stop the browser from loading the page
// The await keyword is used to wait for a promise to be resolved before continuing
async function getQuotes() {
    showLoadingSpinner();
    const apiUrl ='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    // fetch the info if not we get an error in the catch area.
    try {
        const response = await fetch(apiUrl);
        // global variable to store the quotes
        // response.json turns the data into a json object
        apiQuotes = await response.json();
        // check to see if the date is being fetched inside the console.
        // console.log(apiQuotes[12]);
        newQuote();
    } catch (error) {
        //  Catch any errors here
    }
}

// Tweet Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

// Event Listeners 
// This will make the button work when clicked
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load 
// Comment out getQuotes(); to see if showLoadingSpinner(); works
getQuotes();
// loading();
// localQuotes();
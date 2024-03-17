// Variables
var repositoryArray = [];
var galleryTemplate = document.querySelector('.template');
galleryTemplate = galleryTemplate.cloneNode(true);

// Select the input field and the submit button
const inputField = document.querySelector('.search-bar input');
const submitButton = document.querySelector('.search-bar button');

// Add an event listener to the submit button using an anonymous function
submitButton.addEventListener('click', function(event) {
    // Get the value of the input field
    const inputValue = inputField.value;
    // printer function for testing
    printer(inputValue);

    gallery_fetch(inputValue);
    
});

// This function just prints the value to the console
function printer(value) {
    console.log(value);
}

// This function fetches the gallery data from github.
function gallery_fetch(username) {
    // First, build the url using username from the input field
    // https://api.github.com/users/USERNAME/repos
    const url = `https://api.github.com/users/${username}/repos`;

    // Next, fetch the data from the url
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Print the data to the console
            console.log(data);
            // Call the function to display the gallery
            displayGallery(data);
        })
        .catch(error => console.log(error));
}

// data is an array of javascript objects
function displayGallery(data) {
    clearGallery();
    arraySetup(data);
    firstSweep();
    
}



function clearGallery() {
    // empty repositoryArray
    repositoryArray = [];    

    // "clear" the <main> element by removing all of its children
    const main = document.querySelector('main');
    main.innerHTML = '';
}

function arraySetup(data) {
    // loop through the "data" array
        // each object in the array represents a repository
        // for each repository store temp variables
        // then, make an object with the temp variables and add it to
        // the repositoryArray
    data.forEach(repository => {
        // store temp variables
        let stars = repository.stargazers_count;
        let forks = repository.forks;
        let url = repository.html_url;
        let name = repository.name;
        let description = repository.description;
        let creationDate = new Date(repository.created_at);
        let updateDate = new Date(repository.updated_at);
        let watchers = repository.watchers_count; // we could use 'watchers' instead of 'watchers_count'
        let first_language = repository.language;
        // these two below need to be fetched later.
        let contributors_url = repository.contributors_url;
        let languages_url = repository.languages_url;

        let repo = createRepository({
            stars,
            forks,
            url,
            name,
            description,
            creationDate,
            updateDate,
            watchers,
            first_language,
            contributors_url,
            languages_url
        });

        repositoryArray.push(repo);

    });
}


function createRepository({stars, forks, url, name, description, creationDate, updateDate, watchers, first_language, commits_url, contributors_url, languages_url}) {
    return {
        stars,
        forks,
        url,
        name,
        description,
        creationDate,
        updateDate,
        watchers,
        first_language,
        contributors_url,
        languages_url
    };
}

function firstSweep() {
    // loop through the repositoryArray
        // for each repository, make a clone of the galleryTemplate
        // and save it to a variable
    // then, fill in the clone with the repository data
    // then, append the clone to the <main> element


}

function secondSweep() {
    var counter = 0;
    // iterate over each div with class "entry" in the <main> element
        // for each entry, reference contributors_url and languages_url
        // from the element in repositoryArray at the current index
}
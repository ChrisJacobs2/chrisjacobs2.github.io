// Variables
var repositoryArray = [];
const main = document.querySelector('main');

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
        creationDate = creationDate.toLocaleString('default', { month: 'long', year: 'numeric' });
        let updateDate = new Date(repository.updated_at);
        let currentDate = new Date();
        let timeDiff = Math.abs(currentDate.getTime() - updateDate.getTime());
        let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
        updateDate = diffDays;
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
    var counter = 0;
    // loop through the repositoryArray
        // for each repository, make a clone of the galleryTemplate
        // and save it to a variable
        // then, fill in the clone with the repository data
        // then, append the clone to the <main> element
    repositoryArray.forEach(repository => {
        let clone = galleryTemplate.cloneNode(true);
        // change href attribute of the <a> element to the repository url
        clone.querySelector('.repository-name').setAttribute('href', repository.url);
        // fill in the clone with the repository data
        clone.querySelector('.repository-name').textContent = repository.name;
        clone.querySelector('.star-count').textContent = repository.stars;
        clone.querySelector('.fork-count').textContent = repository.forks;
        clone.querySelector('.watchers-count').textContent = repository.watchers;
        clone.querySelector('.repository-desc').textContent = repository.description;
        clone.querySelector('.updated').textContent = repository.updateDate;
        clone.querySelector('.created').textContent = repository.creationDate;
        clone.querySelector('.lang1').textContent = repository.first_language;
        // add data-index attribute to the clone
        clone.setAttribute('data-index', counter);
        counter++;
        // append the clone to the <main> element
        main.appendChild(clone);        
    });
}

// commits and languages are fetched here
function secondSweep() {
    var counter = 0;
    // get a list of each class "entry" in the <main> element
    let entries = document.querySelectorAll('.entry');
    // iterate over entries
    entries.forEach(entry => {
        // get the data-index attribute
        let index = entry.getAttribute('data-index');

            // ADDING COMMIT COUNTER
        // find the number of commits
        let num_commits = findCommits(index);
        // update the entry with the new data
        entry.querySelector('.commits').textContent = num_commits;

            // ADDING LANGUAGES LIST
        // get the list of languages
        let languages = findLanguages(index);
        // grab "stats-group-2"
        let lang_div = entry.querySelector('.stats-group-2');
        // iterate over the languages
        languages.forEach(lang => {
            // create a new <span> element
            let new_span = document.createElement('span');
            // fill in the <span> element with the language name
            new_span.textContent = lang;
            // append the <span> element to the "stats-group-2" div
            lang_div.appendChild(new_span);            
        });
    }); 
}

function findCommits(index) {
    let num_commits;
    let repo = repositoryArray[index];
    let url = repo.contributors_url;
    // make a fetch request to the url. This will return a list of contributors, each having a field called "contributions"
    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            num_commits = addContributions(data);
        })
        .catch(error => console.log(error));
    // loop through the list of contributors, adding up the contributions

    return num_commits;
}

function addContributions(data) {
    let num_commits = 0;
    data.forEach(contributor => {
        num_commits += contributor.contributions;
    });
    return num_commits;
}
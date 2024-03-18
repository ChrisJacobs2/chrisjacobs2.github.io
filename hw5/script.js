// Hello Sunny!

// Variables
var repositoryArray = [];
const main = document.querySelector('main');
var galleryTemplate = document.querySelector('.template');
galleryTemplate = galleryTemplate.cloneNode(true);

// Select the input field and the submit button
const inputField = document.querySelector('.search-bar input');
const submitButton = document.querySelector('.search-bar button');

// event listeners
submitButton.addEventListener('click', handleInput);
inputField.addEventListener('keypress', handleInput);

function handleInput(event) {
    // if the event is a keypress, make sure it's the enter key
    if (event.type === 'keypress' && event.key !== 'Enter') {
        return;
    }
    // get the value of the input field
    const inputValue = inputField.value;
    gallery_fetch(inputValue);
}

// setup
gallery_fetch('chrisjacobs2');


/**
 * Fetches the repository data for a given GitHub username and displays the gallery.
 *
 * @param {string} username - The GitHub username to fetch repositories for.
 * @throws {Error} Will throw an error if the fetch operation fails.
 */
function gallery_fetch(username) {
    // First, build the url using username from the input field
    // https://api.github.com/users/USERNAME/repos
    const url = `https://api.github.com/users/${username}/repos`;

    // Next, fetch the data from the url
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Print the data to the console
            // console.log(data);
            // Call the function to display the gallery
            displayGallery(data);
        })
        .catch(error => console.log(error));
}

/**
 * Displays the gallery using the provided data.
 *
 * @param {Object[]} data - An array of JavaScript objects representing the data to be displayed.
 */
function displayGallery(data) {
    clearGallery();
    arraySetup(data);
    firstSweep();
    secondSweep();
}

/**
 * Clears the gallery by emptying the repositoryArray and removing all children from the <main> element.
 */
function clearGallery() {
    // empty repositoryArray
    repositoryArray = [];    

    // "clear" the <main> element by removing all of its children
    const main = document.querySelector('main');
    main.innerHTML = '';
}

/**
 * Sets up the global repositoryArray with data from the fetched repositories.
 *
 * @param {Object[]} data - An array of JavaScript objects, each representing a GitHub repository.
 */
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

/**
 * Creates a new repository object with the provided properties.
 *
 * @returns {Object} A new repository object.
 */
function createRepository({stars, forks, url, name, description, creationDate, updateDate, watchers, first_language, contributors_url, languages_url}) {
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

/**
 * Loops through the repositoryArray and for each repository, creates a clone of the galleryTemplate,
 * fills in the clone with the repository data, and appends the clone to the <main> element.
 */
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

/**
 * Performs a second sweep over the repository entries to fetch and display additional data.
 * For each entry, it fetches the number of commits and the languages used in the repository,
 * and updates the entry with this data.
 */
function secondSweep() {
    // get all the entries
    let entries = document.querySelectorAll('.entry');

    // iterate over them
    entries.forEach(entry => {
        // get the data-index attribute
        let index = entry.getAttribute('data-index');

        // ADDING COMMIT COUNTER
        // find the number of commits, using promise chaining
        findCommits(index)
            .then(num_commits => {
                // update the entry with the new data
                entry.querySelector('.commits').textContent = num_commits;
            })
            .catch(error => console.log(error));

        // ADDING LANGUAGES
        // find the languages, using promise chaining
        findLanguages(index)
            .then(languages => {
                // loop over languages, skipping the first one
                for (let i = 1; i < languages.length; i++) {
                    let language = languages[i];
                    let x = document.createElement('span');
                    x.textContent = language;
                    entry.querySelector('.stats-group-2').appendChild(x);
                }
            })
            .catch(error => console.log(error));
    }); 
}

/**
 * Fetches the number of commits for a repository at a given index in the repositoryArray.
 *
 * @param {number} index - The index of the repository in the repositoryArray.
 * @returns {Promise<number>} A Promise that resolves with the number of commits.
 * @throws {Error} Will throw an error if the fetch operation fails.
 */
function findCommits(index) {
    return new Promise((resolve, reject) => {
        let num_commits = 0;
        let repo = repositoryArray[index];
        let url = repo.contributors_url;
        // make a fetch request to the url. This will return a list of contributors, each having a field called "contributions"
        fetch(url)
            .then(response => response.json())
            .then(data => {
                num_commits = addContributions(data);
                resolve(num_commits);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}

/**
 * Calculates the total number of contributions from an array of contributors.
 *
 * @param {Object[]} data - An array of contributor objects, each with a 'contributions' property.
 * @returns {number} The total number of contributions.
 */
function addContributions(data) {
    let num_commits = 0;
    data.forEach(contributor => {
        num_commits += contributor.contributions;
    });
    return num_commits;
}

/**
 * Fetches the languages used in a repository at a given index in the repositoryArray.
 *
 * @param {number} index - The index of the repository in the repositoryArray.
 * @returns {Promise<string[]>} A Promise that resolves with an array of languages.
 * @throws {Error} Will throw an error if the fetch operation fails.
 */
function findLanguages(index) {
    return new Promise((resolve, reject) => {
        let repo = repositoryArray[index];
        let url = repo.languages_url;
        // make a fetch request to the url. This will return a list of languages
        fetch(url)
            .then(response => response.json())
            .then(data => {
                let languages = Object.keys(data);
                resolve(languages);
            })
            .catch(error => {
                console.log(error);
                reject(error);
            });
    });
}
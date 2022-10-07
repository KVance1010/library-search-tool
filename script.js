var userFormEl = document.querySelector('#user-form');
var userFormElPage = document.querySelector('#user-1');
var nameInputEl = document.querySelector('#username');
var repoContainerEl = document.querySelector('#repos-container');
var repoSearchTerm = document.querySelector('#repo-search-term');
var dropDown = document.querySelector('#formatID');
var dropDownVal 
var formSubmitHandler = function (event) {
  event.preventDefault();
    dropDownVal = dropDown.value
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);

    repoContainerEl.textContent = '';
    nameInputEl.value = '';
  } else {
    alert('Please enter a Search term');
  }
};

// var buttonClickHandler = function (event) {
//   var language = event.target.getAttribute('data-language');

//   // Why is this `if` block in place?
//   // TODO: Write your answer here
//   if (language) {
//     getFeaturedRepos(language);

//     repoContainerEl.textContent = '';
//   }
// };

var getUserRepos = function (user) {

  var apiUrl = 'https://www.loc.gov/'+dropDownVal+'/?'+user+'&fo=json' 

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        console.log(response);
        response.json().then(function (data) {
          console.log(data);
          displayRepos(data, user);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function (error) {
      alert('Unable to connect to library');
    });
};

// var getFeaturedRepos = function (language) {
//   // What are the query parameters doing here?
//   // TODO: Write your answer here
//   var apiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';

//   fetch(apiUrl).then(function (response) {
//     if (response.ok) {
//       response.json().then(function (data) {
//         displayRepos(data.items, language);
//       });
//     } else {
//       alert('Error: ' + response.statusText);
//     }
//   });
// };

var displayRepos = function (repos, searchTerm) {
  if (repos.length === 0) {
    repoContainerEl.textContent = 'No content found.';
    return;
  }
console.log(repos.results.length)
  repoSearchTerm.textContent = searchTerm;

  for (var i = 0; i < repos.results.length; i++) {
    // What is the result of this string concatenation?
    // TODO: Write your answer here
    var repoName = repos.results[i].title

    var repoEl = document.createElement('div');
    repoEl.classList = 'list-item flex-row justify-space-between align-center';

    var titleEl = document.createElement('span');
    titleEl.textContent = repoName;

    repoEl.appendChild(titleEl);

    // var statusEl = document.createElement('span');
    // statusEl.classList = 'flex-row align-center';

    // if (repos[i].open_issues_count > 0) {
    //   statusEl.innerHTML =
    //     "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + ' issue(s)';
    // } else {
    //   statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    // }

    // repoEl.appendChild(statusEl);

    repoContainerEl.appendChild(repoEl);
  }
};
function changePage(){
    document.location = './results.html'
formSubmitHandler()
}

userFormElPage.addEventListener('submit',changePage)
userFormEl.addEventListener('submit', formSubmitHandler);

// languageButtonsEl.addEventListener('click', buttonClickHandler);
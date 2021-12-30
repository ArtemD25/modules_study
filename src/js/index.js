import { showSection, renderTweets, renderLikedTweets, customizeEditSection } from './ui';
import { saveTweet, editTweet } from './tweetsUI';
import '../scss/style.scss';

const controlsAddTweetBtn = document.querySelector('#controlsAddTweet');
const controlsShowLikedBtn = document.querySelector('#controlsShowLiked');
const controlsMainPageBtn = document.querySelector('#controlsMainPage');
const newTweetSaveBtn = document.querySelector('#newTweet__button--save');
const editTweetSaveBtn = document.querySelector('#editTweet__button--save');
const cancelBtns = document.querySelectorAll('.cancel-btn');
const tweetInput = document.querySelector('#newTweet__text');

renderTweets(false);
showLikedButtonsIfApplicable();

controlsAddTweetBtn.addEventListener('click', () => {
  history.pushState({id: 'newTweet'}, null, '#/add');
  tweetInput.value = '';
  showSection('newTweet');
  renderButtons(true, false);
});

controlsShowLikedBtn.addEventListener('click', () => {
  history.pushState({id: 'likedTweets'}, null, '#/liked');
  renderLikedTweets();
  showSection('likedTweets');
  renderButtons(true, false);
});

controlsMainPageBtn.addEventListener('click', () => {
  history.pushState({id: null}, null, ' ');
  showMainPageAndBtns();
});

cancelBtns.forEach(item => {
  item.addEventListener('click', () => {
    history.pushState({id: null}, null, ' ');
    showMainPageAndBtns();
  })
});

newTweetSaveBtn.addEventListener('click', () => {
  if (saveTweet(tweetInput.value)) {
    history.pushState({id: null}, null, ' ');
    showMainPageAndBtns();
  }
});

editTweetSaveBtn.addEventListener('click', () => {
  if (editTweet()) {
    history.pushState({id: null}, null, ' ');
    showMainPageAndBtns();
  }
});

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('tweet__text')) {
    history.pushState({id: 'editTweet'}, null, `#/edit/:item_${evt.target.getAttribute('data-tweet')}`);
    showSection('editTweet');
    customizeEditSection(evt.target.getAttribute('data-tweet'));
    renderButtons(true, false);
  }
});

window.addEventListener('popstate', (evt) => {
  if (evt.state.id === null) {
    showMainPageAndBtns();
  } else {
    showSection(evt.state.id);
  }
});

function renderButtons(allTweets, newTweet) {
  if (allTweets) {
    if (controlsMainPageBtn.classList.contains('hidden')) {
      controlsMainPageBtn.classList.remove('hidden');
    }
  } else {
    if (!controlsMainPageBtn.classList.contains('hidden')) {
      controlsMainPageBtn.classList.add('hidden');
    }
  }
  
  if (newTweet) {
    if (controlsAddTweetBtn.classList.contains('hidden')) {
      controlsAddTweetBtn.classList.remove('hidden');
    }
  } else {
    if (!controlsAddTweetBtn.classList.contains('hidden')) {
      controlsAddTweetBtn.classList.add('hidden');
    }
  }
}

function showLikedButtonsIfApplicable() {
  if (!sessionStorage.getItem('tweets') || JSON.parse(sessionStorage.getItem('tweets')).length === 0) {
    if (!controlsShowLikedBtn.classList.contains('hidden')) {
      controlsShowLikedBtn.classList.add('hidden');
    }
  } else {
    const tweets = JSON.parse(sessionStorage.getItem('tweets'));
    for (let i = 0; i < tweets.length; i++) {
      if (tweets[i].liked) {
        if (controlsShowLikedBtn.classList.contains('hidden')) {
          controlsShowLikedBtn.classList.remove('hidden');
        }
        return;
      }
    }
    if (!controlsShowLikedBtn.classList.contains('hidden')) {
      controlsShowLikedBtn.classList.add('hidden');
    }
  }
}

function showMainPageAndBtns() {
  showSection('allTweets');
  renderTweets(false);
  renderButtons(false, true);
  showLikedButtonsIfApplicable();
}

export { showLikedButtonsIfApplicable };
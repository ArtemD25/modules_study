import { toggleTweetToBeLiked, deleteTweet } from './tweetsUI';
import { showLikedButtonsIfApplicable } from './index';

const allTweetsList = document.querySelector('#allTweets__list');
const allLikedTweetsList = document.querySelector('#likedTweets__list');
const modalShowTimeDuration = 2000;

function showSection(id) {
  const allSections = document.querySelectorAll('.twitterSection');
  allSections.forEach(section => {
    if (section.id === id) {
      if (section.classList.contains('hidden')) {
        section.classList.remove('hidden');
      }
    } else {
      if (!section.classList.contains('hidden')) {
        section.classList.add('hidden');
      }
    }
  })
}

function createElem(tag, id, classes, textContent, attributes) {
  const elem = document.createElement(tag);
  if (id) {
    elem.id = id;
  }
  if (textContent) {
    elem.textContent = textContent;
  }
  if (attributes) {
    const attributesKeys = Object.keys(attributes);
    for (let i = 0; i < attributesKeys.length; i++) {
      elem.setAttribute(attributesKeys[i], attributes[attributesKeys[i]]);
    }
  }
  if (classes) {
    for (let i = 0; i < classes.length; i++) {
      elem.classList.add(classes[i]);
    }
  }
  return elem;
}

function renderTweets() {
  [...allTweetsList.children].forEach(item => item.remove());
  if (sessionStorage.getItem('tweets')) {
    const tweets = JSON.parse(sessionStorage.getItem('tweets'));
    tweets.forEach(item => allTweetsList.append(createTweet(item)));
  }
}

function renderLikedTweets() {
  [...allLikedTweetsList.children].forEach(item => item.remove());
  const tweets = JSON.parse(sessionStorage.getItem('tweets'));
  tweets.forEach(item => {
    if (item.liked) {
      allLikedTweetsList.append(createTweet(item))
    }
  });
}


function createTweet(data) {
  const li = createElem('li', null, ['tweet'], null, {
    'data-tweet': data.id
  });
  const tweetDate = createElem('p', null, ['tweet__date'], data.date);
  const tweetText = createElem('p', null, ['tweet__text'], data.text, {
    'data-tweet': data.id
  });
  const tweetItems = createElem('ul', null, ['tweet__items']);
  const tweetItemLikeBtn = createElem('li', null, ['tweet__item', 'btn-like']);
  const tweetItemDeleteBtn = createElem('li', null, ['tweet__item', 'btn-delete']);
  const tweetLikeBtn = createElem('button', null,
    ['tweet__button', data.liked ? 'tweet__button--unlike' : 'tweet__button--like'], null, {
    type: 'button',
    title: 'Like / Unlike tweet'
  });
  tweetItemLikeBtn.append(tweetLikeBtn);
  const tweetDeleteBtn = createElem('button', null, ['tweet__button', 'tweet__button--delete'], null, {
    type: 'button',
    title: 'Delete tweet'
  });
  tweetItemDeleteBtn.append(tweetDeleteBtn);
  tweetItems.append(tweetItemLikeBtn, tweetItemDeleteBtn);
  li.append(tweetDate, tweetText, tweetItems);
  return li;
}

document.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('tweet__button--like')) {
    evt.target.classList.remove('tweet__button--like');
    evt.target.classList.add('tweet__button--unlike');
    toggleTweetToBeLiked(evt.target.closest('.tweet').getAttribute('data-tweet'), true);
    showModal(`Hooray! You liked tweet with id ${evt.target.closest('.tweet').getAttribute('data-tweet')}!`);
    showLikedButtonsIfApplicable();
  } else if (evt.target.classList.contains('tweet__button--unlike')) {
    evt.target.classList.add('tweet__button--like');
    evt.target.classList.remove('tweet__button--unlike');
    toggleTweetToBeLiked(evt.target.closest('.tweet').getAttribute('data-tweet'), false);
    showModal(`Sorry you no longer like tweet with id ${evt.target.closest('.tweet').getAttribute('data-tweet')}`);
    showLikedButtonsIfApplicable();
  } else if (evt.target.classList.contains('tweet__button--delete')) {
    deleteTweet(evt.target.closest('.tweet').getAttribute('data-tweet'));
    evt.target.closest('.tweet').remove();
  }
})

function customizeEditSection(id) {
  const editTweetArea = document.querySelector('#editTweet__text');
  editTweetArea.setAttribute('data-tweet', id);
  editTweetArea.value = '';
  const tweets = JSON.parse(sessionStorage.getItem('tweets'));
  for (let i = 0; i < tweets.length; i++) {
    if (+tweets[i].id === +id) {
      editTweetArea.value = tweets[i].text;
      return;
    }
  }
}

function showModal(text) {
  const modal = document.querySelector('#modal');
  modal.innerText = text;
  modal.classList.add('modal--show');
  setTimeout(() => {
    modal.classList.remove('modal--show');
  }, modalShowTimeDuration)
}

export { showSection, renderTweets, renderLikedTweets, customizeEditSection, showModal };
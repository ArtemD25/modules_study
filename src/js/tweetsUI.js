import { showModal } from './ui';

const shortTextError = 'You did not type in any message';
const notUniqueTextError = 'The tweet shall differ from the already existing tweets';

function saveTweet(text) {
  if (text === '') {
    showModal(shortTextError);
    return false;
  }
  if (sessionStorage.getItem('tweets')) {
    const tweets = JSON.parse(sessionStorage.getItem('tweets'));
    if (isTweetValid(text, tweets)) {
      tweets.push({
        id: getUniqueID(tweets),
        text: text,
        liked: false,
        date: new Date().toLocaleString()
      })
      sessionStorage.setItem('tweets', JSON.stringify(tweets));
      return true;
    } else {
      showModal(notUniqueTextError);
      return false;
    }
  } else {
    sessionStorage.setItem('tweets', JSON.stringify([
      {
        id: 1,
        text: text,
        liked: false,
        date: new Date().toLocaleString()
    }
    ]));
    return true;
  }
}

function editTweet() {
  const text = document.querySelector('#editTweet__text').value;
  if (text === '') {
    showModal(shortTextError);
    return false;
  }
  const tweetID = document.querySelector('#editTweet__text').getAttribute('data-tweet');
  const tweets = JSON.parse(sessionStorage.getItem('tweets'));
  if (isTweetValid(text, tweets)) {
    for (let i = 0; i < tweets.length; i++) {
      if (+tweets[i].id === +tweetID) {
        tweets[i].text = text;
        break;
      }
    }
    sessionStorage.setItem('tweets', JSON.stringify(tweets));
    return true;
  }
  showModal(notUniqueTextError);
  return false;
}

function getUniqueID(array) {
  const ids = array.map(item => item.id);
  if (ids.length === 0) { // if array already exists but is empty
    return 1;
  }
  if (ids.length > 1) {
    ids.sort((a, b) => a - b);
  }
  for (let i = 0; i < ids.length; i++) {
    if (ids[i + 1] && ids[i + 1] - ids[i] > 1) {
      return ids[i] + 1;
    }
  }
  return ids[ids.length - 1] + 1;
}

function isTweetValid(text, tweets) {
  for (let i = 0; i < tweets.length; i++) {
    if (tweets[i].text === text) {
      return false;
    }
  }
  return true;
}

function toggleTweetToBeLiked(id, setLiked) {
  const tweets = JSON.parse(sessionStorage.getItem('tweets'));
  for (let i = 0; i < tweets.length; i++) {
    if (+tweets[i].id === +id) {
      if (setLiked) {
        tweets[i].liked = true;
        sessionStorage.setItem('tweets', JSON.stringify(tweets));
        return;
      } else {
        tweets[i].liked = false;
        sessionStorage.setItem('tweets', JSON.stringify(tweets));
        return;
      }
    }
  }
}

function deleteTweet(id) {
  const tweets = JSON.parse(sessionStorage.getItem('tweets'));
  for (let i = 0; i < tweets.length; i++) {
    if (+tweets[i].id === +id) {
      tweets.splice(i, 1);
      sessionStorage.setItem('tweets', JSON.stringify(tweets));
      return;
    }
  }
}

export { saveTweet, toggleTweetToBeLiked, deleteTweet, isTweetValid, editTweet };
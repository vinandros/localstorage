const form = document.querySelector("#formulario");
const tweetsList = document.querySelector("#lista-tweets");
let tweets = [];
eventListeners();

function eventListeners() {
  form.addEventListener("submit", addTweet);

  document.addEventListener("DOMContentLoaded", () => {
    tweets = JSON.parse(localStorage.getItem("tweets")) || [];
    builHTMLListTweets();
  });
}

function addTweet(e) {
  e.preventDefault();
  const tweet = document.querySelector("#tweet").value;
  if (tweet === "") {
    showErrorMsg("El Tweet no puede ir vacio");
    return;
  }

  const tweetObj = {
    id: Date.now(),
    tweet,
  };

  tweets = [...tweets, tweetObj];

  builHTMLListTweets();

  form.reset();
}

function showErrorMsg(msg) {
  const error = document.createElement("p");
  error.textContent = msg;
  error.classList.add("error");

  const container = document.querySelector("#contenido");
  container.appendChild(error);

  setTimeout(() => {
    error.remove();
  }, 3000);
}

function builHTMLListTweets() {
  clearHMTL();
  if (tweets.length > 0) {
    tweets.forEach((tweet) => {
      const deleteBtn = document.createElement("a");
      deleteBtn.classList.add("borrar-tweet");
      deleteBtn.innerText = "X";

      deleteBtn.onclick = () => {
        deleteTweet(tweet.id);
      };

      const li = document.createElement("li");
      li.textContent = tweet.tweet;
      li.appendChild(deleteBtn);

      tweetsList.appendChild(li);
    });
  }

  syncStorage();
}

function deleteTweet(id) {
  tweets = tweets.filter((tweet) => tweet.id !== id);
  builHTMLListTweets();
}

function clearHMTL() {
  while (tweetsList.firstChild) {
    tweetsList.removeChild(tweetsList.firstChild);
  }
}

function syncStorage() {
  localStorage.setItem("tweets", JSON.stringify(tweets));
}

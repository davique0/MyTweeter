/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //takes an Object and format the data into Tweeter html/CSS format
const createTweetElement = function(data) {
  const rdmAvatar = Math.floor(Math.random() * 8 + 1)
  const $tweet = $(`<article>
  <header class="old-tweeters">
    <div>
      <img class="face-avatar" src="/images/face_${rdmAvatar}.png" alt="Face Avatar">
      <span>${data.user.name}</span>
    </div>
    <span class="light-handler">${data.user.handle}</span>
  </header>
  <section> <!-- Tweet content -->
    <p>${data.content.text}</p>
  </section>
  <footer>
    <span>${data.created_at}</span>
    <div> <!-- icons -->
      <span><i class="fa-solid fa-flag"></i></span>
      <span><i class="fa-solid fa-retweet"></i></span>
      <span><i class="fa-solid fa-heart"></i></span>
    </div>
  </footer>
</article>`)
  return $tweet
};

//Renders more than 1 tweet at the time
const renderTweets = function(tweets) {
  //takes every post and callback createTweetElement
  const postTweet = tweets.map((x) => createTweetElement(x));
  $('#tweets-container').prepend(postTweet);
}

// POST request to server
$('form').on('submit', function(e) {
  e.preventDefault();
  const data = $(this).serialize();
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'POST',
    data: data
  });


});

// Get request 
const loadTweets = function() {
  $.ajax({
    url: 'http://localhost:8080/tweets',
    method: 'GET',
  })
  .then(data => {
    renderTweets(data)
  });
};

loadTweets();
});
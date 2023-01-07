/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //takes an Object and format the data into Tweeter html/CSS format
  const createTweetElement = function(data) {
    const rdmAvatar = Math.floor(Math.random() * 8 + 1);
    const userName = data.user.name;
    const userHandle = data.user.handle;
    const userTweet = data.content.text;
    const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    const $tweet = $(`<article>
    <header class="old-tweeters">
      <div>
        <img class="face-avatar" src="/images/face_${rdmAvatar}.png" alt="Face Avatar">
        <span>${escape(userName)}</span>
      </div>
      <span class="light-handler">${escape(userHandle)}</span>
    </header>
    <section> <!-- Tweet content -->
      <p>${escape(userTweet)}</p>
    </section>
    <footer>
      
      <span >${timeago.format(data.created_at, 'en_US')}</span>
      <div> <!-- icons -->
        <span><i class="fa-solid fa-flag"></i></span>
        <span><i class="fa-solid fa-retweet"></i></span>
        <span><i class="fa-solid fa-heart"></i></span>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  //Renders more than 1 tweet at the time
  const renderTweets = function(tweets) {
    //takes every post and callback createTweetElement
    
    const postTweet = tweets.sort((a,b) => {
      return b.created_at - a.created_at;
    }).map((x) => createTweetElement(x));

    $('#tweets-container').html(postTweet);
  };


  // POST request to server
  $('form').submit(function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    if (data.length <= 5) {
      $('.error').slideDown(600).text(`⚠️ Let's add something to your tweet before submiting`);
      return;
    }
    if (data.length > 145) {
      $('.error').slideDown(500).text(`⚠️ Maybe that's too much info let's try with less characters`);
      return;
    }
    if (data.length > 5 && data.length <= 145) {
      $('.error').slideUp(300);
    }

    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'POST',
      data: data
    })
      .then(loadTweets)
      .then($('#tweet-text').val(null))
      .then($('#tweet-text').parent().find('.counter').text('140'));
      
    
  });

  // Get request
  const loadTweets = function() {
    $.ajax({
      url: 'http://localhost:8080/tweets',
      method: 'GET',
    })
      .then(data => {
        renderTweets(data);
      });
  };
  loadTweets();

});

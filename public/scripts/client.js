/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {

  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  const createTweetElement = function (tweet) {
    let $tweet = $(`<article class="tweet">
  <header>
    <div class="avatar-container">
     <img class="avatar" src= "${tweet.user.avatars}" alt="avatar Image">
      <h4> ${tweet.user.name}</h4>
    </div>
      <p> ${tweet.user.handle}</p>
  </header>
  <span name="text" id="tweet-text">${escape(tweet.content.text)}</span>
  <footer>
    <time datetime="2023-04-25T12:00:00">${timeago.format(
      tweet.created_at
    )}</time>
    <div class="icons">
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-solid fa-heart"></i>
      </div>
  </footer>
  </article>`);

    return $tweet;
  };

  // const data = [
  //   {
  //     "user": {
  //       "name": "Newton",
  //       "avatars": "https://i.imgur.com/73hZDYK.png"
  //       ,
  //       "handle": "@SirIsaac"
  //     },
  //     "content": {
  //       "text": "If I have seen further it is by standing on the shoulders of giants"
  //     },
  //     "created_at": 1461116232227
  //   },
  //   {
  //     "user": {
  //       "name": "Descartes",
  //       "avatars": "https://i.imgur.com/nlhLi3I.png",
  //       "handle": "@rd" },
  //     "content": {
  //       "text": "Je pense , donc je suis"
  //     },
  //     "created_at": 1461113959088
  //   }
  // ]

  const renderTweets = function (tweets) {
    const $tweetsContainer = $(".tweets-container");

    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $tweetsContainer.prepend($tweet);
    }
  };

  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
      method: "GET",
      dataType: "json",
      success: function (data) {
        console.log("Data received: ", data);
        renderTweets(data);
      },
      error: function (error) {
        console.log("Error fetching tweets: ", error);
      },
    });
  };

  loadTweets();

  $(".create-tweet").submit(function (event) {
    event.preventDefault();
    const formData = $(this).serialize();
    // To Get the tweet content from the form
    const tweetContent = $("#tweet-text").val();
    // To Check if the tweet content is too long or not present
    if (!tweetContent) {
      $('#error-messages').text('Your tweet cannot be empty.').show();
      return;
    }

    if (tweetContent.length > 140) {
      $('#error-messages').text("Error: Tweet content exceeds the maximum length of 140 characters."
      ).show();
      return;
    }
    $('#error-messages').hide();

    $.ajax({
      url: "/tweets",
      method: "POST",
      data: formData,
      success: function(response) {
        // reload tweets after successful submission
        loadTweets();
        // clear the form after successful submission
        $(".create-tweet").trigger("reset");
        $(".counter").text(140)
      }
    })
   
  });




 
});

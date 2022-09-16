$(document).ready(function() {
  $('.error').hide();
  /*
  * Client-side JS logic goes here
  * jQuery is already loaded
  * Reminder: Use (and do all your DOM work in) jQuery's document ready function
  */

  /*const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd" },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]*/

  //RENDER Function WORKS!
  // loops through tweets
  // calls createTweetElement for each tweet
  // takes return value and appends it to the tweets container
  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let output = createTweetElement(tweet);
      //console.log(output);
      $('.all-tweets').prepend(output);
    }

  }

  const createTweetElement = function(tweet) {
    //excape fn to avoid cross-site scripting
    const escape = function (str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    //create tweet in HTML format
    let $tweet = `
      <article class="tweet">
        <header>
          <div class="face">
            <img src=${tweet.user.avatars}>
            <p>${tweet.user.name}</p>
          </div>
          <p class="username">${tweet.user.handle}</p>
        </header>
        <p class="tweet-body">${escape(tweet.content.text)}</p>
        <footer>
          <p>${timeago.format(tweet.created_at)}</p>
          <p class="icon">
            <i class="fa-solid fa-flag"></i>
            <i class="fa-sharp fa-solid fa-retweet"></i>
            <i class="fa-sharp fa-solid fa-heart"></i>
          </p>
        </footer>
      </article>
    `;
      
    return $tweet;
  }

  ////////////////////
  // EVENT LISTENER //
  ////////////////////
  const $form = $( "#form" );

  $form.on("submit", (event) => {
    event.preventDefault();
    if ($('#tweet-text').val() === "" || $('#tweet-text').val() === null) {
      //alert("You can't submit an empty tweet! Try writing something first!")
      $('.error p').text("You can't submit an empty tweet! Try writing something first!");
      $('.error').slideDown();

    } else if ($('#tweet-text').val().length > 140) {
      //alert("Tweet character limit exceeded!")
      $('.error p').text("Tweet character limit exceeded!");
    } else {
      $('.error').slideUp();
      const serializedData = $form.serialize();
      $.post('/tweets', serializedData, (response) => {
        //console.log(response);
        loadTweets();
      });
      //loadTweets();
    }
  });

  const $container = $('.all-tweets');

  const loadTweets = () => {
    $.ajax({
      type: 'GET',
      url: '/tweets',
      success: (data) => {
        //console.log(data);
        $container.empty();
        renderTweets(data);  
      }
    });
  };
  loadTweets();
});
chrome.storage.local.get('playing', function(items) { 
  var playing = items.playing,
      playStatu = playing ? 'running' : 'paused';
  $('.jp-play').toggleClass('pause', playing).toggleClass('play', !playing); 
  $('.m-img img')[0].style.webkitAnimationPlayState = playStatu;
}); 

chrome.storage.onChanged.addListener(function(changes, namespace) {
  for (key in changes) {  
    var newValue = changes[key].newValue;
    if(key === 'playing') {
      playStatu = newValue ? 'running' : 'paused';
      $('.jp-play').toggleClass('pause', newValue).toggleClass('play', !newValue);
      $('.m-img img')[0].style.webkitAnimationPlayState = playStatu;
    }else if(key === 'rdy'){
      $('.jp-rdy').width(newValue);
    }else if(key === 'cur'){
      $('.jp-cur').width(newValue);
    }  
  }
});

var setCurrentSong = function(response){
  $('.title').text(response.song).parent().attr('href','http://www.baidu.com/s?wd='+response.song);
  $('.album-cover img,.m-img img').attr('src',  response.cover.split('?')[0]+'?param=90y90'); 
  $('.artist').text(response.artist).attr('href','http://www.baidu.com/s?wd='+response.artist); 
  $('.jp-rdy').width(response.rdy);
  $('.jp-cur').width(response.cur);
};

tabDo(function(tab){ 
    chrome.tabs.sendMessage(tab, 'getCurrentSong', setCurrentSong);

    $('div.player-controls > .btns > div').click(function(event){
      var action = '.' + $(this).data('action');
      chrome.tabs.sendMessage(tab, action, setCurrentSong);
    });
});

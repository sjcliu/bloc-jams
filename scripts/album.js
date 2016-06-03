// Assigns previously static song row template to a variable called template and return it.
 var createSongRow = function(songNumber, songName, songLength) {
     var template =
        '<tr class="album-view-song-item">'
      + '  <td class="song-item-number" data-song-number="' +songNumber+ '">' + songNumber + '</td>'
      + '  <td class="song-item-title">' + songName + '</td>'
      + '  <td class="song-item-duration">' + filterTimeCode(songLength) + '</td>'
      + '</tr>'
      ;

     var $row = $(template);

     var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));

       if (currentlyPlayingSongNumber !== null) {
         //REvert to song number for currently playing song because user started palying new song.
         var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);

         currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
         currentlyPlayingCell.html(currentlyPlayingSongNumber);
       }
       if (currentlyPlayingSongNumber !== songNumber) {
         // Switch from Play -> Pause button to indicate new song is playing
         setSong(songNumber);
         currentSoundFile.play();
         updateSeekBarWhileSongPlays();
         currentSongFromAlbum = currentAlbum.songs[songNumber - 1];

         var $volumeFill = $('.volume .fill');
         var $volumeThumb = $('.volume .thumb');
         $volumeFill.width(currentVolume + '%');
         $volumeThumb.css({left: currentVolume + '%'});

         $(this).html(pauseButtonTemplate);
         updatePlayerBarSong();
       }
       else if (currentlyPlayingSongNumber === songNumber){
         //Switch from Pause -> Play button to pause currently playing song.
           if (currentSoundFile.isPaused()) {
           $(this).html(pauseButtonTemplate);
           $('.main-controls .play-pause').html(playerBarPauseButton);
           currentSoundFile.play();
           updateSeekBarWhileSongPlays();
         } else {
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton);
            currentSoundFile.pause();
         }
       };
     };

     var onHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt(songNumberCell.attr('data-song-number'));

       if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(playButtonTemplate);
       }
     };

     var offHover = function(event) {
       var songNumberCell = $(this).find('.song-item-number');
       var songNumber = parseInt(songNumberCell.attr('data-song-number'));

       if (songNumber !== currentlyPlayingSongNumber) {
         songNumberCell.html(songNumber);
       }
     };

     // find elements with class .song-item-number in row thats clicked
     // similar to querySelector()
     $row.find('.song-item-number').click(clickHandler);
     //combines the mouseover nad mouseleave functions.
     $row.hover(onHover, offHover);
     //returns row which is created with the event listener attached.
     return $row;
 };

 var setCurrentAlbum = function(album) {
   //select all the HTML elements required to display on the album page.
   currentAlbum = album;
   var $albumTitle = $('.album-view-title');
   var $albumArtist = $('.album-view-artist');
   var $albumReleaseInfo = $('.album-view-release-info');
   var $albumImage = $('.album-cover-art');
   var $albumSongList = $('.album-view-song-list');
   //
   $albumTitle.text(album.title);
   $albumArtist.text(album.artist);
   $albumReleaseInfo.text(album.year + ' ' + album.label);
   $albumImage.attr('src', album.albumArtUrl);
   //clears the album song list to make sure we are working with clean slate.
   $albumSongList.empty();
   //goes through all the songs from the specified album object and insert them into the HTMl.
   for (var i = 0; i < album.songs.length; i++) {
     var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     $albumSongList.append($newRow);
   }
 };

 var updateSeekBarWhileSongPlays = function() {
     if (currentSoundFile) {
         //bind() the timeupdate event to currentSoundFile
         currentSoundFile.bind('timeupdate', function(event) {
             //use Buzz's getTime() method to get the current time of song
             var seekBarFillRatio = this.getTime() / this.getDuration();
             var $seekBar = $('.seek-control .seek-bar');

             updateSeekPercentage($seekBar, seekBarFillRatio);
             setCurrentTimeInPlayerBar(this.getTime());
         });
     }
 };
 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    //Make sure percentage is greater than 0 and less than 100
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    //Convert percentage to a string and add % character
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };


 var setupSeekBars = function() {
       //Using Jquery to find all elements in the DOM with a class of seek-bar
       //that are contained within the element with a class player-bar
       //This will return a jQuery wrapped array containing both the song seek control
       // and the volume control.
       var $seekBars = $('.player-bar .seek-bar');

       $seekBars.click(function(event) {
         //New property on the event object called pageX.
         //Subtract offset of the seek bar held in $(this) from the left side.
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         //
         var seekBarFillRatio = offsetX / barWidth;

         if ($(this).parent().attr('class') == 'seek-control') {
           seek(seekBarFillRatio * currentSoundFile.getDuration());
         } else {
           setVolume(seekBarFillRatio * 100);
         }
         //
         updateSeekPercentage($(this), seekBarFillRatio);
     });
     //We find elements with a class of thumb
     $seekBars.find('.thumb').mousedown(function(event) {
       //this = thumb
       var $seekBar = $(this).parent();
       //
       $(document).bind('mousemove.thumb', function(event){
         var offsetX = event.pageX - $seekBar.offset().left;
         var barWidth = $seekBar.width();
         var seekBarFillRatio = offsetX / barWidth;

         if ($seekBar.parent().attr('class') == 'seek-control') {
           seek(seekBarFillRatio * currentSoundFile.getDuration());
         } else {
           setVolume(seekBarFillRatio * 100);
         }

         updateSeekPercentage($seekBar, seekBarFillRatio);
       });
       //
       $(document).bind('mouseup.thumb', function(){
         $(document).unbind('mousemove.thumb')
         $(document).unbind('mouseup.thumb')
       });
     });
   };
  var trackIndex = function(album, song) {
   return album.songs.indexOf(song);
  };

 var updatePlayerBarSong = function() {
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    setTotalTimeInPlayerBar(currentSongFromAlbum.duration);
  };

var nextSong = function() {
    var getLastSongNumber = function(index) {
      return index == 0 ? currentAlbum.songs.length : index;

      if(index ==0){
        return currentAlbum.songs.length
      }else{
        return index;}
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    //Incrementing the song
    currentSongIndex++;

    if(currentSongIndex >= currentAlbum.songs.length) {
      currentSongIndex = 0;
    };

    //Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();

    //Update the player bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var previousSong = function() {
    var getLastSongNumber = function(index) {
      return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };

    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;

    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }

    // Set a new current song
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
    updateSeekBarWhileSongPlays();
    updatePlayerBarSong();

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.title);
    $('.main-controls .play-pause').html(playerBarPauseButton);

    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);

    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
};

var togglePlayFromPlayerBar = function() {
  if (currentSoundFile.isPaused()) {
  $(this).html(playerBarPauseButton);
  getSongNumberCell(currentlyPlayingSongNumber).html(playerBarPauseButton);
  currentSoundFile.play();
  } else {
   $(this).html(playerBarPlayButton);
   getSongNumberCell(currentlyPlayingSongNumber).html(playerBarPlayButton);
   currentSoundFile.pause();
  }
};

var setSong = function(songNumber) {
   if (currentSoundFile) {
     currentSoundFile.stop();
   };
   currentlyPlayingSongNumber = parseInt(songNumber);
   currentSongFromAlbum = currentAlbum.songs[songNumber - 1];
   //Assign a new buzz sound object. Passed the audio file via the audioUrl
   currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
     //Formats is an array of strings with acceptable audio formats
     //Preload tells buzz to load the mp3s as soon as the page loads.
     formats: [ 'mp3' ],
     preload: true
   });
   setVolume(currentVolume);
 };

var seek = function(time) {
  if(currentSoundFile) {
    currentSoundFile.setTime(time);
  }
};

 var setVolume = function(volume) {
   if(currentSoundFile) {
      currentSoundFile.setVolume(volume);
   }
 };

 var getSongNumberCell = function(number) {
   return $('.song-item-number[data-song-number="' + number + '"]');
 };

var setCurrentTimeInPlayerBar = function(currentTime) {
    $(".current-time").text(filterTimeCode(currentTime))
};

var setTotalTimeInPlayerBar = function(totalTime) {
    $(".total-time").text(filterTimeCode(totalTime))
};

var filterTimeCode = function(timeInSeconds) {
    minutes = Math.floor(parseFloat(timeInSeconds)/60)
    seconds = Math.floor(timeInSeconds - (minutes*60))
    return minutes +":"+ seconds
};
 //Album button templates
 var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
 var pauseButtonTemplate = '<a class="album-song-button"><span class= "ion-pause"></span></a>';
 var playerBarPlayButton = '<span class="ion-play"></span>';
 var playerBarPauseButton = '<span class="ion-pause"></span>';
 //Store state of playing song
 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;
 var currentSoundFile = null;
 var currentVolume = 80;
 var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');
 var $playPause = $('.main-controls .play-pause');

 $(document).ready(function() {
   setCurrentAlbum(albumPicasso);
   setupSeekBars();
   $previousButton.click(previousSong);
   $nextButton.click(nextSong);
   $playPause.click(togglePlayFromPlayerBar);
 });

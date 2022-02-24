//Taken from https://stackoverflow.com/questions/3177836/how-to-format-time-since-xxx-e-g-4-minutes-ago-similar-to-stack-exchange-site

function timeSince(date) {

    var seconds = Math.floor((new Date() - date) / 1000);
  
    var interval = seconds / 31536000;
  
    if (interval > 1) {
      if(interval <2){return Math.floor(interval) + " year";}
      else{return Math.floor(interval) + " years";}
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      if(interval <2){return Math.floor(interval) + " month";}
      else{return Math.floor(interval) + " months";}
    }
    interval = seconds / 86400;
    if (interval >= 1) {
      if(interval <2){return Math.floor(interval) + " day";}
      else{return Math.floor(interval) + " days";}
    }
    interval = seconds / 3600;
    if (interval > 1) {
      if(interval <2){return Math.floor(interval) + " hour";}
      else{return Math.floor(interval) + " hours";}
    }
    interval = seconds / 60;
    if (interval > 1) {
      if(interval <2){return Math.floor(interval) + " minute";}
      else{return Math.floor(interval) + " minutes";}
    }
    return Math.floor(seconds) + " seconds";
  }

  // TEST
  // var aDay = 24*60*60*1000;
  // console.log(timeSince(new Date(Date.now()-aDay)));
  // console.log(timeSince(new Date(Date.now()-aDay*5)));
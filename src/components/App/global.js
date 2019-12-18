/**
 * Analytics and Social Media scripts dumping ground.
 *
 * Currently this is all disabled, I was having some problem or
 * other. I should bring them back at some point I suppose.
 *
 * */

const run = () => {
  // Twitter (used for "share" buttons).
  // window.twttr = (function(d, s, id) {
  //   var js,
  //     fjs = d.getElementsByTagName(s)[0],
  //     t = window.twttr || {};
  //   if (d.getElementById(id)) return t;
  //   js = d.createElement(s);
  //   js.id = id;
  //   js.src = 'https://platform.twitter.com/widgets.js';
  //   fjs.parentNode.insertBefore(js, fjs);
  //   t._e = [];
  //   t.ready = function(f) {
  //     t._e.push(f);
  //   };
  //   return t;
  // })(document, 'script', 'twitter-wjs');
};

// Facebook (used for "share" buttons)
//   (function(d, s, id) {
//     var js,
//       fjs = d.getElementsByTagName(s)[0];
//     if (d.getElementById(id)) return;
//     js = d.createElement(s);
//     js.id = id;
//     js.src = 'https://connect.facebook.net/en_US/all.js#xfbml=1';
//     fjs.parentNode.insertBefore(js, fjs);
//   })(document, 'script', 'facebook-jssdk');

//   window.fbAsyncInit = function() {
//     window.FB.init({
//       appId: '401677530300534',
//       xfbml: true,
//       version: 'v2.9',
//     });
//   };
// };

export default run;

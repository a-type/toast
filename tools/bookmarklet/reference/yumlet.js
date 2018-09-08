/*global window */
(function (document) {
  if (document.getElementById('yummlyYumletConfirmClose')) {
    return false;
  }
  var
    siteTitle = document.title,
    siteProtocol = document.location.protocol,
    yDiv = document.createElement('div'),
    yIFrame = document.createElement('iframe'),
    body = document.getElementsByTagName('body')[0],
    pageScripts = document.getElementsByTagName('script'),
    pageWidth = document.documentElement.clientWidth,
    thisScriptURL = pageScripts[pageScripts.length - 1].src,
    scriptSearch = thisScriptURL.split('?')[1] || '',
    siteImage,
    siteUrl,
    url;

  yIFrame.setAttribute('scrolling', 'no');
  yIFrame.setAttribute('style', 'position:absolute; z-index:2147483646; top:0; left:0;');
  yIFrame.setAttribute('frameBorder', '0');

  if (pageWidth >= 480) {
    yDiv.setAttribute('style', 'position:fixed; z-index:2147483647; width: 600px; height: 500px; top:10px; right:10px;');
    yIFrame.setAttribute('width', '600');
    yIFrame.setAttribute('height', '500');
  } else {
    yDiv.setAttribute('style', 'position:fixed; z-index:2147483647; width: 300px; height: 440px; top:10px; left:10px;');
    yIFrame.setAttribute('width', '300');
    yIFrame.setAttribute('height', '440');
  }

  yDiv.innerHTML = '<a href="javascript:void(0);" id="yummlyYumletConfirmClose" style="text-decoration: none; position:absolute; color: #fff; top:10px; right: 15px; font-size: 23px; font-weight: bold; font-family: sans-serif; z-index:2147483647;">&times;</a>';

  function getSiteUrl() {
    var
      links = document.head.getElementsByTagName('link');

    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute('rel') === 'canonical') {
        var
          testUrl = links[i].getAttribute('href'),
          testReg = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i;

        if(testUrl.match(testReg)) {
          return testUrl;
        }
      }
    }
    return document.URL;
  }

  function getMetaImage() {
    var
      metaTags = document.getElementsByTagName('META'),
      imageTest = new Image(),
      imageUrl,
      testUrl;

    for (var i=0; i<metaTags.length; i++) {
      if (metaTags[i].getAttribute('property') && metaTags[i].getAttribute('property').toLowerCase() === 'og:image') {
        testUrl = metaTags[i].getAttribute('content');
        break;
      }
    }

    if (testUrl) {
      imageTest.onload = function () {
        if (imageTest.width >= 220 && imageTest.height >= 220) {
          siteImage = testUrl;
        }
      };
      imageTest.src = testUrl;
    }

    return testUrl;
  }

  function getMicroFormatImage() {
    var
      recipeMicro = document.getElementsByClassName('h-recipe')[0] || document.getElementsByClassName('hRecipe')[0];

    if (recipeMicro) {
      return recipeMicro.getElementsByClassName('u-photo')[0] || recipeMicro.getElementsByClassName('photo')[0];
    } else {
      return null;
    }
  }

  function getFirstImage() {
    var
      images = document.getElementsByTagName('img'),
      imageUrl = null;

    for (var i=0; i<images.length; i++) {
      var
        elem = images[i];

      if (elem.width >= 220 && elem.height >= 220) {

        while (elem && (elem.getAttribute('id') !== 'header') && (elem.className.split(' ').indexOf('header') === -1) && (elem.tagName !== 'header') ) {
          elem = elem.parentElement;
        }

        if (!elem) {
          imageUrl = images[i].src;
          break;
        }
      }
    }

    return imageUrl;
  }

  function loadIFrame() {
    siteImage = siteImage || getMicroFormatImage() || getFirstImage();
    url += '&image=' + encodeURIComponent(siteImage);
    yIFrame.setAttribute('src', url);
    yDiv.appendChild(yIFrame);
    body.appendChild(yDiv);
    document.getElementById('yummlyYumletConfirmClose').onclick = function () {
      yDiv.removeChild(yIFrame);
      body.removeChild(yDiv);
    };
  }

  siteUrl = getSiteUrl();
  url = siteProtocol + '//' + thisScriptURL.split('//')[1].split('/')[0] + '/urb/verify?url=' + encodeURIComponent(siteUrl) + '&title=' + encodeURIComponent(siteTitle) + '&urbtype=bookmarklet' + (scriptSearch ? '&' + scriptSearch : '');

  if (getMetaImage()) {
    /* wait for image test*/
    setTimeout(loadIFrame, 1000);
  } else {
    loadIFrame();
  }

}(window.document));

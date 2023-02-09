$(document).ready(function () {

  const
    $html = $('html'),
    userAgent = navigator.userAgent;

  let
    classBrowser = null,
    classOS = null;

  function getBrowser() {
    let browser = null;

    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
      browser = 'is-opera';
    } else if (navigator.userAgent.indexOf("Edge") >= 0) {
      browser = 'is-edge';
    } else if (navigator.userAgent.indexOf("Chrome") !== -1) {
      browser = 'is-chrome';
    } else if (navigator.userAgent.indexOf("Safari") !== -1) {
      browser = 'is-safari';
    } else if (navigator.userAgent.indexOf("Firefox") !== -1) {
      browser = 'is-firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
      browser = 'is-ie';
    }

    return browser;
  }

  function getOS() {
    const
      platform = window.navigator.platform,
      macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'],
      windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'],
      iosPlatforms = ['iPhone', 'iPad', 'iPod'],
      isIOS = /iPad/.test(navigator.platform) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
      checkVersion = /Version\/13/;

    let os = null,
      ratio = window.devicePixelRatio || 1,
      screen = {
        width: window.screen.width * ratio,
        height: window.screen.height * ratio
      };

    if (macosPlatforms.indexOf(platform) !== -1) {
      os = 'is-mac';
    } else if (iosPlatforms.indexOf(platform) !== -1) {
      os = 'is-ios';
      if (screen.width === 1125 && screen.height === 2436) { //iphonex screensize
        os += ' is-iphonex';
      } else if (screen.width === 828 && screen.height === 1792) {
        os += ' is-iphone11';
      }
    } else if (windowsPlatforms.indexOf(platform) !== -1) {
      os = 'is-windows';
    } else if (/Android/.test(userAgent)) {
      os = 'is-android';
    } else if (!os && /Linux/.test(platform)) {
      os = 'is-linux';
    }

    if (platform.indexOf('iPad') !== -1) {
      os += ' is-ipad';
    }

    if (isIOS & checkVersion.test(navigator.userAgent)) {
      os += ' is-ipad-13';
    }

    return os;
  }

  classOS = getOS();
  classBrowser = getBrowser();
  $html.addClass(classOS + ' ' + classBrowser);
})
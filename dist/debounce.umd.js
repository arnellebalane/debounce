!function(e,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):e.debounce=n()}(this,function(){return function(e,n,o){if(void 0===o&&(o=!0),"function"!=typeof e)throw new TypeError("Invalid type for callback parameter.");if("number"!=typeof n)throw new TypeError("Invalid type for duration parameter.");var t=null;return function(){var r=arguments;o&&!t&&e.apply(void 0,arguments),clearTimeout(t),t=setTimeout(function(){t=null,o||e.apply(void 0,r)},n)}}});
//# sourceMappingURL=debounce.umd.js.map

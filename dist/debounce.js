module.exports=function(r,e,o){if(void 0===o&&(o=!0),"function"!=typeof r)throw new TypeError("Invalid type for callback parameter.");if("number"!=typeof e)throw new TypeError("Invalid type for duration parameter.");var t=null;return function(){for(var n=[],a=arguments.length;a--;)n[a]=arguments[a];o&&!t&&r.apply(void 0,n),clearTimeout(t),t=setTimeout(function(){t=null,o||r.apply(void 0,n)},e)}};
//# sourceMappingURL=debounce.js.map

import DOMNodeCollection from './dom_node_collection.js';

const fns = [];

window.$l = (selector) => {
  if (selector instanceof Function) {
    if (document.readyState === 'complete') {
      selector();
    } else {
      fns.push(selector);
    }
  } else if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else {
    const collection = document.querySelectorAll(selector);
    return new DOMNodeCollection(Array.from(collection));
  }
};

window.$l.extend = (main, ...objs) => {
  objs.forEach(obj => {
    for (const attr in obj) {
      main[attr] = obj[attr];
    }
  });
  return main;
};

window.$l.ajax = function(options) {
  const xhttp = new XMLHttpRequest();

  const defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: "",
    success: () => {},
    error: () => {},
    data: {},
    async: true,
  };

  defaults = $l.extend(defaults, options);

  xhttp.open(defaults.method.toUpperCase(), defaults.url, defaults.async);
  xhttp.send();
};

document.addEventListener('DOMContentLoaded', () => {
  fns.forEach(fn => fn());
});

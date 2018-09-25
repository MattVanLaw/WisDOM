import DOMNodeCollection from './dom_node_collection.js';

const fns = [];

window.$w = (selector) => {
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

$w.extend = (main, ...objs) => {
  objs.forEach(obj => {
    for (const attr in obj) {
      main[attr] = obj[attr];
    }
  });
  return main;
};

$w.ajax = (options) => {
  const xhttp = new XMLHttpRequest();
  let defaults = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    type: 'GET',
    url: "",
    success: () => {},
    error: () => {},
    data: {},
  };

  options = $w.extend(defaults, options);

  xhttp.open(options.type, options.url);
  xhttp.onload = (e) => {
    if (xhttp.status === 200) {
      options.success(xhttp.response);
    } else {
      options.error(xhttp.response);
    }
  };
  xhttp.send();
};

document.addEventListener('DOMContentLoaded', () => {
  fns.forEach(fn => fn());
});

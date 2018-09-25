class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(node => node.innerHTML = html);
    } else if (this.nodes.length > 0) {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html('');
  }

  append(children) {
    if (this.nodes.length === 0) return;

    if (!(children instanceof DOMNodeCollection)) {
      children = $l(children);
    }

    this.each(node => {
      children.each(child => node.appendChild(child.cloneNode(true)));
    });
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.each(node => node.setAttribute(key, val));
    } else {
      this.nodes[0].getAttribute(key);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(changeClass) {
    this.each(node => node.classList.toggle(changeClass));
  }

  children() {
    const allChildren = [];
    this.each(node => {
      allChildren.push(node.children);
    });
    return allChildren.filter(child => child.length > 0);
  }

  parent() {
    const allParents = [];
    this.each(node => {
      allParents.push(node.parentElement);
    });
    const elements = Array.from(new Set(allParents));
    return new DOMNodeCollection(elements);
  }

  find(string) {
    const elements = Array.from(this.nodes[0].querySelectorAll(string));
    return new DOMNodeCollection(elements);
  }

  remove(badNode) {
    this.each(node => {
      badNode.node.forEach(child => {
        node.parentNode.removeChild(child);
      });
    });
  }

  on(string, cb){
    this.each(node => {
      node.addEventListener(string, cb);
    });
  }

  off(string, cb){
    this.each(node => {
      node.removeEventListener(string, cb);
    });
  }
}

export default DOMNodeCollection;
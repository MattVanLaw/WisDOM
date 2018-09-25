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

    if (typeof children === 'object' && !(children instanceof DOMNodeCollection)) {
      children = $w(children);
    }

    if (typeof children === 'string') {
      this.each(node => node.innerHTML += children);
    } else if (children instanceof DOMNodeCollection) {  
      this.each(node => {
        children.each(child => node.appendChild(child.cloneNode(true)));
      });
    }
  }

  attr(key, val) {
    if (typeof val === 'string') {
      this.each(node => node.setAttribute(key, val));
    } else {
      return this.nodes[0].getAttribute(key);
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

  remove() {
    this.each(node => node.parentNode.removeChild(node));
  }

  on(newEvent, cb) {
    this.each(node => {
      node.addEventListener(newEvent, cb);
    });
  }

  off(oldEvent, cb) {
    this.each(node => {
      node.removeEventListener(oldEvent, cb);
    });
  }
}

export default DOMNodeCollection;
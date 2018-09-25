# WisDOM

In order to gain a better understanding of Vanilla Javascript, I recreated the basic functionality of jQuery, including AJAX requests.

To set up WisDOM, place the below script tag in the head of your html document.
```html
<script src="https://rawgit.com/MattVanLaw/WisDOM/master/lib/wisDOM.js"></script>
```
For more examples, visit a small project made using the library, [Studio Ghibli Facts](https://github.com/MattVanLaw/studio-ghibli-facts).

## $w(selector) Methods

### #html(html)
  Set inner html of the selected element

### #empty()
  removes inner html from selected element

### #append(children)
  If supplied children is a simple string (e.g, "text"), will append to innerHTML of selected element, where as, if it is a string of an HTML element, it will append as a child of the selected element.
 
```html
$w(".main").append("<p class='wow'>Wow</p>")
```

### #attr(key [, val])
  When only supplied with a key will return the associated value. Will set the value, when both parameters are supplied.

### #addClass(newClass)

### #removeClass(oldClass)
### #toggleClass(changeClass)

### #children()
  Returns an HTMLCollection of children.

### #parent()
  Returns a DOMNodeCollection of parent element.

### #find(string)
  Will find elements that match provided string, and return a DOMNodeCollection.

### #remove()
  Removes selected node and all children.

### #on(newEvent, cb)
### #off(oldEvent, cb)
  Add and remove events
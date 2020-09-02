let element = (
  <div id="myId" class="myClass">
    <div></div>
    <div></div>
    <div></div>
  </div>
);
function ToyReact(type, attributes, ...children) {
  let element = document.createElement(type);
  for (let key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
  for (let child of children) {
    element.appendChild(child);
  }
  return element
}

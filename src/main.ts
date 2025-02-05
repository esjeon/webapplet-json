import { applets } from '@web-applets/sdk';

const context = applets.getContext();

context.setActionHandler('render', (data) => {
  context.data = data;
});

context.ondata = () => {
  const root = document.querySelector('main');
  root.innerHTML = '';
  root.appendChild(renderJson(context.data));
};

function renderJson(obj) {
  // Create a container div with grid layout
  const container = document.createElement("div");
  container.className = "json-grid";

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Create the key element
      const keyDiv = document.createElement("div");
      keyDiv.className = "json-key";
      keyDiv.textContent = key;

      // Create the value element
      const valueDiv = document.createElement("div");
      const value = obj[key];

      // If value is an object, render it recursively
      if (typeof value === "object" && value !== null) {
        valueDiv.className = "json-value json-value-object";
        valueDiv.appendChild(renderJson(value));
      } else {
        valueDiv.className = "json-value json-value-literal";
        valueDiv.textContent = value;
      }

      // Append the key and value elements to the container
      container.appendChild(keyDiv);
      container.appendChild(valueDiv);
    }
  }
  return container;
}

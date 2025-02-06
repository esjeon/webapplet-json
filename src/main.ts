import { applets } from '@web-applets/sdk';

const context = applets.getContext();

context.setActionHandler('render', ({ json, comment }) => {
  context.data = {
    object: JSON.parse(json),
    comment: comment,
  };
});

context.ondata = () => {
  const main = document.querySelector('main');
  main.innerHTML = '';
  main.appendChild(renderJson(context.data.object));

  const footer = document.querySelector('footer');
  footer.textContent = context.data.comment;
};

function renderJson(obj) {
  // Create a container div with grid layout
  const container = document.createElement("div");
  container.className = "json-grid";

  const isArray = Array.isArray(obj);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Create the key element
      const keyDiv = document.createElement("div");
      keyDiv.className = "json-key";
      keyDiv.textContent = (isArray) ? `[${key}]` : key;

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

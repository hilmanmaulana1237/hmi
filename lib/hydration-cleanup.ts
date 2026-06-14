export const hydrationAttributeCleanupScript = `
(function () {
  try {
    var shouldRemove = function (name) {
      return name === "bis_register" ||
        name === "bis_skin_checked" ||
        name === "fdprocessedid" ||
        (name.indexOf("__processed_") === 0 && name.lastIndexOf("__") === name.length - 2);
    };
    var cleanupElement = function (element) {
      if (!element || !element.attributes) return;
      for (var index = element.attributes.length - 1; index >= 0; index -= 1) {
        var name = element.attributes[index].name;
        if (shouldRemove(name)) element.removeAttribute(name);
      }
    };
    var cleanupTree = function (root) {
      cleanupElement(root);
      if (!root || !root.querySelectorAll) return;
      var nodes = root.querySelectorAll("*");
      for (var index = 0; index < nodes.length; index += 1) {
        cleanupElement(nodes[index]);
      }
    };
    var cleanupDocument = function () {
      cleanupTree(document.documentElement);
    };
    cleanupDocument();
    var observer = new MutationObserver(function (mutations) {
      for (var index = 0; index < mutations.length; index += 1) {
        var mutation = mutations[index];
        if (mutation.type === "attributes") {
          cleanupElement(mutation.target);
        }
        if (mutation.type === "childList") {
          for (var childIndex = 0; childIndex < mutation.addedNodes.length; childIndex += 1) {
            cleanupTree(mutation.addedNodes[childIndex]);
          }
        }
      }
    });
    observer.observe(document.documentElement, {
      attributes: true,
      childList: true,
      subtree: true
    });
    setTimeout(function () {
      cleanupDocument();
      observer.disconnect();
    }, 5000);
  } catch (_) {}
})();
`;

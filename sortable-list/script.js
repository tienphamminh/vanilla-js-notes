const sortableList = document.querySelector(".sortable-list");
const handles = sortableList.querySelectorAll(".handle");

handles.forEach((handle) => {
  handle.addEventListener("mousedown", (e) => {
    let item = e.currentTarget.parentElement;
    item.setAttribute("draggable", true);

    // Adding .dragging class to item after a delay
    const addDragging = () => {
      setTimeout(() => {
        item.classList.add("dragging");
      }, 0);
    };

    item.addEventListener("dragstart", addDragging);

    // Removing .dragging class, draggable attribute, dragstart EventListener from item on dragend event
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
      item.removeAttribute("draggable");
      item.removeEventListener("dragstart", addDragging);
    });
  });
});

const initSortableList = (e) => {
  e.preventDefault();
  const draggingItem = document.querySelector(".dragging");
  // Getting all items except currently dragging and making array of them
  let siblings = [...sortableList.querySelectorAll(".item:not(.dragging)")];

  // Finding the sibling after which the dragging item should be placed
  let nextSibling = siblings.find((sibling) => {
    return e.clientY <= sibling.offsetTop + sibling.offsetHeight / 2;
  });

  // Inserting the dragging item before the found sibling
  if (draggingItem !== null) {
    sortableList.insertBefore(draggingItem, nextSibling);
  }
};

sortableList.addEventListener("dragover", initSortableList);
sortableList.addEventListener("dragenter", (e) => e.preventDefault());

export default function menuComponent() {
    
    const container = document.createElement('div');
    container.classList.add('menuContainer');

    for (let i = 0; i < 15; i++) {
        const menuItem = document.createElement('div');
        menuItem.classList.add('menuItem');
        menuItem.appendChild(document.createElement('img'));
        const title = menuItem.appendChild(document.createElement('p'));
        title.innerText = "menuItem";

        container.appendChild(container.appendChild(menuItem));
    }
    
    return container;
}
export default function mainComponent() {
    const container = document.createElement('div');

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainer');

    const img = document.createElement('img');
    imageContainer.appendChild(img);
    
    const black = document.createElement('div');
    black.classList.add('black');
    imageContainer.appendChild(black);

    const h1 = document.createElement('h1');
    imageContainer.appendChild(h1);
    h1.innerText = "Restaurant of your dreams!"

    const description = document.createElement('p')
    description.classList.add('description');
    description.innerText = "This is the best restaurant that you can find frfr trust me bro I ain't lyin'"

    container.appendChild(imageContainer);
    container.appendChild(description);

    return container;
}
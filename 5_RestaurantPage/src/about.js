export default function aboutComponent() {
    const container = document.createElement('div');

    const img = document.createElement('img');
    img.classList.add('imageContainer');

    const description = document.createElement('p')
    description.classList.add('description');
    description.innerText = " Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illo sit rem culpa aliquam magnam, eaque impedit iste aliquid, maxime provident eveniet beatae labore quos, possimus id dolore minima nesciunt assumenda natus. Incidunt earum vero reprehenderit in perspiciatis suscipit, totam eos accusantium quod voluptate ut similique libero, architecto a cupiditate deserunt eaque esse veniam quas magnam. Odit exercitationem nesciunt sapiente illo expedita quo cumque architecto beatae, accusamus dolorum temporibus voluptatem mollitia ipsum, eveniet cupiditate autem blanditiis ipsam earum recusandae! Illum qui perferendis dolorem, labore dolores, nesciunt voluptas commodi debitis, tempora quod dolor nulla voluptatem molestias fugiat rem consequuntur voluptatum molestiae repudiandae consequatur blanditiis sequi placeat? Hic nam et quam iste necessitatibus excepturi voluptatem commodi eligendi in non tenetur molestias laborum, natus quod temporibus obcaecati eum sequi libero quidem error facilis odio? Quos, nisi consectetur explicabo nobis autem quidem assumenda suscipit, dignissimos blanditiis cupiditate placeat porro excepturi esse reprehenderit sint corporis cumque deleniti officiis unde architecto exercitationem dolor! Error repellat quibusdam dolores quaerat fugit harum enim veniam, sunt eos saepe ea soluta aspernatur. Enim omnis, dolorem cumque id, suscipit, sunt at animi beatae aut corporis quis doloremque accusamus veritatis provident iure quisquam atque repellat esse blanditiis molestiae nisi minima culpa error. Voluptatum.";

    container.appendChild(img);
    container.appendChild(description);

    return container;
}
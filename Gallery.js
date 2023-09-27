import { $register, stringify } from "./render";

const images = [
{src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg", alt:""},
{src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg", alt:""},
{src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg", alt:""},
{src: "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg", alt:""},
{src: "https://flowbite.s3.amazonaws.com/docs/gallery/featured/image.jpg", alt:""},
{src:"https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg", alt:"", mo:{y:[{o:'ayo'}]}, age:40},
];

export const Gallary = () => {
    const image = stringify(images[0]);
    return `
      <div 
        class="grid gap-4"
        id="gallary">
        <CurrentImage image=${image} />
        <Pagination images=${stringify(images)}/>
      </div>
    `;
}

const Pagination = (images) => {
    const listItems = images.map((image, key) => {
        return `
        <div id="${key}">
        <img
            onClick="$render(CurrentImage, '${stringify(image)}')"
            class="h-auto max-w-full rounded-lg" 
            src="${image.src}"
        />
        </div>
    `});

    return `
        <div 
        class="grid grid-cols-5 gap-4"
        id="pagination">
        ${listItems}
        </div>
    `;
}

const CurrentImage = (image) => {
    const {src, alt} = image;
    return `
        <div id="current-image">
        <img class="h-auto max-w-full rounded-lg" src="${src}" alt="${alt}">
        </div>
    `;
}

$register(CurrentImage, Pagination, CurrentImage);


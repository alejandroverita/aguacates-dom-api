/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl= "https://platzi-avo.vercel.app";
const appNode = document.querySelector('#app');

appNode.addEventListener('click', (event)=>{
    if(event.target.nodeName === 'H2') {
        alert('Bien hecho');
    }
});

const formatPrice = (price)=> {
    const newPrice = new window.Intl.NumberFormat("en-EN", {
        style: "currency",
        currency: "USD",
    }).format(price);

    return newPrice;
};

//web api
//conectarnos al servidor
window 
    .fetch(`${baseUrl}/api/avo`)
//procesar la respuesta y convertirla en JSON
    .then((respuesta) => respuesta.json())
//JSON-> Data -> Renderizar info browser
    .then(responseJson=>{
        const todosLosItems = [];
        responseJson.data.forEach((item)=>{

            //imagen
            const image = document.createElement('img');
            image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
            image.src = `${baseUrl}${item.image}`
            //titulo
            const title = document.createElement('h2');
            title.className = "text-lg text-lime-400";
            title.textContent = item.name;
            //precio
            const price = document.createElement('div');
            price.className = "text-gray-600"
            price.textContent = formatPrice(item.price);
            
            //wrap price and title
            const priceAndTitle = document.createElement("div");
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price)

            //container
            const container = document.createElement('div');
            container.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            container.appendChild(image);
            container.appendChild(priceAndTitle)
            // container.appendChild(title);
            // container.appendChild(price);
            todosLosItems.push(container);
        });
        appNode.append(...todosLosItems);
    });

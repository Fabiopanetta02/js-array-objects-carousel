/*
## Consegna
Dato un array di oggetti letterali con:
- url dell’immagine
- titolo
- descrizione
Creare un carosello ispirandosi alla foto allegata. Potete anche usare come base il carosello dell'esercizio precedente

//## Milstone 0:
Come nel primo carosello realizzato, focalizziamoci prima sulla creazione del markup statico: costruiamo il container e inseriamo l’immagine grande in modo da poter stilare lo slider.

//## Milestone 1:
Ora rimuoviamo i contenuti statici e usiamo l’array di oggetti letterali per popolare dinamicamente il carosello.
Al click dell’utente sulle frecce verso sinistra o destra, l’immagine attiva diventerà visibile e dovremo aggiungervi titolo e testo.

//## Milestone 2:
Aggiungere il ciclo infinito del carosello. Ovvero se la miniatura attiva è la prima e l’utente clicca la freccia verso destra, la miniatura che deve attivarsi sarà l’ultima e viceversa per l’ultima miniatura se l’utente clicca la freccia verso sinistra.
---
//## BONUS 1:
Aggiungere le thumbnails (sottoforma di miniatura) ed al click attivare l’immagine corrispondente.

//## BONUS 2:
Aggiungere funzionalità di autoplay: dopo un certo periodo di tempo (3 secondi) l’immagine attiva dovrà cambiare alla successiva.

//## BONUS 3:
Aggiungere bottoni di start/stop e di inversione del meccanismo di autoplay.
---
*/


//1- CREO ARRAY DI OGGETTI
const images = [
    {
      url: 'http://www.viaggiareonline.it/wp-content/uploads/2014/11/sweden_148857365.jpg',
      title: 'Svezia',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
  
    {
      url: 'https://static1.evcdn.net/images/reduction/1513757_w-1920_h-1080_q-70_m-crop.jpg',
      title: 'Perù',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
  
    {
      url: 'https://img.itinari.com/pages/images/original/0d3ed180-d22d-48e8-84df-19c4d888b41f-62-crop.jpg?ch=DPR&dpr=2.625&w=1600&s=7ebd4b5a9e045f41b4e0c7c75d298d6c',
      title: 'Chile',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
    {
      url: 'https://static1.evcdn.net/images/reduction/1583177_w-1920_h-1080_q-70_m-crop.jpg',
      title: 'Argentina',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
    {
      url: 'https://cdn.sanity.io/images/24oxpx4s/prod/ed09eff0362396772ad50ec3bfb728d332eb1c30-3200x2125.jpg?w=1600&h=1063&fit=crop',
      title: 'Colombia',
      description:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et temporibus voluptatum suscipit tempore aliquid deleniti aut veniam.',
    },
  ];

//2- STAMPO IN PAGINA GLI ELEMENTI DELLA ARRAY CON IL METODO DELLA STRINGA
const gallery = document.getElementById('gallery');
const thumbs = document.getElementById('thumbnail');

//GALLERY
let image = '';
for(let i = 0; i < images.length; i++){
    const currentImage = images[i];
    image += 
    `
    <img src="${currentImage.url}" alt="${currentImage.title}" class="img">
    <div class="description-image">
        <h2 class="text-end">${currentImage.title}</h2>
        <p class="text-end">${currentImage.description}</p>
    </div> 
    ` 
}
gallery.innerHTML = image;


//THUMBNAIL
let thumbImages = '';
for(let i = 0; i < images.length; i++){
    const currentImageThumb = images[i];
    thumbImages += 
    `
    <img src="${currentImageThumb.url}" alt="${currentImageThumb.title}" class="thumb">
    ` 
}
thumbs.innerHTML = thumbImages;

//3--Preparo un variabile per tenere d'occhio l'immagine attiva
let currentActiveIndex = 0;

//4--Decido che all'apertura della pagina sia sempre attiva la prima immagine
const imgGallery = document.getElementsByClassName('img');
imgGallery[currentActiveIndex].classList.add("active");

//Decido che all'apertura della pagina sia sempre attiva la prima descrizione
const descriptionImg = document.getElementsByClassName('description-image');
descriptionImg[currentActiveIndex].classList.add("active");

//Decido che all'apertura della pagina sia sempre attiva la prima immagine piccola
const imgThumb = document.getElementsByClassName('thumb');
imgThumb[currentActiveIndex].classList.add("active");


// !LOGICA BOTTONI //
//5-Creo delle costanti e delle variabili
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const reverseButton = document.getElementById('reverse');
let autoplay;

//6-Aggiungo un addEvenListener sul button //!START//
startButton.addEventListener('click', function(){

    //Creo la logica per cambiare le immagini da solo in maniera CRESCENTE
    autoplay = setInterval(function(){

        //rimuovo la class active
        imgGallery[currentActiveIndex].classList.remove('active');
        imgThumb[currentActiveIndex].classList.remove("active");
        descriptionImg[currentActiveIndex].classList.remove("active");
    
        //incremento il currentActiveIndex in modo da cambiare immagine
        currentActiveIndex++;
    
        //controllo in che posizione sono
        if(currentActiveIndex == images.length){
            currentActiveIndex = 0;
        }
    
        //Assegno la classe active alla nuova immagine corrispondente al currentActiveIndex 
        imgGallery[currentActiveIndex].classList.add('active');
        imgThumb[currentActiveIndex].classList.add("active");
        descriptionImg[currentActiveIndex].classList.add("active");

    }, 3000)

})

//7-Aggiungo un addEvenListener sul button //!REVERSE//
reverseButton.addEventListener('click', function(){

    //Creo la logica per cambiare le immagini da solo in maniera DECRESCENTE
    autoplay = setInterval(function(){

        //rimuovo la class active
        imgGallery[currentActiveIndex].classList.remove('active');
        imgThumb[currentActiveIndex].classList.remove("active");
        descriptionImg[currentActiveIndex].classList.remove("active");

        //decremento il currentActiveIndex in modo da cambiare immagine
        currentActiveIndex--;

        //controllo in che posizione sono
        if(currentActiveIndex < 0){
            currentActiveIndex = images.length - 1;
        }

        //Assegno la classe active alla nuova immagine corrispondente al currentActiveIndex 
        imgGallery[currentActiveIndex].classList.add('active');
        imgThumb[currentActiveIndex].classList.add("active");
        descriptionImg[currentActiveIndex].classList.add("active");

    }, 3000)
    
})

//8-Aggiungo un addEvenListener sul button //!PAUSE//
pauseButton.addEventListener('click', function(){

    //Creo la logica per stoppare l'autoplay
    clearInterval(autoplay);
})
import { IsValid } from "../isValid/IsValid.js";

class Gallery {
   /**
    * 
    * @param {string} selector 
    * @param {*} data 
    */

   constructor(selector, data) {
      this.selector = selector;
      this.data = data;
      this.DOM = null;

      this.size = {
         min: 3,
         max: 6,
      };

      this.rendering = {
         strategy: 'title',
         order: 'az'
      }

      this.dataForRendering = [];

      this.init();
   }
   // init metodas:
   init() {
      if (!this.isValidSelector() || !this.isValidData()) {
         return false;
      }

      this.filterDataForRendering();
      this.render();
      this.enableFilter();
   }

   // Duomenu validavimui sukuriami du metodai: isValidSelector ir isValidData:
   isValidSelector() {
      // Patikrinama ar pateiktas selektorius yra string ir ar jis nera tuscias:
      if (typeof this.selector !== 'string' || this.selector === '') {
         return false
      }

      // Patikrinama ar randamas paselektintas elementas:
      this.DOM = document.querySelector(this.selector);

      return this.DOM === null ? false : true;
      // identiska israiska tik trumpiau parasyta auksciau esanciam parasymui butu
      // return this.DOM !== null;
   }

   isValidData() {
      if (!IsValid.object(this.data)) {
         return false;
      }
      // Validuojamas this.data.size...
      const { size } = this.data;
      if (!IsValid.object(size)) {
         const { min, max } = size;
         if (IsValid.positiveInteger(min)) {
            this.size.min = min;
         }
         if (IsValid.positiveInteger(max)) {
            this.size.max = max;
         }
      }
      // Validuojamas this.data.rendering...
      const { rendering } = this.data;
      if (!IsValid.object(rendering)) {
         const { strategy, order } = rendering;
         if (IsValid.notEmptyString(strategy)) {
            this.rendering.strategy = strategy;
         }
         if (IsValid.notEmptyString(order)) {
            this.rendering.order = order;
         }
      }
      // Validuojamas this.data.content...
      if (!IsValid.nonEmptyArray(this.data.content)) {
         return false;
      }

      // Atfiltruojami tik geri objektai: pirmas atfiltravimo budas
      const validData = [];

      for (const item of this.data.content) {
         if (this.isValidGalleryItem(item)) {
            validData.push(item);
         }
      }

      this.data.content = validData;

      /*
  antras atfiltravimo budas:
  this.data.content = this.data.content.filter(this.isValidGalleryItem.bind(this));
  */

      return true;
   }

   filterDataForRendering() {
      const { max } = this.size;
      const { strategy, order } = this.rendering;

      if (strategy === 'loadingData') {
         this.dataForRendering = this.filterDataByLoadingData(order);
      }
      if (strategy === 'title') {
         this.dataForRendering = this.filterDataByTitle(order);
      }
      this.dataForRendering = this.dataForRendering.slice(0, max);
   }

   filterDataByLoadingData(order) {
      const dataCopy = [...this.data.content];
      return order === 'az' ? dataCopy : dataCopy.reverse();
   }
   // Kitas filtravimo metodas galetu buti pavyzdziui, pagal pavadinima:
   filterDataByTitle(order) {
      const dataCopy = [...this.data.content];
      dataCopy.sort((a, b) => a.title > b.title ? 1 : a.title === b.title ? 0 : -1)
      return order === 'az' ? dataCopy : dataCopy.reverse();
   }

   // Nuotraukos patikrinimas:
   isValidGalleryItemImage(str) {
      return true;
   }

   // Galerijos item validavimas:
   isValidGalleryItem(item) {
      if (item.published !== true ||
         !this.isValidGalleryItemImage(item.img) //... ir israsomi visi metodai kurie validuoja atskirus objekto key:value
      ) {
         return false;
      }
      return true;
   }

   // Issikeliamas renderyje naudojamas item elementas:
   generateContent() {
      let HTML = '';

      for (const item of this.dataForRendering) {
         HTML += `<div class="col-12 item">
         <img src="${item.img}" alt="${item.alt}">
         <div class="portfolio-layer">
            <h3 class="portfolio-title">${item.title}</h3>
            <p class="portfolio-description">${item.description}</p>
            <small class="tag">#${item.tags}</small>
            <div class="btn-container">
               <a href="${item.linkToCode}" class="btn" target="_blank">Code</a>
               <a href="${item.linkToProject}" class="btn"
                  target="_blank">Project</a>
            </div>
         </div>
      </div>`
      }

      return HTML;
   }

   generateFilter() {
      // Atsirenkami tik tagai (map()) ir apjungiami i viena masyva:
      const tags = this.dataForRendering
         .map(item => item.tags)
         .reduce((total, item) => [...total, ...item], []) // item cia yra tago masyvas

      // Atrenkami tik pirma karta pamineti tagai, kad nebutu pasikartojanciu: PIRMAS BUDAS
      const uniqueTags = [];
      for (const tag of tags) {
         if (!uniqueTags.includes(tag)) {
            uniqueTags.push(tag)
         }
      }

      // ANTRAS BUDAS:
      // const unique = new Set();
      // for (const tag of tags) {
      // unigue.add(tag);
      // }

      // TRECIAS BUDAS:
      // const uniqueTags = [...new Set(tags)];

      const HTML = uniqueTags.map(tag => `<button class="option">${tag}</button>`).join('');
      return HTML;
   }

   // Render paskirtis - i rasta vieta iterpti visa reikiama HTML'a:
   render() {
      let HTML = `<div class="filter">
               <button class="option active">All</button>
            ${this.generateFilter()}
            </div>
            <div class="portfolio-container">${this.generateContent()} </div>
            `;

      // Atvaizduosime ispiesta HTML
      this.DOM.innerHTML = HTML;
   }

   enableFilter() {
      const buttonsDOM = this.DOM.querySelectorAll('.filter > .option');
      const itemsDOM = this.DOM.querySelectorAll('.item');

      for (const button of buttonsDOM) {
         button.addEventListener('click', () => {
            const tag = button.textContent;
            if (tag === "All") {
               for (const item of itemsDOM) {
                  item.classList.remove('hidden');
               }
            } else {
               for (let i = 0; i < this.dataForRendering.length; i++) {
                  const itemDOM = itemsDOM[i];
                  const item = this.dataForRendering[i];

                  if (item.tags.includes(tag)) {
                     itemDOM.classList.remove('hidden')
                  } else {
                     itemDOM.classList.add('hidden')
                  }
               }
            }
         })
      }

   }
}

export { Gallery };
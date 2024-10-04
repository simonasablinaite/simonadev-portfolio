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
         order: 'za'
      }

      this.dataForRendering = [];

      this.init();
   }
   // init metodas
   init() {
      if (!this.isValidSelector() || !this.isValidData()) {
         return false;
      }

      this.filterDataForRendering();
      this.render();
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

   // Render paskirtis - i rasta vieta iterpti visa reikiama HTML'a:
   render() {
      let HTML = '';

      console.log(this.dataForRendering);
      // HTML += ...
      // HTML += ...
      // HTML += ...

      // Atvaizduosime ispiesta HTML
      this.DOM.innerHTML = HTML;
   }
}

export { Gallery };
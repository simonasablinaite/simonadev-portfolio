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
         strategy: 'loading-data',
         order: 'az'
      }

      this.init();
   }
   // init metodas
   init() {
      if (!this.isValidSelector() || !this.isValidData()) {
         return false;
      }
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
      if (typeof this.data !== 'object' ||
         this.data === null ||
         Array.isArray(this.data)) {
         return false;
      }

      // Validuojamas this.data.size...
      const size = this.data.size;
      if (typeof size !== 'object' ||
         size === null || Array.isArray(size)
      ) {
         if (typeof size.min === 'number' && isFinite(size.min) && size.min > 0 && size.min % 1 === 0) {
            this.size.min = size.min;
         }
      }
      // Validuojamas this.data.rendering...
      // Validuojamas this.data.content...
      if (!Array.isArray(this.data.content) || this.data.content.length === 0) {
         return false;
      }
      return true;
   }
   // Render paskirtis - i rasta vieta iterpti visa reikiama HTML'a:
   render() {
      let HTML = '';

      // HTML += ...
      // HTML += ...
      // HTML += ...

      // Atvaizduosime ispiesta HTML
      this.DOM.innerHTML = HTML;
   }
}

export { Gallery };
class IsValid {
   static object(obj) {
      // obj cia yra item is skills.js faile esacio skills funkcijos for... of ciklo
      if (typeof obj !== 'object' ||
         obj === null ||
         Array.isArray(obj)) {
         return false;
      }
      return true;
   }

   static nonEmptyArray(arr) {
      return Array.isArray(arr) && arr.length > 0;
   }

   // Statinis metodas apibreziantis ar duoti min,max skaiciai yra skaiciai ir ar jie teigiami:
   static positiveInteger(num) {

      if (Number.isInteger(num) || num < 0) {
         return false;
      }
      return true;
   }

   // Statinis metodas stringo ilgio apibrezciai nusakyti:
   static stringSizeInRange(str, max = 15, min = 1) {
      if (!IsValid.positiveInteger(max)) {
         max = 15;
      }
      if (!IsValid.positiveInteger(min)) {
         min = 1;
      }

      if (typeof str !== 'string' || str.length < min || str.length > max) {
         return false;
      }
      return true;
   }

   static icon(str) {
      const maxSize = 15
      if (!IsValid.stringSizeInRange(str, maxSize)) {
         return false;
      }
      return true;

   }

   static text(str) {
      const maxSize = 15

      if (!IsValid.stringSizeInRange(str, maxSize)) {
         return false;
      }
      return true;

   }
}

export { IsValid };
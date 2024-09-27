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

   static icon(str) {
      if (
         typeof str !== 'string' ||
         str.length > 15 ||
         str === ''
      ) {
         return false;
      }
      return true;
   }

   static text(str) {
      if (
         typeof str !== 'string' ||
         str.length > 15 ||
         str === '') {
         return false;
      }
      return true;
   }
}

export { IsValid };
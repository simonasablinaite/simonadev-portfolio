import { IsValid } from "../isValid/IsValid.js";

export const skills = (selector, data) => {

   if (typeof selector !== 'string' || selector === '') {
      throw new Error('Selector mus not be an empty typeof string'); //fatal error del tuscio stringo
   }

   if (!IsValid.nonEmptyArray(data)) {
      throw new Error('The data must not be an empty array'); //fatal error del tuscio stringo
   }

   const skillsContainerDOM = document.getElementById(selector);
   if (skillsContainerDOM === null) {
      throw new Error(`An element could not be found in the given selector ${selector}`); //fatal error del nepavykusio rasti elemento pagal pateikta selekroiu
   }

   let HTML = '';

   for (const item of data) {
      // Duomenu, esanciu skillsData masyve patikrinimas
      if (!IsValid.object(item) || !IsValid.icon(item.icon)
      )
      //    !IsValid.text(item.skillsTitle)) 
      {
         continue;
      }

      HTML += `
         <div class="col-12 col-sm-6 col-md-4 col-lg-3 skills-card">
            <div class="skills-icon">
               <i class="fa-brands ${item.icon} fa-6x"></i>
            </div>
         <p>${item.skillsTitle}</p>
         </div>`


   }

   skillsContainerDOM.innerHTML = HTML;

};
export const skills = (selector, skillsData) => {
   const skillsContainerDOM = document.getElementById(selector);

   let HTML = '';

   for (const item of skillsData) {
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
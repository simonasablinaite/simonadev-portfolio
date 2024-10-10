function renderNav(selector, data) {
   // Susirandama vieta, kurioje bus navigacija
   const DOM = document.querySelector(selector);

   // Generuojamas HTML'as:
   let HTML = '';

   for (let i = 0; i < data.length; i++) {
      const menuItem = data[i];
      HTML += `<a href='${menuItem.href}'>${menuItem.title}</a>`;
   }

   // Susikonstruojamas mygtukas, jam suteikiama klase ir tekstas:
   const contactBtn = document.createElement('a');
   contactBtn.classList.add('btn');
   contactBtn.innerHTML = 'Contact Me';

   // rezultato grazinimas:
   // Grazinamas/isvedamas HTML rezultatas i ekrana: += naudojama del to, kad jau prie esamo turinio butu pridetas papildomas turinys
   DOM.insertAdjacentHTML('beforeend', `<nav>${HTML}</nav>`);
   DOM.appendChild(contactBtn)
}

export { renderNav };

function toggleMenu() {
   const navDOM = document.querySelector('nav');
   const burgerMenuDOM = document.querySelector('.menu-icon i');
   ;

   burgerMenuDOM.addEventListener('click', () => {

      if (navDOM.style.display === 'flex') {
         navDOM.style.display = 'none'
      } else {
         navDOM.style.display = 'flex'
      }
   })


}
export { toggleMenu }
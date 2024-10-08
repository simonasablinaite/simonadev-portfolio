// IMPOTRS
import { Gallery } from '../components/gallery/Gallery.js';
import { renderNav, toggleMenu } from '../components/header/header.js';
import {skills} from '../components/skills/skills.js';
import { galleryData } from '../data/galleryData.js';
import { headerNavData } from '../data/headerNavData.js';
import { skillsData } from '../data/skillsData.js';

// EXECUTION

//  header start 
renderNav('header',headerNavData);
toggleMenu();
   //  header end 

   //  hero start 
   //  hero end 

   //  about start 
   //  about end 

   //  services start 
   //  services end 

   //  skills start 
   skills("skills-container" ,skillsData);
   //  skills end 

   //  gallery start 
 new Gallery('#gallery', galleryData);
   //  gallery end 

   //  contact start 
   //  contact end 


   //  footer start 
   //  footer end 

   // CUSTOM
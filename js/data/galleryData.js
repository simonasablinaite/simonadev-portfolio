const galleryData = {
   size: {
      min: 3,
      max: 6
   },
   rendering: {
      strategy: 'loading-data',
      order: 'az'
   },
   content: [
      {
         published: true,
         img: './img/portfolio/portfolio-item.jpg',
         alt: "Portfolio image",
         title: 'Calculator project',
         link: '#',
         tag: ["Others"]
      },
      {
         published: true,
         img: './img/portfolio/portfolio-item.jpg',
         alt: "Portfolio image",
         title: 'Matoma reklama',
         link: '#',
         tag: ["Web pages"]
      },
      {
         published: true,
         img: './img/portfolio/portfolio-item.jpg',
         alt: "Portfolio image",
         title: 'Šiaurės aruodai',
         link: '#',
         tag: ["Web pages"]
      },
      {
         published: false,
         img: './img/portfolio/portfolio-item.jpg',
         alt: "Portfolio image",
         title: 'Fidback project',
         link: '#',
         tag: ["Others"]
      },
      {
         published: false,
         img: './img/portfolio/Logo-14.jpg',
         alt: "Portfolio image",
         title: 'MinėMi fotografija',
         link: '#',
         tag: ["Logos"]
      },
   ]
};

export { galleryData }
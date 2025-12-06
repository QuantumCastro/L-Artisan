export type Language = "en" | "es";

export const LANG_OPTIONS: Array<{ code: Language; label: string }> = [
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export type Messages = {
  brand: string;
  nav: {
    language: string;
    searchAria: string;
    cartAria: string;
    categories: Record<string, string>;
  };
  hero: {
    tag: string;
    title: string;
    subtitle: string;
    scroll: string;
  };
  collection: {
    title: string;
    subtitle: string;
    count: (count: number) => string;
  };
  search: {
    placeholder: string;
    semantic: string;
    clear: string;
    results: (results: number, category: string) => string;
  };
  filter: {
    heading: string;
    searchTag: (query: string) => string;
    clear: string;
    showing: (visible: number, total: number) => string;
  };
  product: {
    priceNote: string;
    size: string;
    sizeGuide: string;
    selectSizePrompt: string;
    add: string;
    adding: string;
  };
  collectionEmpty: {
    title: string;
    body: string;
    cta: string;
  };
  footer: {
    brandCopy: string;
    customerTitle: string;
    legalTitle: string;
    newsletterTitle: string;
    newsletterCta: string;
    customerLinks: string[];
    legalLinks: string[];
    newsletterThanks: string;
  };
  cart: {
    title: string;
    empty: string;
    orderId: string;
    shipping: string;
    remove: string;
    total: string;
    checkout: string;
    secure: string;
  };
  checkout: {
    title: string;
    secure: string;
    back: string;
    name: string;
    email: string;
    card: string;
    expiry: string;
    cvv: string;
    address: string;
    summary: string;
    note: string;
    confirm: string;
    processing: string;
    successTitle: string;
    successCaption: string;
  };
  bespoke: {
    title: string;
    subtitle: string;
    cta: string;
  };
};

export const messages: Record<Language, Messages> = {
  en: {
    brand: "L'Artisan.",
    nav: {
      language: "Language",
      searchAria: "Open search",
      cartAria: "Open cart",
      categories: {
        all: "All",
        suits: "Suits",
        shirts: "Shirts",
        coats: "Coats",
        shoes: "Shoes",
        accessories: "Accessories",
      },
    },
    hero: {
      tag: "Est. 1985 — Milano",
      title: "The art of timeless elegance",
      subtitle:
        "Precise tailoring. Noble materials. A shopping experience crafted for the modern gentleman.",
      scroll: "Explore collection",
    },
    collection: {
      title: "FW 2025 Collection",
      subtitle: "Sartorial curation inspired by Milano.",
      count: (count) => `${count} curated pieces`,
    },
    search: {
      placeholder: "Search by garment, material or style (e.g. wool, oxford, formal)",
      semantic: "Local semantic search (no data sent)",
      clear: "Clear",
      results: (results, category) => `${results} results · Category: ${category}`,
    },
    filter: {
      heading: "Filtered view",
      searchTag: (query) => `Search: “${query}”`,
      clear: "Clear filters",
      showing: (visible, total) => `Showing ${visible} of ${total} curated pieces`,
    },
    product: {
      priceNote: "Tax included",
      size: "Select size",
      sizeGuide: "Tailoring guide",
      selectSizePrompt: "Please select a size",
      add: "Add to order",
      adding: "Crafting...",
    },
    collectionEmpty: {
      title: "No results",
      body: "Adjust your search or clear filters to view the full collection.",
      cta: "Back to all",
    },
    footer: {
      brandCopy: "Redefining modern luxury through traditional craftsmanship and digital innovation.",
      customerTitle: "Customer",
      legalTitle: "Legal",
      newsletterTitle: "Newsletter",
      newsletterCta: "Join",
      customerLinks: ["My orders", "Size guide", "Shipping & returns"],
      legalLinks: ["Terms", "Privacy", "Accessibility"],
      newsletterThanks: "Thanks for joining our newsletter.",
    },
    cart: {
      title: "Order sheet",
      empty: "Your order sheet is empty.",
      orderId: "Order #AF-9021",
      shipping: "Insured shipping",
      remove: "Remove",
      total: "Estimated total",
      checkout: "Proceed to payment",
      secure: "Insured shipping and premium packaging",
    },
    checkout: {
      title: "Payment details",
      secure: "Secure payment",
      back: "Cart",
      name: "Full name",
      email: "Email",
      card: "Card",
      expiry: "Expiry (MM/YY)",
      cvv: "CVV",
      address: "Address",
      summary: "Items",
      note: "We encrypt your data. Demo only, no real charge.",
      confirm: "Confirm payment",
      processing: "Processing...",
      successTitle: "Payment recorded",
      successCaption: "We sent a receipt to your email. (Demo)",
    },
    bespoke: {
      title: "Bespoke service",
      subtitle: "Book an appointment at our atelier for a fully tailored experience.",
      cta: "Schedule visit",
    },
  },
  es: {
    brand: "L'Artisan.",
    nav: {
      language: "Idioma",
      searchAria: "Abrir búsqueda",
      cartAria: "Abrir carrito",
      categories: {
        all: "Todos",
        suits: "Trajes",
        shirts: "Camisas",
        coats: "Abrigos",
        shoes: "Zapatos",
        accessories: "Accesorios",
      },
    },
    hero: {
      tag: "Est. 1985 — Milano",
      title: "El arte de la elegancia atemporal",
      subtitle:
        "Confección precisa. Materiales nobles. Una experiencia de compra diseñada para el caballero moderno.",
      scroll: "Explorar colección",
    },
    collection: {
      title: "Colección O/I 2025",
      subtitle: "Curaduría sartorial inspirada en Milano.",
      count: (count) => `${count} piezas seleccionadas`,
    },
    search: {
      placeholder: "Buscar por prenda, material o estilo (ej. lana, oxford, formal)",
      semantic: "Búsqueda semántica local (no se envían datos)",
      clear: "Limpiar",
      results: (results, category) => `${results} resultados · Categoría: ${category}`,
    },
    filter: {
      heading: "Vista filtrada",
      searchTag: (query) => `Búsqueda: “${query}”`,
      clear: "Limpiar filtros",
      showing: (visible, total) => `Mostrando ${visible} de ${total} piezas seleccionadas`,
    },
    product: {
      priceNote: "Impuestos incluidos",
      size: "Seleccionar talla",
      sizeGuide: "Guía de sastrería",
      selectSizePrompt: "Por favor selecciona una talla",
      add: "Añadir al pedido",
      adding: "Confeccionando...",
    },
    collectionEmpty: {
      title: "Sin resultados",
      body: "Ajusta la búsqueda o limpia filtros para ver la colección completa.",
      cta: "Volver a todos",
    },
    footer: {
      brandCopy: "Redefiniendo el lujo moderno a través de la artesanía tradicional y la innovación digital.",
      customerTitle: "Cliente",
      legalTitle: "Legal",
      newsletterTitle: "Newsletter",
      newsletterCta: "Unirse",
      customerLinks: ["Mis pedidos", "Guía de tallas", "Envíos y devoluciones"],
      legalLinks: ["Términos", "Privacidad", "Accesibilidad"],
      newsletterThanks: "Gracias por unirte a nuestro boletín.",
    },
    cart: {
      title: "Hoja de pedido",
      empty: "Tu hoja de pedido está vacía.",
      orderId: "Pedido #AF-9021",
      shipping: "Envío asegurado",
      remove: "Remover",
      total: "Total estimado",
      checkout: "Proceder al pago",
      secure: "Envío asegurado y empaquetado premium",
    },
    checkout: {
      title: "Datos de tarjeta",
      secure: "Pago seguro",
      back: "Carrito",
      name: "Nombre completo",
      email: "Email",
      card: "Tarjeta",
      expiry: "Vencimiento (MM/AA)",
      cvv: "CVV",
      address: "Dirección",
      summary: "Artículos",
      note: "Encriptamos tus datos. Demo, no se procesa pago real.",
      confirm: "Confirmar pago",
      processing: "Procesando...",
      successTitle: "Pago registrado",
      successCaption: "Enviamos un comprobante a tu correo. (Demo)",
    },
    bespoke: {
      title: "Servicio bespoke",
      subtitle: "Agenda una cita en nuestro atelier para una experiencia de sastrería completa y personalizada.",
      cta: "Agendar cita",
    },
  },
};

export const getMessages = (lang: Language): Messages => messages[lang] ?? messages.en;

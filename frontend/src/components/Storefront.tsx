import type { FormEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  CreditCard,
  Scissors,
  Search,
  ShieldCheck,
  ShoppingBag,
  X,
} from "lucide-react";
import { LANG_OPTIONS, getMessages, type Language } from "../lib/i18n";

type LocalizedCopy = {
  en: string;
  es: string;
};

type Category = "all" | "suits" | "shirts" | "coats" | "shoes" | "accessories";

type Product = {
  id: number;
  name: LocalizedCopy;
  price: number;
  category: Category;
  image: string;
  desc: LocalizedCopy;
  sizes: string[];
};

type CartItem = Product & { selectedSize: string };

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: { en: "Napoli Virgin Wool Suit", es: "Traje Napoli Lana Virgen" },
    price: 850,
    category: "suits",
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop",
    desc: {
      en: "Italian cut, notch lapel, ethical 120s wool. Ideal for business.",
      es: "Corte italiano, solapa de muesca, lana 120s de origen etico. Ideal para negocios.",
    },
    sizes: ["46", "48", "50", "52", "54"],
  },
  {
    id: 2,
    name: { en: "Egyptian Oxford Shirt", es: "Camisa Oxford Egipcio" },
    price: 180,
    category: "shirts",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1000&auto=format&fit=crop",
    desc: {
      en: "Giza 87 cotton, mother-of-pearl buttons, structured cutaway collar.",
      es: "Algodon Giza 87, botones de nacar, cuello cutaway estructurado.",
    },
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    name: { en: "Brown Coat", es: "Gabardina Media Marron" },
    price: 1200,
    category: "coats",
    image: "https://images.unsplash.com/photo-1764593008195-87ca871d72bd?q=80&w=464&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: {
      en: "Pure cashmere, silk lining, classic cut below the knee.",
      es: "Cachemir puro, forro de seda, corte clasico por debajo de la rodilla.",
    },
    sizes: ["48", "50", "52"],
  },
  {
    id: 4,
    name: { en: "Brown Loafers", es: "Loafers Marrón" },
    price: 420,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1615979474401-8a6a344de5bd?q=80&w=581&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: {
      en: "Handcrafted balmoral boots with full-grain leather and Goodyear welt.",
      es: "Botas Balmoral artesanales en piel plena flor con suela Goodyear.",
    },
    sizes: ["40", "41", "42", "43", "44"],
  },
  {
    id: 5,
    name: { en: "Silk Tie", es: "Corbata de Seda" },
    price: 120,
    category: "accessories",
    image: "https://plus.unsplash.com/premium_photo-1723924810262-c67a0950f311?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    desc: {
      en: "Seven-fold jacquard silk from Como, hand finished.",
      es: "Seda jacquard de Como con siete pliegues, terminada a mano.",
    },
    sizes: ["Unica"],
  },
];


const CATEGORIES: Category[] = ["all", "suits", "shirts", "coats", "shoes", "accessories"];

const normalize = (value: string) => value.toLowerCase().normalize("NFD").replace(/\p{Diacritic}/gu, "");

type NavigationProps = {
  cartCount: number;
  toggleCart: () => void;
  activeCategory: Category;
  onCategoryClick: (category: Category) => void;
  onSearchToggle: () => void;
  searchOpen: boolean;
  language: Language;
  onLanguageChange: (lang: Language) => void;
};

const Navigation = ({
  cartCount,
  toggleCart,
  activeCategory,
  onCategoryClick,
  onSearchToggle,
  searchOpen,
  language,
  onLanguageChange,
}: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const t = getMessages(language);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!langOpen) return;
    const handleClick = (event: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setLangOpen(false);
      }
    };
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, [langOpen]);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-in-out transform ${
        isScrolled
          ? "translate-y-0 bg-stone-50/70 backdrop-blur-md py-6 border-b border-stone-200 shadow-sm"
          : "-translate-y-full py-6 opacity-0"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button
          className="flex items-center gap-3 group cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Ir al inicio"
        >
          <span className="w-10 h-10 bg-stone-900 text-stone-50 flex items-center justify-center rounded-sm transition-transform duration-300 group-hover:rotate-45">
            <Scissors size={20} strokeWidth={1.5} />
          </span>
          <span className="text-2xl font-serif tracking-tight text-stone-900">{t.brand}</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryClick(cat)}
              className={`text-sm tracking-widest uppercase transition-all duration-300 relative ${
                activeCategory === cat ? "text-stone-900 font-bold" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {t.nav.categories[cat]}
              {activeCategory === cat && <span className="absolute -bottom-2 left-0 w-full h-px bg-stone-900" />}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative" ref={langRef}>
            <button
              className="flex items-center gap-1 rounded-full border border-stone-300 px-3 py-1 text-xs uppercase tracking-widest text-stone-700 hover:border-stone-900 transition"
              onClick={() => setLangOpen((prev) => !prev)}
              type="button"
              aria-label={t.nav.language}
            >
              {language.toUpperCase()}
              <ChevronDown size={14} />
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-md border border-stone-200 bg-white shadow-lg">
                {LANG_OPTIONS.map((option) => (
                  <button
                    key={option.code}
                    onClick={() => {
                      onLanguageChange(option.code);
                      setLangOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2 text-sm hover:bg-stone-100 ${
                      option.code === language ? "font-semibold text-stone-900" : "text-stone-700"
                    }`}
                    type="button"
                  >
                    <span>{option.label}</span>
                    {option.code === language && <BadgeCheck size={16} className="text-orange-700" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            className={`text-stone-800 transition-transform ${searchOpen ? "text-orange-700" : "hover:scale-110"}`}
            aria-label={t.nav.searchAria}
            onClick={onSearchToggle}
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          <button
            className="relative text-stone-800 hover:scale-110 transition-transform"
            onClick={toggleCart}
            aria-label={t.nav.cartAria}
          >
            <ShoppingBag size={22} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-orange-700 text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

type SearchPanelProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onClose: () => void;
  results: number;
  activeCategory: Category;
  language: Language;
};

const SearchPanel = ({ query, onQueryChange, onClose, results, activeCategory, language }: SearchPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const t = getMessages(language);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed top-24 left-0 w-full z-40 flex items-start justify-center px-4 md:px-0 pointer-events-none">
      <div className="pointer-events-auto w-full max-w-3xl bg-white/70 border border-stone-200 shadow-xl px-6 py-4 rounded-md backdrop-blur">
        <div className="flex items-center gap-3">
          <Search className="text-stone-500" size={18} />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder={t.search.placeholder}
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 outline-none text-sm md:text-base"
          />
          {query && (
            <button
              onClick={() => onQueryChange("")}
              className="text-xs uppercase tracking-widest text-stone-500 hover:text-stone-900"
              type="button"
            >
              {t.search.clear}
            </button>
          )}
          <button aria-label={t.search.clear} onClick={onClose} className="text-stone-400 hover:text-stone-900">
            <X size={18} />
          </button>
        </div>
        <div className="mt-3 flex flex-wrap items-center justify-between text-xs text-stone-500 uppercase tracking-widest">
          <span>{t.search.results(results, t.nav.categories[activeCategory])}</span>
          <span className="flex items-center gap-2 text-[11px]">
            <ShieldCheck size={14} /> {t.search.semantic}
          </span>
        </div>
      </div>
    </div>
  );
};

type ProductCardProps = {
  product: Product;
  onAddToCart: (item: CartItem) => void;
  language: Language;
};

const ProductCard = ({ product, onAddToCart, language }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [adding, setAdding] = useState(false);
  const t = getMessages(language);

  const needsSizeSelection = product.sizes.length > 1 && normalize(product.sizes[0]) !== "unica";

  const handleAdd = () => {
    if (needsSizeSelection && !selectedSize) return;

    setAdding(true);
    setTimeout(() => {
      onAddToCart({ ...product, selectedSize: selectedSize ?? product.sizes[0] });
      setAdding(false);
      setSelectedSize(null);
    }, 500);
  };

  return (
    <article
      className="group relative flex flex-col md:flex-row gap-0 md:gap-12 items-center min-h-[70vh] w-full py-12 border-b border-stone-200 last:border-0"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full md:w-1/2 h-[480px] md:h-[700px] relative overflow-hidden bg-stone-100 cursor-pointer">
        <img
          src={product.image}
          alt={product.name[language]}
          className={`w-full h-full object-cover transition-transform duration-[1.5s] ease-out ${
            isHovered ? "scale-105 grayscale-0" : "scale-100 grayscale-[20%]"
          }`}
          loading="lazy"
        />
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2">
          <span className="text-xs font-bold tracking-widest text-stone-900 uppercase">{t.nav.categories[product.category]}</span>
        </div>
      </div>

      <div className="w-full md:w-1/2 px-6 md:px-0 flex flex-col items-start justify-center h-full z-10 bg-stone-50 md:bg-transparent -mt-12 md:mt-0 pt-8 md:pt-0">
        <h2 className="text-4xl md:text-6xl font-serif text-stone-900 mb-4 leading-tight">{product.name[language]}</h2>
        <div className="w-12 h-1 bg-orange-700 mb-6" />

        <p className="text-stone-500 text-lg md:text-xl max-w-md mb-8 font-light leading-relaxed">{product.desc[language]}</p>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-3xl font-light text-stone-900">${product.price}</span>
          <span className="text-xs text-stone-400 uppercase tracking-wide">{t.product.priceNote}</span>
        </div>

        <div className="mb-10 w-full max-w-md">
          <div className="flex justify-between items-end mb-3">
            <span className="text-xs uppercase tracking-widest font-semibold text-stone-800">{t.product.size}</span>
            <button className="text-xs text-orange-700 underline underline-offset-4" type="button">
              {t.product.sizeGuide}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
                  selectedSize === size
                    ? "bg-stone-900 text-white border-stone-900"
                    : "bg-transparent text-stone-600 border-stone-300 hover:border-stone-800"
                }`}
                type="button"
              >
                {size}
              </button>
            ))}
          </div>
          {needsSizeSelection && !selectedSize && isHovered && (
            <p className="text-orange-700 text-xs mt-2 animate-pulse">{t.product.selectSizePrompt}</p>
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={adding}
          className="group/btn relative w-full max-w-xs overflow-hidden bg-stone-900 text-white px-8 py-5 flex items-center justify-between transition-all hover:bg-orange-800 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 text-sm font-bold tracking-[0.2em] uppercase">
            {adding ? t.product.adding : t.product.add}
          </span>
          <span className="relative z-10 transition-transform duration-300 group-hover/btn:translate-x-2">
            {adding ? <Scissors className="animate-spin" size={18} /> : <ArrowRight size={18} />}
          </span>
        </button>
      </div>
    </article>
  );
};

type CartDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeFromCart: (index: number) => void;
  total: number;
  onCheckout: () => void;
  language: Language;
};

const CartDrawer = ({ isOpen, onClose, cartItems, removeFromCart, total, onCheckout, language }: CartDrawerProps) => {
  const t = getMessages(language);
  if (!isOpen) return null;

  return (
    <>
      <button
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
        aria-label="Cerrar carrito"
      />
      <section className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#FDFBF7] z-[60] shadow-2xl flex flex-col transform transition-transform duration-500 ease-out border-l border-stone-200">
        <div className="p-8 border-b border-stone-200 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-serif text-stone-900">{t.cart.title}</h2>
            <button onClick={onClose} className="text-stone-400 hover:text-stone-900 transition-colors" aria-label="Cerrar">
              <X size={24} />
            </button>
          </div>
          <div className="flex justify-between text-xs text-stone-500 uppercase tracking-widest font-mono">
            <span>{t.cart.orderId}</span>
            <span>{t.cart.shipping}</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-stone-400">
              <Scissors size={48} strokeWidth={1} className="mb-4 opacity-50" />
              <p className="font-serif text-xl">{t.cart.empty}</p>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-6 animate-fadeIn">
                <div className="w-24 h-32 bg-stone-200 overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name[language]} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif text-lg text-stone-900 leading-none mb-2">{item.name[language]}</h3>
                    <p className="text-xs text-stone-500 uppercase tracking-wide">{item.selectedSize}</p>
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-light text-stone-800">${item.price}</span>
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="text-xs text-stone-400 hover:text-red-700 underline transition-colors"
                      type="button"
                    >
                      {t.cart.remove}
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-8 bg-stone-100 border-t border-stone-200">
            <div className="flex justify-between items-center mb-6">
              <span className="font-serif text-xl text-stone-900">{t.cart.total}</span>
              <span className="font-bold text-2xl text-stone-900">${total}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-stone-900 text-white py-4 px-6 flex justify-between items-center group hover:bg-orange-800 transition-colors"
            >
              <span className="uppercase text-sm font-bold tracking-widest">{t.cart.checkout}</span>
              <ChevronRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
            <p className="text-center text-[10px] text-stone-400 mt-4 uppercase tracking-widest">{t.cart.secure}</p>
          </div>
        )}
      </section>
    </>
  );
};

type CheckoutDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  onBack: () => void;
  total: number;
  items: CartItem[];
  onPaymentSuccess: () => void;
  language: Language;
};

const CheckoutDrawer = ({ isOpen, onClose, onBack, total, items, onPaymentSuccess, language }: CheckoutDrawerProps) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    card: "",
    expiry: "",
    cvv: "",
    address: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "done">("idle");
  const t = getMessages(language);

  if (!isOpen) return null;

  const cleanCard = form.card.replace(/\D/g, "").slice(0, 16);
  const cleanExpiry = form.expiry.replace(/[^0-9/]/g, "").slice(0, 5);
  const cleanCvv = form.cvv.replace(/\D/g, "").slice(0, 4);

  const canSubmit =
    form.name.trim() &&
    form.email.trim() &&
    cleanCard.length >= 12 &&
    cleanExpiry.length >= 4 &&
    cleanCvv.length >= 3 &&
    form.address.trim();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!canSubmit || status === "submitting") return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("done");
      onPaymentSuccess();
    }, 750);
  };

  const updateField = (field: keyof typeof form, value: string) => setForm((prev) => ({ ...prev, [field]: value }));
  const formattedCard = cleanCard.replace(/(\d{4})(?=\d)/g, "$1 ");

  return (
    <>
      <button
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm z-50"
        onClick={onClose}
        aria-label="Cerrar pago"
      />
      <section className="fixed top-0 right-0 h-full w-full md:w-[520px] bg-[#FDFBF7] z-[70] shadow-2xl flex flex-col border-l border-stone-200">
        <div className="p-8 border-b border-stone-200 bg-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CreditCard size={22} />
            <div>
              <p className="text-xs uppercase tracking-widest text-stone-500">{t.checkout.secure}</p>
              <h2 className="text-xl font-serif text-stone-900">{t.checkout.title}</h2>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onBack}
              className="text-stone-500 hover:text-stone-900 flex items-center gap-1 text-xs uppercase tracking-widest"
              type="button"
            >
              <ArrowLeft size={14} /> {t.checkout.back}
            </button>
            <button onClick={onClose} aria-label="Cerrar pago" className="text-stone-400 hover:text-stone-900">
              <X size={22} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-5">
          <div className="grid grid-cols-1 gap-4">
            <label className="text-xs font-semibold uppercase tracking-widest text-stone-600">
              {t.checkout.name}
              <input
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="mt-2 w-full border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-900"
              />
            </label>

            <label className="text-xs font-semibold uppercase tracking-widest text-stone-600">
              {t.checkout.email}
              <input
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="mt-2 w-full border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-900"
              />
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <label className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                {t.checkout.card}
                <input
                  type="text"
                  inputMode="numeric"
                  value={formattedCard}
                  onChange={(e) => updateField("card", e.target.value)}
                  className="mt-2 w-full border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-900"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                {t.checkout.expiry}
                <input
                  type="text"
                  inputMode="numeric"
                  value={cleanExpiry}
                  onChange={(e) => updateField("expiry", e.target.value)}
                  className="mt-2 w-full border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-900"
                />
              </label>
              <label className="text-xs font-semibold uppercase tracking-widest text-stone-600">
                {t.checkout.cvv}
                <input
                  type="password"
                  inputMode="numeric"
                  value={cleanCvv}
                  onChange={(e) => updateField("cvv", e.target.value)}
                  className="mt-2 w-full border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-900"
                />
              </label>
            </div>

            <label className="text-xs font-semibold uppercase tracking-widest text-stone-600">
              {t.checkout.address}
              <input
                type="text"
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                className="mt-2 w-full border border-stone-300 bg-white px-3 py-2 text-stone-900 outline-none focus:border-stone-900"
              />
            </label>
          </div>

          <div className="rounded-md border border-stone-200 bg-white p-4">
            <div className="flex items-center justify-between mb-2 text-sm text-stone-600">
              <span>
                {t.checkout.summary}: {items.length}
              </span>
              <span className="font-semibold text-stone-900">${total}</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-widest text-stone-500">
              <ShieldCheck size={14} /> {t.checkout.note}
            </div>
          </div>
        </form>

        <div className="p-8 border-t border-stone-200 bg-white space-y-3">
          {status === "done" ? (
            <div className="flex items-center gap-3 text-green-700">
              <BadgeCheck size={20} />
              <div>
                <p className="text-sm font-semibold">{t.checkout.successTitle}</p>
                <p className="text-xs text-stone-600">{t.checkout.successCaption}</p>
              </div>
            </div>
          ) : (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className="w-full bg-stone-900 text-white py-4 px-6 flex justify-between items-center group hover:bg-orange-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span className="uppercase text-sm font-bold tracking-widest">
                  {status === "submitting" ? t.checkout.processing : t.checkout.confirm}
                </span>
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </button>
              <p className="text-center text-[11px] text-stone-500 uppercase tracking-widest">{t.checkout.note}</p>
            </>
          )}
        </div>
      </section>
    </>
  );
};

const Hero = ({ language }: { language: Language }) => {
  const t = getMessages(language);
  return (
    <header className="relative w-full h-screen overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-stone-200">
        <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center grayscale opacity-90" />
        <div className="absolute inset-0 bg-stone-900/50" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-white/90 text-sm md:text-base uppercase tracking-[0.4em] mb-6 animate-slideDown drop-shadow-md">
          {t.hero.tag}
        </p>
        <h1 className="text-5xl md:text-8xl font-serif text-white mb-8 leading-tight animate-fadeIn drop-shadow-lg">
          {t.hero.title}
        </h1>

        <div className="w-px h-24 bg-white/70 mx-auto mb-4 shadow-sm" />

        <p className="text-white text-lg font-light max-w-xl mx-auto leading-relaxed drop-shadow-md pb-6">
          {t.hero.subtitle}
        </p>
      </div>

      <div className="absolute bottom-36 left-0 w-full flex flex-col items-center justify-center gap-4 animate-bounce">
        <span className="text-white/80 text-xs tracking-widest uppercase drop-shadow-md">{t.hero.scroll}</span>
        <div className="flex flex-col items-center">
          <div className="w-px h-12 bg-white/60" />
        </div>
      </div>
    </header>
  );
};

export function Storefront() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [newsletterInput, setNewsletterInput] = useState("");
  const productsRef = useRef<HTMLElement | null>(null);
  const t = getMessages(language);
  const filterPulseKey = useMemo(() => `${activeCategory}-${searchQuery}`, [activeCategory, searchQuery]);

  useEffect(() => {
    if (!searchOpen) return;
    const closeOnEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [searchOpen]);

  const baseProducts = useMemo(
    () => (activeCategory === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === activeCategory)),
    [activeCategory],
  );

  const filteredProducts = useMemo(() => {
    const q = normalize(searchQuery);
    if (!q.trim()) return baseProducts;
    return baseProducts.filter((product) => {
      const nameEn = normalize(product.name.en);
      const nameEs = normalize(product.name.es);
      return nameEn.includes(q) || nameEs.includes(q);
    });
  }, [baseProducts, searchQuery]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item]);
    setCartOpen(true);
  };

  const removeFromCart = (indexToRemove: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== indexToRemove));
  };

  const cartTotal = useMemo(() => cart.reduce((acc, item) => acc + item.price, 0), [cart]);

  const handleCategoryClick = (category: Category) => {
    setActiveCategory(category);
    productsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const resetFilters = () => {
    setActiveCategory("all");
    setSearchQuery("");
    setSearchOpen(false);
  };

  const openCheckout = () => {
    if (!cart.length) {
      setCartOpen(true);
      return;
    }
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handlePaymentSuccess = () => {
    setCheckoutOpen(false);
    setCart([]);
  };

  return (
    <div className="bg-[#FDFBF7] min-h-screen font-sans selection:bg-orange-200 selection:text-orange-900">
      <Navigation
        cartCount={cart.length}
        toggleCart={() => setCartOpen((prev) => !prev)}
        activeCategory={activeCategory}
        onCategoryClick={handleCategoryClick}
        onSearchToggle={() => setSearchOpen((prev) => !prev)}
        searchOpen={searchOpen}
        language={language}
        onLanguageChange={setLanguage}
      />

      {searchOpen && (
        <SearchPanel
          query={searchQuery}
          onQueryChange={setSearchQuery}
          onClose={() => setSearchOpen(false)}
          results={filteredProducts.length}
          activeCategory={activeCategory}
          language={language}
        />
      )}

      <Hero language={language} />

      <main ref={productsRef} className="container mx-auto px-6 py-10 scroll-mt-24">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 border-b border-stone-300 pb-3 mb-6">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="text-4xl font-serif text-stone-900">{t.collection.title}</h3>
              <p className="text-stone-500 text-sm">{t.collection.subtitle}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2">
              <div className="flex flex-wrap items-center gap-2 justify-center sm:justify-end">
                <span className="inline-flex items-center gap-2 rounded-full bg-stone-900 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                  {t.nav.categories[activeCategory]}
                </span>
                {searchQuery && (
                  <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-900">
                    {t.filter.searchTag(searchQuery)}
                  </span>
                )}
                <span key={filterPulseKey} className="h-1 w-16 rounded-full bg-gradient-to-r from-orange-700 to-stone-900 animate-pulse" />
              </div>
              <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 text-xs text-stone-600">
                <span>{t.filter.showing(filteredProducts.length, baseProducts.length)}</span>
                <span className="text-stone-500 font-mono">{t.collection.count(filteredProducts.length)}</span>
                <button
                  onClick={resetFilters}
                  className="uppercase tracking-widest text-[10px] font-semibold text-orange-800 hover:text-orange-900"
                  type="button"
                >
                  {t.filter.clear}
                </button>
              </div>
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="glass-panel p-10 text-center text-stone-700 bg-white/80 border border-stone-200 shadow-sm">
              <p className="text-xl font-serif text-stone-900 mb-2">{t.collectionEmpty.title}</p>
              <p className="text-sm text-stone-600 mb-4">{t.collectionEmpty.body}</p>
              <button
                onClick={resetFilters}
                className="px-4 py-2 border border-stone-300 text-sm uppercase tracking-widest hover:border-stone-900 transition"
                type="button"
              >
                {t.collectionEmpty.cta}
              </button>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={addToCart} language={language} />
            ))
          )}
        </div>

        <section className="my-12 relative h-[60vh] w-full overflow-hidden bg-stone-900 flex items-center justify-center">
          <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1559582798-678dfc71ccd8?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-fixed bg-center" />
          <div className="relative z-10 text-center p-12 border border-white/20 backdrop-blur-sm bg-white/5">
            <h4 className="text-4xl md:text-5xl font-serif text-white mb-4">{t.bespoke.title}</h4>
            <p className="text-stone-300 max-w-md mx-auto mb-8">{t.bespoke.subtitle}</p>
            <button className="text-white border-b border-white pb-1 hover:text-orange-200 hover:border-orange-200 transition-colors uppercase tracking-widest text-xs">
              {t.bespoke.cta}
            </button>
          </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-8">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div>
            <div className="flex items-center gap-3 text-stone-50 mb-3">
              <Scissors size={18} />
              <span className="text-lg font-serif">{t.brand}</span>
            </div>
            <p className="text-xs leading-relaxed max-w-xs">{t.footer.brandCopy}</p>
          </div>
          <div>
            <h5 className="text-white uppercase tracking-widest text-[10px] font-bold mb-3">{t.footer.customerTitle}</h5>
            <ul className="space-y-1 text-xs">
              {t.footer.customerLinks.map((link) => (
                <li key={link} className="hover:text-white cursor-pointer transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white uppercase tracking-widest text-[10px] font-bold mb-3">{t.footer.legalTitle}</h5>
            <ul className="space-y-1 text-xs">
              {t.footer.legalLinks.map((link) => (
                <li key={link} className="hover:text-white cursor-pointer transition-colors">
                  {link}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5 className="text-white uppercase tracking-widest text-[10px] font-bold mb-3">{t.footer.newsletterTitle}</h5>
            <div className="flex border-b border-stone-700 pb-1">
              <input
                type="email"
                placeholder="Email"
                className="bg-transparent w-full outline-none text-white placeholder-stone-600 text-xs py-1"
                value={newsletterInput}
                onChange={(e) => setNewsletterInput(e.target.value)}
              />
              <button
                className="text-white hover:text-orange-400 uppercase text-[10px] font-bold ml-2 transition-colors"
                type="button"
                onClick={() => {
                  setNewsletterMsg(t.footer.newsletterThanks);
                  setNewsletterInput("");
                }}
              >
                {t.footer.newsletterCta}
              </button>
            </div>
            {newsletterMsg && <p className="mt-2 text-[11px] text-orange-200">{newsletterMsg}</p>}
          </div>
        </div>
      </footer>

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cart}
        removeFromCart={removeFromCart}
        total={cartTotal}
        onCheckout={openCheckout}
        language={language}
      />
      {checkoutOpen && (
        <CheckoutDrawer
          isOpen={checkoutOpen}
          onClose={() => setCheckoutOpen(false)}
          onBack={() => {
            setCheckoutOpen(false);
            setCartOpen(true);
          }}
          total={cartTotal}
          items={cart}
          onPaymentSuccess={handlePaymentSuccess}
          language={language}
        />
      )}
    </div>
  );
}

export default Storefront;

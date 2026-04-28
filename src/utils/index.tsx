// src/utils/index.ts
import type { Post } from "../store/features/post/types";
import type { Product } from "../store/features/product/types";

// Formatar data: DD/MM/YY
export const formatDate = (dateString: string) => {
  if (!dateString) return "---";
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

export const formatPrice = (price: number) => {
  // Aqui está o segredo: dividimos por 100 na hora de EXIBIR
  return (price / 100).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

// Remove tudo que não é número
export const onlyDigits = (s: string) => s.replace(/\D/g, "");

// Formata string de dígitos para BRL enquanto o usuário digita (Input mask)
export const formatBRL = (digits: string) => {
  if (!digits) return "";
  const numberValue = parseInt(digits, 10);
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numberValue / 100);
};

// Converte a string formatada de volta para número (centavos)
export const parseToNumber = (value: string) => {
  const digits = onlyDigits(value);
  return digits ? parseInt(digits, 10) : 0;
};

export const handlePriceMask = (value: string) => {
  const digits = onlyDigits(value);

  // Limite opcional de caracteres (ex: 12 dígitos para evitar quebras de layout)
  if (digits.length > 12) return null;

  return digits === "" ? "" : formatBRL(digits);
};

// Função de compartilhamento
export const getShareLink = (platform: "wa" | "fb" | "ig", post: Post) => {
  const storeTag = "@lizzymodas";
  const urlBase = typeof window !== "undefined" ? window.location.href : "";

  // Usamos a formatPrice aqui dentro para manter o padrão
  const text = `🛍️ Olha esse look da ${storeTag}!\n\n✨ *${post.name}*\n💰 Preço: ${formatPrice(post.price || 0)}\n📂 Categoria: ${post.category || "Moda"}\n\nConfira no site:`;

  const encodedUrl = encodeURIComponent(urlBase);
  const encodedText = encodeURIComponent(text);

  const links = {
    wa: `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`,
    fb: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    ig: `https://www.instagram.com/`,
  };

  return links[platform];
};

export const preparePostForEdit = (post: Post) => {
  // Lógica para limpar o nome do arquivo da URL
  const nameFromUrl = post.image?.split("/").pop() || "";
  const cleanFileName = nameFromUrl.includes("-")
    ? nameFromUrl.split("-").slice(1).join("-")
    : nameFromUrl;

  return {
    name: post.name,
    description: post.description || "",
    category: post.category,
    size: post.size || "",
    formattedPrice: post.price.toString(),
    fileName: cleanFileName || "imagem_atual.jpeg",
    preview: post.image || null,
  };
};

export const prepareProductForEdit = (product: Product) => {
  return {
    name: product.name,
    description: product.description || "",
    formattedPrice: product.price.toString(),
  };
};

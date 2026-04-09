// src/utils/index.ts
import type { Post } from "../store/features/post/types";

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

// Formata um número (ex: 1500.5) para R$ 1.500,50
export const formatPrice = (price: number) => {
  return price.toLocaleString("pt-BR", {
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

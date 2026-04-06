import type { Post } from "../store/features/post/types";

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
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
};

export const getShareLink = (platform: "wa" | "fb" | "ig", post: Post) => {
  const storeTag = "@lizzymodas";
  const urlBase = window.location.href;

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

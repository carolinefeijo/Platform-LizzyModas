import { BsFacebook, BsInstagram, BsWhatsapp } from "react-icons/bs";
import type { Post } from "../../../../store/features/post/types";
import { getShareLink } from "../../../../utils";
import Modal from "../../../../components/Modal";
import "./styles.css";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  post: Post | null;
}

function ShareModal({ visible, onClose, post }: ShareModalProps) {
  if (!post) return null;

  const handleShare = (platform: "wa" | "fb" | "ig") => {
    const link = getShareLink(platform, post);
    window.open(link, "_blank");
  };

  return (
    <Modal title="Compartilhar Postagem" onClose={onClose} visible={visible}>
      <div className="modal-share-container">
        <nav className="share-actions-list">
          <button className="share-btn-wa" onClick={() => handleShare("wa")}>
            <BsWhatsapp /> WhatsApp
          </button>
          <button className="share-btn-fb" onClick={() => handleShare("fb")}>
            <BsFacebook /> Facebook
          </button>
          <button className="share-btn-ig" onClick={() => handleShare("ig")}>
            <BsInstagram /> Instagram
          </button>
        </nav>
      </div>
    </Modal>
  );
}

export default ShareModal;

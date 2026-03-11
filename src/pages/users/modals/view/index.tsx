import Modal from "../../../../components/Modal";
import type { User } from "../../../../store/features/user/types";

function View({
  visible,
  onClose,
  user,
}: {
  visible: boolean;
  onClose: () => void;
  user: User | null;
}) {
  const handleOnClose = () => {
    onClose();
  };

  if (!user) {
    return null;
  }

  return (
    <Modal title="Visualizar usuario" onClose={handleOnClose} visible={visible}>
      <p>Nome: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Telefone: {user.phone}</p>
    </Modal>
  );
}

export default View;

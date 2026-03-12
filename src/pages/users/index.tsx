import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersRequest,
  type UserState,
} from "../../store/features/user/userSlice";
import Header from "../../components/Header";
import Create from "./modals/create";
import Edit from "./modals/edit";
import Delete from "./modals/delete";
import type { User } from "../../store/features/user/types";
import View from "./modals/view";
import "./styles.css";

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state: { user: UserState }) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);
  const [userDeleted, setUserDeleted] = useState<User | null>(null);
  const [userSelectedView, setUserSelecetedView] = useState<User | null>(null);

  // abrir modal
  const openModal = () => {
    setIsOpenModal(true);
  };

  // fechar modal
  const closeModal = () => {
    setIsOpenModal(false);
  };

  // fechar modal de edição
  const closeEditModal = () => {
    setIsOpenEditModal(false);
  };

  // abrir modal de edicao
  const openEditModal = (user: User) => {
    setSelected(user);
    setIsOpenEditModal(true);
  };

  //abrir modal de deletar
  const openDeleteModal = (user: User) => {
    setUserDeleted(user);
    setIsOpenDeleteModal(true);
  };

  //fechar modal de deletar
  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  // abrir modal e ver usuario
  const openViewUserModal = (user: User) => {
    setUserSelecetedView(user);
    setIsOpenViewModal(true);
  };

  const closeViewUserModal = () => {
    setIsOpenViewModal(false);
  };

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  return (
    <>
      <Header />

      <div className="container">
        <div className="header">
          <h2>Total de colaboradores</h2>
          <button className="primaryButton" onClick={openModal}>
            CRIAR USUARIO
          </button>
        </div>

        <div className="userList">
          {users?.map((user) => (
            <div className="userRow " key={user.id}>
              <div className="userInfoField">
                <p>{user.name}</p>
              </div>

              <div className="userInfoField">
                <p>{user.email || "--"}</p>
              </div>

              <div className="userInfoField">
                <p>{user.phone || "--"}</p>
              </div>

              <div className="actionsContainer">
                <button
                  className="primaryButton"
                  onClick={() => openViewUserModal(user)}
                >
                  Ver
                </button>
                <button
                  className="primaryButton"
                  onClick={() => openEditModal(user)}
                >
                  Editar
                </button>
                <button
                  className="primaryButton"
                  onClick={() => openDeleteModal(user)}
                >
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <View
        visible={isOpenViewModal}
        onClose={closeViewUserModal}
        user={userSelectedView}
      />
      <Create visible={isOpenModal} onClose={closeModal} />
      <Edit
        visible={isOpenEditModal}
        onClose={closeEditModal}
        user={selected}
      />
      <Delete
        visible={isOpenDeleteModal}
        onClose={closeDeleteModal}
        user={userDeleted}
      />
    </>
  );
}

export default Users;

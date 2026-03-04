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

function Users() {
  const dispatch = useDispatch();
  const { users } = useSelector((state: { user: UserState }) => state.user);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selected, setSelected] = useState<User | null>(null);

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

  const openEditModal = (user: User) => {
    setSelected(user);
    setIsOpenEditModal(true);
  };

  const openDeleteModal = () => {
    setIsOpenDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsOpenDeleteModal(false);
  };

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  return (
    <>
      <Header />
      <div
        style={{
          margin: "20px",
          marginTop: "50px",
        }}
      >
        <div style={{ display: "flex", gap: "5rem", alignItems: "center" }}>
          <h2>Total de colaboradores</h2>
          <button
            style={{
              cursor: "pointer",
              borderRadius: "5px",
              border: "1px solid #c56cb8",
              backgroundColor: "#edaee4",
              color: "#080808",
              padding: "5px 10px",
            }}
            onClick={() => {
              openModal();
            }}
          >
            CRIAR USUARIO
          </button>
        </div>
        {users?.map((user) => {
          return (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
              key={user.id}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                  padding: "5px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "250px",
                    backgroundColor: "#eee",
                    borderRadius: "5px",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                  }}
                >
                  <p>{user.name}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "250px",
                    backgroundColor: "#eee",
                    borderRadius: "5px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <p>{user.email || "--"}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "250px",
                    backgroundColor: "#eee",
                    borderRadius: "5px",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <p>{user.phone || "--"}</p>
                </div>
                <div
                  style={{
                    display: "flex",
                    width: "250px",

                    flexDirection: "row",
                    gap: "10px",
                  }}
                >
                  <button
                    style={{
                      cursor: "pointer",
                      borderRadius: "5px",
                      border: "1px solid #c56cb8",
                      backgroundColor: "#edaee4",
                      color: "#080808",
                      padding: "5px 10px",
                    }}
                  >
                    Ver
                  </button>
                  <button
                    style={{
                      cursor: "pointer",
                      borderRadius: "5px",
                      border: "1px solid #c56cb8",
                      backgroundColor: "#edaee4",
                      color: "#080808",
                      padding: "5px 10px",
                    }}
                    onClick={() => {
                      openEditModal(user);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    style={{
                      cursor: "pointer",
                      borderRadius: "5px",
                      border: "1px solid #c56cb8",
                      backgroundColor: "#edaee4",
                      color: "#080808",
                      padding: "5px 10px",
                    }}
                    onClick={() => {
                      openDeleteModal();
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Create visible={isOpenModal} onClose={closeModal} />
      <Edit
        visible={isOpenEditModal}
        onClose={closeEditModal}
        user={selected}
      />

      <Delete visible={isOpenDeleteModal} onClose={closeDeleteModal} />
    </>
  );
}

export default Users;

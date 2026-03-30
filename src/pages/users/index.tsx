import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersRequest,
  fetchUserSearchRequest,
  type UserState,
} from "../../store/features/user/userSlice";
import Create from "./modals/create";
import Edit from "./modals/edit";
import Delete from "./modals/delete";
import View from "./modals/view";
import type { User } from "../../store/features/user/types";
import {
  FiMail,
  FiPhone,
  FiEdit,
  FiTrash2,
  FiEye,
  FiPlus,
} from "react-icons/fi";
import "./styles.css";
import SearchInput from "../../components/SearchInput";
import Loading from "../../components/Loading";

function Users() {
  const dispatch = useDispatch();
  const { users, loading } = useSelector(
    (state: { user: UserState }) => state.user,
  );

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenViewModal, setIsOpenViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [selected, setSelected] = useState<User | null>(null);
  const [userDeleted, setUserDeleted] = useState<User | null>(null);
  const [userSelectedView, setUserSelecetedView] = useState<User | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(fetchUserSearchRequest(searchTerm));
    } else {
      dispatch(fetchUsersRequest());
    }
  };

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  const handleAction = (e: React.MouseEvent, action: () => void) => {
    e.preventDefault();
    e.stopPropagation();
    action();
  };

  return (
    <div className="container-users">
      <div className="header">
        <div>
          <h2>Funcionários</h2>
          <p className="subtitle">Gerencie os acessos da sua equipe !</p>
        </div>
        <button className="btn-create" onClick={() => setIsOpenModal(true)}>
          <FiPlus /> Novo Funcionário
        </button>
      </div>

      <SearchInput
        placeholder="Digite o nome do funcionário"
        value={searchTerm}
        onChange={handleInputChange}
        onSearch={handleSearch}
      />

      {loading ? (
        <div style={{ marginTop: "12rem" }}>
          <Loading />
        </div>
      ) : (
        <>
          {users?.length === 0 ? (
            <p>Nada encontrado</p>
          ) : (
            <div className="accordion-list">
              {users?.map((user) => (
                <details className="accordion-item" key={user.id}>
                  <summary className="accordion-header">
                    <div className="info-main">
                      <div className="avatar-circle">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="user-basic-info">
                        <span className="user-name">{user.name}</span>
                        <span className="user-email-sm">{user.email}</span>
                      </div>
                    </div>

                    <div className="actions-group">
                      <button
                        className="icon-button view"
                        title="Visualizar"
                        onClick={(e) =>
                          handleAction(e, () => {
                            setUserSelecetedView(user);
                            setIsOpenViewModal(true);
                          })
                        }
                      >
                        <FiEye />
                      </button>
                      <button
                        className="icon-button edit"
                        title="Editar"
                        onClick={(e) =>
                          handleAction(e, () => {
                            setSelected(user);
                            setIsOpenEditModal(true);
                          })
                        }
                      >
                        <FiEdit />
                      </button>
                      <button
                        className="icon-button delete"
                        title="Deletar"
                        onClick={(e) =>
                          handleAction(e, () => {
                            setUserDeleted(user);
                            setIsOpenDeleteModal(true);
                          })
                        }
                      >
                        <FiTrash2 />
                      </button>
                      <span className="chevron">▾</span>
                    </div>
                  </summary>

                  <div className="accordion-content">
                    <div className="detail-grid">
                      <div className="detail-item">
                        <FiMail className="detail-icon" />
                        <div>
                          <label>E-mail</label>
                          <p>{user.email || "--"}</p>
                        </div>
                      </div>
                      <div className="detail-item">
                        <FiPhone className="detail-icon" />
                        <div>
                          <label>Telefone</label>
                          <p>{user.phone || "--"}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </>
      )}

      <View
        visible={isOpenViewModal}
        onClose={() => setIsOpenViewModal(false)}
        user={userSelectedView}
      />
      <Create visible={isOpenModal} onClose={() => setIsOpenModal(false)} />
      <Edit
        visible={isOpenEditModal}
        onClose={() => setIsOpenEditModal(false)}
        user={selected}
      />
      <Delete
        visible={isOpenDeleteModal}
        onClose={() => setIsOpenDeleteModal(false)}
        user={userDeleted}
      />
    </div>
  );
}

export default Users;

import { useEffect, useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { fetchPostsRequest } from "../../store/features/post/postSlice";
import { fetchProductsRequest } from "../../store/features/product/productSlice";
import { fetchUsersRequest } from "../../store/features/user/userSlice";
import type { Post } from "../../store/features/post/types";
import "./styles.css";

const Home = () => {
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { posts } = useSelector((state: any) => state.post);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { products } = useSelector((state: any) => state.product);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { users } = useSelector((state: any) => state.user);

  const handleFetchData = useCallback(() => {
    if (posts?.length === 0) dispatch(fetchPostsRequest({ page: 1 }));
    if (products?.length === 0) dispatch(fetchProductsRequest());
    if (users?.length === 0) dispatch(fetchUsersRequest());
  }, [dispatch, posts?.length, products?.length, users?.length]);

  useEffect(() => {
    handleFetchData();
  }, [handleFetchData]);

  const latestPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].slice(0, 5);
  }, [posts]);

  const distributionData = useMemo(
    () => [
      { name: "Produtos", value: products?.length || 0, color: "#edaee4" },
      { name: "Colaboradores", value: users?.length || 0, color: "#d1a3ff" },
    ],
    [products, users],
  );

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>
          Lizzy Modas <span style={{ fontWeight: 300 }}>| Gestão Geral</span>
        </h1>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <span className="stat-label">Total de Postagens</span>
          <h2 className="stat-value">{posts?.length || 0}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-label">Itens no Catálogo</span>
          <h2 className="stat-value">{products?.length || 0}</h2>
        </div>
        <div className="stat-card">
          <span className="stat-label">Equipe Ativa</span>
          <h2 className="stat-value">{users?.length || 0}</h2>
        </div>
      </div>

      <div className="charts-grid">
        {/* LISTAGEM DOS ÚLTIMOS POSTS */}
        <div className="chart-box">
          <h3>Últimas Postagens</h3>
          <div className="posts-list">
            {latestPosts.length > 0 ? (
              latestPosts.map((post: Post) => (
                <div key={post.id} className="post-item-mini">
                  <div className="post-info">
                    <span className="post-title">{post.name}</span>
                    <span className="post-date">
                      {post.count?.likes || 0} curtidas
                    </span>
                  </div>
                  <div className="post-status-badge">Ativo</div>
                </div>
              ))
            ) : (
              <p className="empty-message">Nenhum post encontrado.</p>
            )}
          </div>
        </div>

        {/* GRÁFICO DE DISTRIBUIÇÃO */}
        <div className="chart-box">
          <h3>Distribuição do Sistema</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={distributionData}
                innerRadius={70}
                outerRadius={90}
                paddingAngle={8}
                dataKey="value"
              >
                {distributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;

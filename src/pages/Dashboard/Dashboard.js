import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/UseFetchDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";
import {
  ChevronUpIcon,
  ChevronDownIcon,
  PencilSquareIcon,
  TrashIcon,
  EyeIcon
} from '@heroicons/react/24/solid';

const Dashboard = () => {
  const [sortConfig, setSortConfig] = useState(null);
  const [sortedPosts, setSortedPosts] = useState([]);
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const { deleteDocument } = useDeleteDocument("posts");

  const [showModal, setShowModal] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  

  useEffect(() => {
    if (posts) {
      let sorted = [...posts];

      if (sortConfig !== null) {
        sorted.sort((a, b) => {
          let aVal = a[sortConfig.key];
          let bVal = b[sortConfig.key];

          if (sortConfig.key === 'createdAt') {
            const aDate = aVal?.seconds || 0;
            const bDate = bVal?.seconds || 0;
            return sortConfig.direction === 'asc' ? aDate - bDate : bDate - aDate;
          }

          const aStr = String(aVal || '').toLowerCase();
          const bStr = String(bVal || '').toLowerCase();
          return sortConfig.direction === 'asc'
            ? aStr.localeCompare(bStr)
            : bStr.localeCompare(aStr);
        });
      }

      setSortedPosts(sorted);
    }
  }, [posts, sortConfig]);

  const handleSort = (key, direction) => {
    setSortConfig({ key, direction });
  };

  const handleDeleteClick = (postId) => {
    setSelectedPostId(postId);
    setShowModal(true);
    setIsChecked(false);
  };

  const handleConfirmDelete = () => {
    if (selectedPostId) {
      deleteDocument(selectedPostId);
      setShowModal(false);
      setSelectedPostId(null);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedPostId(null);
    setIsChecked(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-slate-50 rounded-lg shadow mt-4">
      <h2 className="text-2xl font-bold mb-2">Dashboard</h2>
      <p className="text-slate-500 mb-6">Gerencie os seus posts</p>

      {loading && <p>Carregando...</p>}

      {!loading && posts && posts.length === 0 ? (
        <div className="text-center p-8 bg-white border border-dashed border-slate-300 rounded-md">
          <p className="mb-4">Não foram encontrados posts</p>
          <Link
            to="/posts/create"
            className="inline-block px-4 py-2 rounded bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            Criar primeiro post
          </Link>
        </div>
      ) : (
        sortedPosts && sortedPosts.length > 0 && (
          <>
            <div className="flex justify-between font-semibold border-b-2 border-slate-200 pb-2 mb-4">

              <div className="flex-1">
                <div className="flex">
                  Titulo
                  <span className="flex flex-col ml-1">
                  
                    <ChevronUpIcon
                      onClick={() => handleSort('createdAt', 'desc')}
                      className={`w-3 h-3 cursor-pointer ${
                        sortConfig?.key === 'createdAt' && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'
                      }`}
                    />
                    <ChevronDownIcon
                      onClick={() => handleSort('createdAt', 'asc')}
                      className={`w-3 h-3 cursor-pointer ${
                        sortConfig?.key === 'createdAt' && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'
                      }`}
                    />
                  </span>
                </div>
              </div>

              <div className="w-32 text-center text-sm text-gray-600 flex items-center">
                Data
                 <span className="flex flex-col ml-1">
                
                  <ChevronUpIcon
                    onClick={() => handleSort('createdAt', 'desc')}
                    className={`w-3 h-3 cursor-pointer ${
                      sortConfig?.key === 'createdAt' && sortConfig.direction === 'desc' ? 'text-black' : 'text-gray-400'
                    }`}
                  />
                  <ChevronDownIcon
                    onClick={() => handleSort('createdAt', 'asc')}
                    className={`w-3 h-3 cursor-pointer ${
                      sortConfig?.key === 'createdAt' && sortConfig.direction === 'asc' ? 'text-black' : 'text-gray-400'
                    }`}
                  />
                </span>
              </div>
              <div className="min-w-[240px] text-center text-sm text-gray-600">
                Ações
              </div>
            </div>

            {sortedPosts.map((post) => (
              <div
                key={post.id}
                className="flex justify-between items-center bg-white p-4 border border-slate-200 rounded-md mb-3 hover:shadow transition"
              >
                <p className="flex-1 text-base font-medium text-gray-800">{post.title}</p>
                <div className="w-32 text-sm text-gray-500 text-center">
                  {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
                </div>
                <div className="flex gap-2 min-w-[240px] justify-end">
                  <Link
                    to={`/posts/${post.id}`}
                    state={{ from: "dashboard" }}
                    className="group inline-flex items-center px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                  >
                    <span className="flex items-center transition-all duration-300 group-hover:translate-x-1">
                      <EyeIcon className="w-5 h-5" />
                    </span>
                    <span className="overflow-hidden max-w-0 group-hover:max-w-[100px] group-hover:ml-2 transition-all duration-300">
                      <span className="inline-block">Visualizar</span>
                    </span>
                  </Link>

                  <Link
                    to={`/post/edit/${post.id}`}
                    className="group inline-flex items-center px-3 py-1 rounded border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
                  >
                    <span className="flex items-center transition-all duration-300 group-hover:translate-x-1">
                      <PencilSquareIcon className="w-5 h-5" />
                    </span>
                    <span className="overflow-hidden max-w-0 group-hover:max-w-[100px] group-hover:ml-2 transition-all duration-300">
                      <span className="inline-block">Editar</span>
                    </span>
                  </Link>

                  <button
                    className="group inline-flex items-center px-3 py-1 rounded border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
                    onClick={() => handleDeleteClick(post.id)}
                  >
                    <span className="flex items-center transition-all duration-300 group-hover:translate-x-1">
                      <TrashIcon className="w-5 h-5" />
                    </span>
                    <span className="overflow-hidden max-w-0 group-hover:max-w-[100px] group-hover:ml-2 transition-all duration-300">
                      <span className="inline-block">Excluir</span>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </>
        )
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Você tem certeza?</h3>
            <p className="mb-4 text-slate-600">
              Ao confirmar, o post não poderá ser recuperado. Você tem certeza que deseja deletar?
            </p>
            <label className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="mr-2"
              />
              <span>Tenho certeza</span>
            </label>
            <div className="flex justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded border border-slate-400 text-slate-600 hover:bg-slate-100 transition"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                disabled={!isChecked}
                className={`px-4 py-2 rounded ${
                  isChecked
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-red-300 text-white cursor-not-allowed"
                } transition`}
              >
                Deletar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
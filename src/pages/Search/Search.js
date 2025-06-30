import React from 'react'
import { Link } from 'react-router-dom'
import { useFetchDocuments } from '../../hooks/UseFetchDocuments'
import { useQuery } from '../../hooks/useQuery'
import PostDetail from '../../components/PostDetail'


const Search = () => {

  const query = useQuery()
  const search = query.get("q")

  const { documents: posts, loading } = useFetchDocuments("posts", search)



  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col items-center justify-start px-4 py-8">
      <h2 className="text-3xl font-bold text-indigo-700 text-center mb-6">
        Resultados da Busca
      </h2>

      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl text-center">
        {posts && posts.length === 0 && (
          <>
            <p className="text-gray-600 mb-4">
              Não foram encontrados posts para a sua busca.
            </p>
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Voltar
            </Link>
          </>
        )}

        {posts && posts.map((post) => (
          <>
            <PostDetail key={post.id} post={post} />
            <Link
              to="/"
              className="text-indigo-600 font-semibold hover:underline"
            >
              Voltar
            </Link>
          </>
        ))}
         
      </div>
    </div>
  );
};

export default Search
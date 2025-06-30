import { useNavigate,Link } from "react-router-dom"
import { use, useState } from "react"
import { useFetchDocuments } from "../../hooks/UseFetchDocuments";
import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuery] = useState("");
  const {documents:posts,loading} = useFetchDocuments("posts");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode implementar a lógica de busca com a query
    if (query){
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col items-center justify-start px-4 py-8">
        <h1 className="text-3xl font-bold text-indigo-700 text-center mb-6">Veja nossos posts mais recentes</h1>
        <form 
        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full max-w-md"
        onSubmit={handleSubmit} >
          <input 
          type="text" 
          placeholder="Busque por tags" 
          onChange={(e) => setQuery(e.target.value)}
          />
          <button 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300">Pesquisar</button>
        </form>
        <div className="bg-white shadow-2xl rounded-2xl p-4 w-full max-w-4xl text-center">
          {loading && <p>Carregando...</p> }
          {posts && posts.map((post) => <PostDetail key={post.id} post={post} />)}
          {posts && posts.length === 0 &&(
            <div className="text-gray-600">
              <p className="mb-4">Não foram encontrados posts</p>
              <Link
               to="/posts/create"
              className="text-indigo-600 font-semibold hover:underline"
              >Criar primeiro post</Link>
            </div>
          ) }
        </div>
    </div>
  )
}

export default Home
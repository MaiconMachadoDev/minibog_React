import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { Link, useNavigate, useLocation } from "react-router-dom";
const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFetchDocument("posts", id);
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col items-center justify-start mt-4">
      {loading && (
        <p className="text-indigo-700 font-medium">Carregando...</p>
      )}

      {post && (
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-4xl text-center">
          {/* Título */}
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            {post.title}
          </h1>

          {/* Imagem */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-72 object-cover rounded-md mb-6"
            />
          )}

          {/* Body */}
          <p className="text-gray-700 text-lg mb-6 leading-relaxed text-justify">
            {post.body}
          </p>

          {/* Infos de publicação */}
          <div className="text-sm text-gray-500">
            <p className="mb-1">
              <span className="font-semibold">Publicado por:</span>{" "}
              {post.createdBy || "Autor desconhecido"}
            </p>
            {post.createdAt && (
              <p>
                <span className="font-semibold">Publicado em:</span>{" "}
                {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
              </p>  
            )}
            {post.tagsArray?.length > 0 && (
  <div className="mt-4 flex flex-wrap justify-center">
            {post.tagsArray.map((tag) => (
            <span
                key={tag}
                className="inline-block bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full mr-2 mb-2"
            >
                #{tag}
            </span>
            ))}
        </div>
        )}
            
          </div>
          <button
             onClick={() => {
              if (location.state?.from === "dashboard") {
                navigate("/dashboard");
              } else {
                navigate("/");
              }
            }}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Voltar
            </button>
        </div>
      )}
      
    </div>
  );
};

export default Post;
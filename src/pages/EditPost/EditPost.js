import { useEffect, useState } from "react"
import { useNavigate,useParams,Link } from "react-router-dom"
import {useAuthValue} from  '../../context/AuthContext'
import { useFetchDocument } from "../../hooks/useFetchDocument";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";




const EditPost= () => {
    const { id } = useParams();
    const { document: post } = useFetchDocument("posts", id);

    const [title , setTitle] = useState("");
    const [ image,setImage] = useState("");
    const [ body,setBody] = useState("");
    const [tags, setTags] = useState("");
    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (post) {
        setTitle(post.title);
        setImage(post.image);
        setBody(post.body);
        const textTags = Array.isArray(post.tagsArray) ? post.tagsArray.join(", ") : ""
        setTags(textTags);
        console.log(post)
        }
    }, [post]);

    const { user } = useAuthValue();
    const { updateDocument, response } = useUpdateDocument("posts");

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormError("");
        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

        // Validar os campos
        try {
        new URL(image);
        } catch (error) {
        setFormError("A imagem precisa ser uma URL válida.");
        return;
        }

        //checar todos os valores
        if (!title || !image || !body || !tags) {
        setFormError("Por favor, preencha todos os campos.");
        return;
        }
        if (formError) return;

        const data = {
         title,
        image,
        body,
        tagsArray,
        uid: user.uid,
        createdBy: user.displayName,
        };
        updateDocument(id,data);
        navigate("/dashboard");
    }

        //redirecionar para a página home
    
  return (
      <div className="mt-4 min-h-[80vh] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex items-center justify-center px-4">
        {post && (
            <>
                <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">    
        {/* BOTÃO VOLTAR */}
        <div className="mb-4">
            <Link
            to="/dashboard"
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-semibold"
            >
            ← Voltar
            </Link>
        </div>
        <h2 className="flex flex-col items-center text-2xl text-indigo-700 mb-2">
            Editando Post: <span className="font-bold">{post.title}</span>
        </h2>
        <p className="text-gray-600 text-center mb-6">
            Altere os detalhes do seu post
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Título:</span>
            <input
                className="px-3 py-2 bg-slate-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                name="title"
                required
                placeholder="Pense em um bom título"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
            />
            </label>

            <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">URL da imagem:</span>
            <input
                className="px-3 py-2 bg-slate-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem que represente o post"
                onChange={(e) => setImage(e.target.value)}
                value={image}
            />
            </label>

            <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Conteúdo:</span>
            <textarea
                className="px-3 py-2 bg-slate-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
            />
            </label>

            <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Tags:</span>
            <input
                className="px-3 py-2 bg-slate-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                name="tags"
                required
                placeholder="Insira as tags separadas por vírgula"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
            />
            </label>

            {!response.loading &&  <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
                Editar
            </button>}
            {response.loading && <button
                type="submit"
                disabled
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
            >
                Aguarde...
            </button>}
            
            {response.error && 
            <p
            className="text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2 text-sm mt-2 w-full max-w-md text-center"
            >{response.error}</p>}
            
            {formError && 
            <p
            className="text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2 text-sm mt-2 w-full max-w-md text-center"
            >{formError}</p>}

        </form>
        </div>
            </>)}
    </div>
  )
}

export default EditPost
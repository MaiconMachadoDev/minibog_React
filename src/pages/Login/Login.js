import { useState, useEffect, use } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Login = () => {
    const [email,setEmail]= useState("")
    const [password,setPassword]= useState("")
    const [ error,setError] = useState("")
  
    const {login, error:authError, loading} = useAuthentication();
  
    const handleSubmit = async (e) =>{
      e.preventDefault ()
  
      setError("")
  
      const user={
        email,
        password
      }
  
      const res = await login (user);
  
      console.log(res)
  
    };
  
    useEffect(() => {
      if (authError) {
        setError(authError);
      }
    }, [authError]);
  return (
    <div 
    className="min-h-[80vh] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <div 
      className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 
        className="text-2xl font-bold text-indigo-700 text-center mb-2"
        >Entrar</h1>
        <p 
        className="text-gray-600 text-center mb-6"
        >Faça o login para criar seu post</p>

        <form
        onSubmit={handleSubmit}  
        className="flex flex-col gap-4">
          <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Email:</span>
            <input
              className="px-3 py-2 bg-slate-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="email"
              name="email"
              required
              placeholder="seuemail@email.com"
              value={email}
              onChange={(e) => setEmail (e.target.value)}
            />
          </label>
          <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Senha:</span>
            <input
              className="px-3 py-2 bg-slate-100 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              type="password"
              name="password"
              required
              placeholder="Insira sua senha"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}
            />
            </label>
          {!loading &&  <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Entrar
          </button>}
          {loading && <button
            type="submit"
            disabled
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition duration-300"
          >
            Aguarde...
          </button>}
         
          {error && 
          <p
          className="text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2 text-sm mt-2 w-full max-w-md text-center"
          >{error}</p>}
        </form>
      </div>
    </div>
  )
}

export default Login
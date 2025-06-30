import { useState, useEffect } from "react";
import { useAuthentication } from "../../hooks/useAuthentication";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const { createUser, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (!acceptedTerms) {
      setError("É preciso aceitar os termos de uso.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas precisam ser iguais");
      return;
    }

    const user = {
      displayName,
      email,
      password,
    };

    const res = await createUser(user);
    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-indigo-700 text-center mb-2">Cadastre-se para postar</h1>
        <p className="text-gray-600 text-center mb-6">Crie seu usuário e compartilhe suas ideias</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Nome:</span>
            <input
              className="px-3 py-2 bg-slate-100 rounded-md border"
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Email:</span>
            <input
              className="px-3 py-2 bg-slate-100 rounded-md border"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Senha:</span>
            <input
              className="px-3 py-2 bg-slate-100 rounded-md border"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <label className="flex flex-col text-left">
            <span className="text-sm text-gray-700 mb-1">Confirme a Senha:</span>
            <input
              className="px-3 py-2 bg-slate-100 rounded-md border"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </label>

          <label className="text-sm text-gray-700 flex items-center gap-2">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
            />
            <span>
              Eu li e concordo com os
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-indigo-600 underline ml-1"
              >
                Termos de Uso
              </button>
            </span>
          </label>

          {!loading && (
            <button
              type="submit"
              disabled={!acceptedTerms}
              className={`${
                acceptedTerms ? "bg-indigo-600 hover:bg-indigo-700" : "bg-gray-400 cursor-not-allowed"
              } text-white font-semibold py-2 rounded-md transition duration-300`}
            >
              Cadastrar
            </button>
          )}

          {loading && (
            <button
              type="submit"
              disabled
              className="bg-indigo-600 text-white font-semibold py-2 rounded-md"
            >
              Aguarde...
            </button>
          )}

          {error && (
            <p className="text-red-600 bg-red-100 border border-red-300 rounded-md px-4 py-2 text-sm mt-2 text-center">
              {error}
            </p>
          )}
        </form>
      </div>

      {/* Modal de Termos de Uso */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-lg relative">
            <h2 className="text-xl font-bold mb-2 text-indigo-700">Termos de Uso</h2>
            <p className="text-sm text-gray-700 mb-4 h-60 overflow-y-auto">
             📜 Termos de Uso e Política de Responsabilidade
Este blog é um projeto pessoal mantido e desenvolvido por um programador, com o objetivo de compartilhar conhecimento, experiências profissionais e permitir a interação entre visitantes através de comentários e postagens.
<br /><br />
Ao criar uma conta, o usuário declara estar ciente e de acordo com as condições abaixo:
<br /><br />
1️⃣ Finalidade e natureza do blog
Este site não é um serviço de mídia ou jornalístico profissional. É um espaço pessoal, voltado para fins acadêmicos, de portfólio e divulgação de projetos de desenvolvimento web.
<br /><br />
2️⃣ Conteúdo publicado
O usuário é o único responsável pelo conteúdo que publica. O mantenedor do blog não revisa nem edita previamente as postagens de terceiros, mas poderá, a seu critério, remover conteúdos que violem a lei, direitos de terceiros, ou as regras aqui descritas.
<br /><br />
3️⃣ Conduta proibida
É proibido publicar conteúdos que:
<br />
1-incitem ou promovam violência, ódio, discriminação de qualquer natureza;
<br />
2-sejam ilícitos, difamatórios, caluniosos ou atentem contra a honra de pessoas físicas ou jurídicas;
<br />
3-violem direitos autorais, marcas, patentes ou segredos comerciais;
<br />
4-contenham vírus, scripts maliciosos ou provoquem danos técnicos ao site ou a terceiros.
<br /><br />
4️⃣ Proteção de dados pessoais (LGPD)
Os dados pessoais fornecidos serão coletados e tratados conforme a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018), única e exclusivamente para cadastro e funcionalidades do site. O titular poderá solicitar a exclusão de seus dados a qualquer tempo.
<br /><br />
5️⃣ Isenção de responsabilidade
O autor do blog não se responsabiliza por conteúdos criminosos, ofensivos ou ilícitos criados por usuários. Cada autor responderá civil e criminalmente por seus atos.
<br /><br />
6️⃣ Direitos autorais e propriedade intelectual
Todo o código-fonte, design e textos de autoria do programador estão protegidos pela legislação de direitos autorais, sendo vedada a reprodução ou uso não autorizado para fins comerciais.
<br /><br />
7️⃣ Alterações destes termos
Estes termos poderão ser atualizados a qualquer momento, cabendo ao usuário verificar periodicamente as alterações.
<br /><br />
8️⃣ Foro
Fica eleito o foro da comarca de [Campina do Monte Alegre/SP], com exclusão de qualquer outro, por mais privilegiado que seja, para dirimir quaisquer controvérsias oriundas destes termos.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md"
            >
              Fechar e Concordar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
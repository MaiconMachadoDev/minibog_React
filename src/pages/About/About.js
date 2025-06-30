import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-[80vh] bg-gradient-to-r from-indigo-100 via-white to-indigo-100 flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-xl">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">
          Sobre o <span className="text-green-600">MiniBlog</span>
        </h2>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Este projeto é um blog minimalista desenvolvido com{" "}
          <span className="font-semibold text-indigo-700">React</span> no front-end,
          <span className="font-semibold text-indigo-700"> Firebase</span> no back-end,
          e estilizado com <span className="font-semibold text-indigo-700">Tailwind CSS</span>.
          Ideal para aprender, compartilhar ideias e explorar novos conteúdos.
        </p>

        <Link
          to="/post/create"
          className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-md transition duration-300"
        >
          Criar Post
        </Link>
      </div>
    </div>
  );
};

export default About;

import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-2xl font-bold text-red-600">Accès refusé</h1>
      <p className="text-gray-500">Vous n'avez pas les permissions nécessaires.</p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="rounded-md bg-brand-blue px-4 py-2 text-white hover:opacity-90"
      >
        Retour
      </button>
    </div>
  );
};

export default Unauthorized;

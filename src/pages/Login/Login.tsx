import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import { FaRegUser } from 'react-icons/fa';
import Input from '../../components/Input/Input';
import { FormEvent, useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import app from '../../services/FirebaseConnection';
import Swal from 'sweetalert2';
  import 'react-toastify/dist/ReactToastify.css';
  import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const auth = getAuth(app);

  function EntrarNaConta(e: FormEvent) {
    e.preventDefault();

    if (email.trim() === '' || senha.trim() === '') {
      toast.error('Por favor, preecha todos os campos!', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });

      return;
    }

    setEmail('');
    setSenha('');

    signInWithEmailAndPassword(auth, email, senha)
      .then(() => {
        toast.success('Usuario logado com sucesso!', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      })
      .catch(() => {
        erroMenssage();
      });
  }

  function erroMenssage() {
    Swal.fire({
      icon: 'error',
      title: 'Erro: Login',
      text: 'Usuário não existe, cadastra-se!',
    });
  }

  return (
    <div>
      <div className="flex items-center h-screen justify-center">
        <form
          onSubmit={EntrarNaConta}
          className="bg-white p-10 rounded flex flex-col items-center gap-3"
        >
          <FaRegUser className="mb-5" size={50} />

          <Input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            value={email}
            placeholder="Email"
          />
          <Input
            onChange={(e) => setSenha(e.target.value)}
            value={senha}
            type="password"
            placeholder="********"
          />

          <Button type="submit">Cadastrar</Button>

          <span className="text-center">
            Não possui uma conta?{' '}
            <Link className="underline" to={'/cadastro'}>
              Registra-se
            </Link>
          </span>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;

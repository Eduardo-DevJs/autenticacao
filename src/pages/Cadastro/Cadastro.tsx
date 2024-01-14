import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { FaRegUser } from 'react-icons/fa';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc, getFirestore } from 'firebase/firestore';
import { FormEvent, useState } from 'react';
import app from '../../services/FirebaseConnection';
import Swal from 'sweetalert2';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Cadastro = () => {
  const [usuario, setUsuario] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [senha, setSenha] = useState<string>('');

  const auth = getAuth(app);
  const db = getFirestore(app);

  function AutenticacaoDeUsuario(e: FormEvent) {
    e.preventDefault();

    if (usuario.trim() === '' || email.trim() === '' || senha.trim() === '') {
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

    createUserWithEmailAndPassword(auth, email, senha)
      .then((credential) => {
        CadastrarUsuario();
      })
      .catch((err) => {
        erroMenssage();
      });
  }

  function erroMenssage() {
    Swal.fire({
      icon: 'error',
      title: 'Erro: Cadastro',
      text: 'Usuário ja existe, va para Login!',
    });
  }

  async function CadastrarUsuario() {
    try {
      const docRef = await addDoc(collection(db, 'usuarios'), {
        usuario: usuario,
        email: email,
        senha: senha,
      });

      console.log('Document written with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  }

  return (
    <div className="flex items-center h-screen justify-center">
      <form
        onSubmit={AutenticacaoDeUsuario}
        className="bg-white p-10 rounded flex flex-col items-center gap-3"
      >
        <FaRegUser className="mb-5" size={50} />

        <Input
          onChange={(e) => setUsuario(e.target.value)}
          type="text"
          placeholder="Usuário"
        />
        <Input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="E-mail"
        />
        <Input
          onChange={(e) => setSenha(e.target.value)}
          type="password"
          placeholder="********"
        />

        <Button type="submit">Cadastrar</Button>

        <span className="text-center">
          Ja possui conta?{' '}
          <Link className="underline" to={'/'}>
            Entrar
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Cadastro;

import React from 'react';
import { Link } from 'react-router-dom';
import { Auth } from '../firebase-config';
import {useAuthState} from'react-firebase-hooks/auth';
import { signOut } from 'firebase/auth';
import { useNavigate } from'react-router-dom';

const Navbar = () => {
    const [user] = useAuthState(Auth);
    const navigator = useNavigate();

    const logOut = async() => {
        await signOut(Auth);
        navigator('/');
    };

  return (
    <header>
        <h3 className='font-extrabold text-[20px]'>Imagenizer</h3>
        <div className='menu'>
            <Link className='link' to={"/"}>Home</Link>
            {user && <Link className='link' to={"/generate"}>Generate</Link>}

            {user? 
            <div className='link'>
                <div className='d-flex'>
                    <img className='logo' src={user.photoURL} alt={user.displayName} />
                    <button className='button' onClick={logOut}>Sign Out</button>
                </div>
            </div>
            :<Link className='link' to={"/login"}>Login</Link>
            }
        </div>
    </header>
  );
}

export default Navbar;
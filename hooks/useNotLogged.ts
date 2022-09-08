import { useRouter } from 'next/router'
import { useAuth } from '../context/auth';

export function useNotLogged(){
    const {replace} = useRouter();
    const {isLogged} = useAuth();

    if(!isLogged) return replace('/');
}
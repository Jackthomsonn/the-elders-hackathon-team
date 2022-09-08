import type { NextPage } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import { useAuth } from '../context/auth';
import styles from '../styles/Home.module.css';
import { useRouter } from 'next/router'

const Login: NextPage<any> = () => {
  const [name, setName] = useState('');
  const {login} = useAuth();
  const {push} = useRouter();
  
  const setNameInContext = () => {
    // alert(name);
    login(name);
    push('/home');
    // Push to a new route
    // Set name in context
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login to your home</title>
        <meta name="description" content="Login to your home" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer" 
        />
      </Head>
      <main style={{width: '90vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
        <h1 className={styles.mainHeader}>Login to your home</h1>
        <input onChange={e => setName(e.target.value)} type="text" placeholder='Your name' style={{border: '1px solid #DDD', padding: 12, outline: 'none', width: '30%'}} />
        <button onClick={setNameInContext} style={{background: '#008e9b', border: 'none', padding: 12, borderRadius: 4, width: '30%', marginTop: 24, color: '#FFF'}}>Login</button>
      </main>
    </div>
  )
}

export default Login;

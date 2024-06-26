'use client';

import { EyeFilledIcon, EyeSlashFilledIcon, Logo } from '@/components/icons';
import { AuthContext } from '@/context/auth-provider';
import { Message } from '@/types';
import { UserCredentials } from '@/types/user';
import { Button, Card, Input, Link } from '@nextui-org/react';
import { useContext, useState } from 'react';

export default function LoginPage() {
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // password visibility
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const [userCridentials, setUserCredentials] = useState<UserCredentials>({
    username: '',
    password: '',
  });

  return (
    <section className='flex flex-col items-center justify-center w-full gap-4 py-8 md:py-1'>
      <Logo />
      <Card className='w-full md:w-96 p-4 gap-5 flex flex-col items-center justify-center '>
        <h1 className='text-lg mb-3'>Login</h1>
        <Input
          name='username'
          value={userCridentials.username}
          onChange={(e) =>
            setUserCredentials({ ...userCridentials, username: e.target.value })
          }
          label='Username'
          isRequired
        />
        <Input
          name='password'
          value={userCridentials.password}
          onChange={(e) =>
            setUserCredentials({ ...userCridentials, password: e.target.value })
          }
          label='Password'
          type={isVisible ? 'text' : 'password'}
          isRequired
          endContent={
            <button
              className='focus:outline-none'
              type='button'
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              ) : (
                <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
              )}
            </button>
          }
        />

        <div className='w-full flex flex-col mt-1 gap-3'>
          <div className='w-full flex gap-1 items-center'>
            <p className='text-sm text-default-500'>{`Don't have an account?`}</p>
            <Link href='/sign-up' className='text-sm text-primary-500'>
              Sign up
            </Link>
          </div>
          <Button
            isLoading={loading}
            onClick={() => {
              setLoading(true);
              login(userCridentials).then(() => {
                setLoading(false);
              });
            }}
            // primary
            type='submit'
            color='primary'
          >
            Login
          </Button>
        </div>
      </Card>
    </section>
  );
}

import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import LoginForm from '../../components/auth/login-form';
import { Container } from '../../components/styled/login.styles';

function AuthPage() {
  return (
    <>
      <LoginForm />
      <Container>
        <h1>Test Credentials</h1>
        <span>email: test@gmail.com</span>
        <span>password: test1234</span>
      </Container>
    </>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession({ req: context.req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default AuthPage;

import { getSession } from 'next-auth/react';
import { GetServerSidePropsContext } from 'next';
import SignupForm from '../components/auth/signup-form';

function AuthPage() {
  return <SignupForm />;
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

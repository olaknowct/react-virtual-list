import Image from 'next/image';
import NavBar from '@/components/navbar/navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="w-1/3 mx-auto mt-8">
      <h1 className="text-2xl mb-2 underline underline-offset-4">
        How it works?
      </h1>
      <ul className="pl-8 flex flex-col gap-2 list-disc">
        <li>
          Signup to create an account
          <Link
            href="/signup"
            className="ml-2 bg-green-300 px-2 py-1 rounded-md  underline underline-offset-2"
          >
            Click here to signup
          </Link>
        </li>
        <li>
          Make sure to enter a valid password and email when registering, after
          all it will show you an appropriate error when needed
        </li>
        <li>Test Credentials are provided from the login page anyways</li>

        <li> Once login you&apos;l redirected to List Page</li>
        <li>
          When you are logged in you&apos;l not be able to visit Login & Signup
          page
        </li>
        <li>Logout function when logged in</li>
        <li>
          List page shows the list of dummy data using
          <span className="bg-amber-300 p-1 rounded-md ml-2 ">
            react-window library
          </span>
        </li>
        <li>
          About page shows the
          <span className="bg-cyan-300 p-1 mx-1 rounded-md">
            Tools & Technologies
          </span>
          used on this project
        </li>
      </ul>
    </div>
  );
}

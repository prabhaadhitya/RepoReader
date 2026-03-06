import './globals.css'
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Navbar from '@/components/landing/Navbar';
import Provider from '@/components/providers/Provider';

export const metadata = {
  title: "RepoReader",
  description: "Understand any GitHub repo in seconds"
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body cz-shortcut-listen="true">   
        <Provider session={session}>     
          <main>  
            <Navbar />        
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
}
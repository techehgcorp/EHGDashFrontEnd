// dashboard/layout.js
import { auth } from '@/auth';
import Loader from '@/components/Loader/Loader';
import Providers from '@/components/Themes/Provider';
import Footer from '@/components/dashboard/Footer/Footer';
import Header from '@/components/dashboard/Header/Header';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import { Breadcrumb, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { SessionProvider } from 'next-auth/react';

export default async function DashboardLayout({ children, setSelectedMenu }) {
  const session = await auth(); // Isso funciona porque é um Server Component

  return (
    <SessionProvider>
    <Loader>
      <Providers>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider style={{ backgroundColor: '#fff' }}>
            <Sidebar setSelectedMenu={setSelectedMenu} />
          </Sider>
          <Layout>
            <Header session={session} />
            <div style={{ padding: '0 48px' }}>
              <Breadcrumb
                style={{ margin: '16px 0' }}
                items={[
                  { title: 'Home' },
                  // Como setSelectedMenu é uma função do cliente, não podemos usar selectedMenu diretamente aqui.
                  // Vamos passar isso como prop ou gerenciar no cliente, se necessário.
                ]}
              />
            </div>
            <Content>{children}</Content>
            <Footer />
          </Layout>
        </Layout>
      </Providers>
    </Loader>
    </SessionProvider>
  );
}
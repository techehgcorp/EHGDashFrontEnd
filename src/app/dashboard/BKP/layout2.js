import { auth } from '@/auth';
import Loader from '@/components/Loader/Loader';
import Providers from '@/components/Themes/Provider';
import ContentRenderer from '@/components/dashboard/ContentRenderer/ContentRenderer';
import Footer from '@/components/dashboard/Footer/Footer';
import Header from '@/components/dashboard/Header/Header';
import Sidebar from '@/components/dashboard/Sidebar/Sidebar';
import ReduxProviders from '@/redux/reduxProviders';
import { store } from '@/redux/store';
import { Breadcrumb, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content } from 'antd/es/layout/layout';
import { SessionProvider } from 'next-auth/react';

export default async function DashboardLayout({ children }) {
  const session = await auth();

  return (
    <SessionProvider>
      <Loader>
        <ReduxProviders store={store}>
            <Providers>
            <Layout style={{ minHeight: '100vh' }}>
                <Sider style={{ backgroundColor: '#fff' }}>
                  <Sidebar />
                </Sider>
                <Layout>
                <Header session={session} />
                <div style={{ padding: '0 48px' }}>
                    <Breadcrumb style={{ margin: '16px 0' }} items={[{ title: 'Home' }]} />
                </div>
                <Content>  
                  <ContentRenderer />
                </Content>
                <Footer />
                </Layout>
            </Layout>
            </Providers>
        </ReduxProviders>
        </Loader>
    </SessionProvider>
  );
}

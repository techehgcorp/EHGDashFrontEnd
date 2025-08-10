'use client'

import { Layout, Breadcrumb } from 'antd'
import { useState } from 'react'
import Header from '@/components/dashboard/Header/Header'
import Sidebar from '@/components/dashboard/Sidebar/Sidebar'
import Footer from '@/components/dashboard/Footer/Footer'
import Providers from '@/components/Themes/Provider'
import Loader from '@/components/Loader/Loader'
import ReduxProviders from '@/redux/reduxProviders'
import { store } from '@/redux/store'

const { Content, Sider } = Layout

export default function DashboardLayout({ children }) {
  const [selectedMenu, setSelectedMenu] = useState('h4h-dashboard')

  return (
    <Loader>
      <Providers>
        <ReduxProviders store={store}>
          <Layout style={{ minHeight: '100vh' }}>
            <Sider style={{ backgroundColor: '#fff' }}>
              <Sidebar setSelectedMenu={setSelectedMenu} />
            </Sider>
            <Layout>
              <Header />
              <div style={{ padding: '0 48px' }}>
                <Breadcrumb
                  style={{ margin: '16px 0' }}
                  items={[
                    { title: 'Home' },
                    {
                      title: selectedMenu.includes('dashboard') ? 'Dashboard' : 'Customer List',
                    },
                  ]}
                />
              </div>
              <Content>{children}</Content>
              <Footer />
            </Layout>
          </Layout>
        </ReduxProviders>
      </Providers>
    </Loader>
  )
}

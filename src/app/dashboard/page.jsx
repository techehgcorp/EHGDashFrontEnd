'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import DashboardGraphs from '@/components/dashboard/DashboardGraphs'
import LineChartComponent from '@/components/dashboard/cards/LineChart'
import CustomerTable from '@/components/dashboard/CustomerTable/CustomerTable'

const DashboardPage = () => {
  const { data: session } = useSession()
  const selectedMenu = useSelector((state) => state.menu.selectedMenu)

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  const company =
    selectedMenu.includes('h4h') ? 'h4hinsurance' :
    selectedMenu.includes('qol') ? 'qolinsurance' :
    null

  useEffect(() => {
    if (!company) return

    const fetchData = async () => {
      try {
        setLoading(true)
        const res = await fetch(`http://localhost:8000/sheets/sheet-data/?company=${company}`)
        const json = await res.json()
        setData(Array.isArray(json) ? json : [])
      } catch (error) {
        console.error('Erro ao buscar dados do backend:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [company])

  const mapSheetData = (sheetData, company) => {
    return sheetData.map((row) => {
      const zip = row['Zip']?.trim()
      const signupDate = company === 'h4hinsurance' ? row['Date Time'] : row['birth']
      const firstName = company === 'h4hinsurance' ? row['First Name'] : row['firstname']
      const lastName = company === 'h4hinsurance' ? row['Last Name'] : row['lastname']

      return {
        zip: zip || 'Unknown',
        signupDate,
        firstName,
        lastName,
      }
    })
  }

  const processSheetData = (mappedData) => {
    const customersAddedData = [
      ...mappedData.reduce((acc, curr) => {
        const date = new Date(curr.signupDate || '')
        if (isNaN(date.getTime())) return acc

        const year = date.getFullYear().toString()
        const month = date.toLocaleString('default', { month: 'short' })
        const day = date.getDate().toString().padStart(2, '0')

        acc.set(year, acc.get(year) || { period: year, count: 0 })
        acc.get(year).count += 1

        acc.set(month, acc.get(month) || { period: month, count: 0 })
        acc.get(month).count += 1

        acc.set(day, acc.get(day) || { period: day, count: 0 })
        acc.get(day).count += 1

        return acc
      }, new Map()).values(),
    ]

    const zipCodeDistributionData = mappedData.reduce((acc, curr) => {
      const zipcode = curr.zip ? String(curr.zip).trim() : 'Unknown'
      if (!zipcode) return acc

      const existing = acc.find((item) => item.zipcode === zipcode)
      if (existing) {
        existing.value += 1
      } else {
        acc.push({ zipcode, value: 1 })
      }

      return acc
    }, [])

    return { customersAddedData, zipCodeDistributionData }
  }

  const renderContent = () => {
    if (session === null) return <p>Carregando sessão...</p>
    if (!session) return <p>Por favor, faça login para ver o conteúdo.</p>
    if (loading) return <p>Carregando dados da empresa...</p>

    const mappedData = mapSheetData(data, company)
    const processedData = processSheetData(mappedData)
    const lineChartData = processedData.customersAddedData

    switch (selectedMenu) {
      case 'h4h-customers':
      case 'qol-customers':
        return <CustomerTable data={data} isAuthenticated={!!session} />

      case 'h4h-dashboard':
      case 'qol-dashboard':
        return (
          <>
            <DashboardGraphs
              totalCustomers={data.length}
              customersAddedData={processedData.customersAddedData}
              zipCodeDistributionData={processedData.zipCodeDistributionData}
            />
            <LineChartComponent data={lineChartData} />
          </>
        )

      default:
        return <h3>Bem-vindo à Dashboard!</h3>
    }
  }

  return renderContent()
}

export default DashboardPage

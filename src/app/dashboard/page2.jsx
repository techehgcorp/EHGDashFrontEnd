'use client'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import DashboardGraphs from '@/components/dashboard/DashboardGraphs'
import LineChartComponent from '@/components/dashboard/cards/LineChart'
import CustomerTable from '@/components/dashboard/CustomerTable/CustomerTable'
import { useSelector } from 'react-redux'

const DashboardPage = () => {
  const { data: session } = useSession()
  const selectedMenu = useSelector((state) => state.menu.selectedMenu)
  const [data, setData] = useState({ sheet1: [], sheet2: [] })

  const getRelevantData = () => {
    return selectedMenu.includes('h4h') ? data.sheet1 || [] : data.sheet2 || []
  }

  const mapSheetData = (sheetData, sheetName) => {
    return sheetData.map((row) => {
      const zip = row['Zip']?.trim()
      const signupDate = sheetName.includes('h4h') ? row['Date Time'] : row['birth']
      const firstName = sheetName.includes('h4h') ? row['First Name'] : row['firstname']
      const lastName = sheetName.includes('h4h') ? row['Last Name'] : row['lastname']

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

    const relevantData = getRelevantData()
    const mappedData = mapSheetData(relevantData, selectedMenu.includes('h4h') ? 'h4h' : 'qol')
    const processedData = processSheetData(mappedData)
    const lineChartData = processedData.customersAddedData

    switch (selectedMenu) {
      case 'h4h-customers':
        return <CustomerTable data={data.sheet1} isAuthenticated={!!session} />
      case 'h4h-dashboard':
        return (
          <>
            <DashboardGraphs
              totalCustomers={data.sheet1.length}
              customersAddedData={processedData.customersAddedData}
              zipCodeDistributionData={processedData.zipCodeDistributionData}
            />
            <LineChartComponent data={lineChartData} />
          </>
        )
      case 'qol-customers':
        return <CustomerTable data={data.sheet2} isAuthenticated={!!session} />
      case 'qol-dashboard':
        return (
          <>
            <DashboardGraphs
              totalCustomers={data.sheet2.length}
              customersAddedData={processedData.customersAddedData}
              zipCodeDistributionData={processedData.zipCodeDistributionData}
            />
            <LineChartComponent data={lineChartData} />
          </>
        )
      default:
        return <h3>Welcome to H4H Insurance Dashboard!</h3>
    }
  }

  return renderContent()
}

export default DashboardPage

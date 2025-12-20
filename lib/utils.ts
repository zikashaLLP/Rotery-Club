import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import ExcelJS from 'exceljs'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Download data as Excel file with enhanced styling
 */
export async function downloadExcel(data: any[], filename: string, sheetName: string = 'Sheet1') {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet(sheetName)

  if (data.length === 0) {
    return
  }

  // Get headers from first row
  const headers = Object.keys(data[0])
  
  // Add header row with styling
  const headerRow = worksheet.addRow(headers)
  headerRow.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF640D5F' } // Purple color matching theme
  }
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
  headerRow.height = 25

  // Add data rows
  data.forEach((row) => {
    const excelRow = worksheet.addRow(headers.map((header) => row[header] || ''))
    excelRow.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
    excelRow.height = 20
  })

  // Style all cells with borders
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
      }
      
      // Alternate row colors for better readability
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F8F8' }
        }
      }
    })
  })

  // Set column widths (auto-size with minimum and maximum)
  const columns = worksheet.columns || []
  for (let i = 0; i < columns.length; i++) {
    const column = columns[i]
    if (!column || !column.eachCell) continue
    let maxLength = 10
    column.eachCell({ includeEmpty: false }, (cell) => {
      const cellValue = cell.value?.toString() || ''
      maxLength = Math.max(maxLength, cellValue.length)
    })
    column.width = Math.min(Math.max(maxLength + 2, 12), 50)
  }

  // Freeze header row
  worksheet.views = [
    {
      state: 'frozen',
      ySplit: 1
    }
  ]

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}

/**
 * Download participant statistics data as Excel file with enhanced styling
 */
export async function downloadStatisticsExcel(statisticsData: any, filename: string) {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Statistics')

  // Define headers
  const headers = [
    'Group Name',
    'Participant Count',
    'XS 34',
    'S 36',
    'M 38',
    'L 40',
    'XL 42',
    'XXL 44',
    '3XL 46'
  ]

  // Add header row with styling
  const headerRow = worksheet.addRow(headers)
  headerRow.font = { bold: true, size: 12, color: { argb: 'FFFFFFFF' } }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FF640D5F' } // Purple color matching theme
  }
  headerRow.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
  headerRow.height = 25

  // Add data rows
  Object.values(statisticsData).forEach((group: any) => {
    const row = worksheet.addRow([
      group.groupName,
      group.participantCount,
      group.tshirtSizes['XS 34'] || 0,
      group.tshirtSizes['S 36'] || 0,
      group.tshirtSizes['M 38'] || 0,
      group.tshirtSizes['L 40'] || 0,
      group.tshirtSizes['XL 42'] || 0,
      group.tshirtSizes['XXL 44'] || 0,
      group.tshirtSizes['3XL 46'] || 0
    ])
    row.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true }
    row.height = 20

    // Center align numbers
    row.getCell(2).alignment = { vertical: 'middle', horizontal: 'center' } // Participant Count
    for (let i = 3; i <= 9; i++) {
      row.getCell(i).alignment = { vertical: 'middle', horizontal: 'center' } // T-shirt sizes
    }
  })

  // Style all cells with borders
  worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
    row.eachCell({ includeEmpty: false }, (cell) => {
      cell.border = {
        top: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        left: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        bottom: { style: 'thin', color: { argb: 'FFD0D0D0' } },
        right: { style: 'thin', color: { argb: 'FFD0D0D0' } }
      }
      
      // Alternate row colors for better readability
      if (rowNumber > 1 && rowNumber % 2 === 0) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFF8F8F8' }
        }
      }
    })
  })

  // Set column widths
  worksheet.columns = [
    { width: 30 }, // Group Name
    { width: 20 }, // Participant Count
    { width: 12 }, // XS 34
    { width: 12 }, // S 36
    { width: 12 }, // M 38
    { width: 12 }, // L 40
    { width: 12 }, // XL 42
    { width: 12 }, // XXL 44
    { width: 12 }  // 3XL 46
  ]

  // Freeze header row
  worksheet.views = [
    {
      state: 'frozen',
      ySplit: 1
    }
  ]

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer()
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  window.URL.revokeObjectURL(url)
}



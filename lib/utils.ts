import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as XLSX from 'xlsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Download data as Excel file
 */
export function downloadExcel(data: any[], filename: string, sheetName: string = 'Sheet1') {
  // Create a new workbook
  const wb = XLSX.utils.book_new()
  
  // Convert data to worksheet
  const ws = XLSX.utils.json_to_sheet(data)
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName)
  
  // Generate Excel file and download
  XLSX.writeFile(wb, filename)
}

/**
 * Download statistics data as Excel file with custom structure
 */
export function downloadStatisticsExcel(statisticsData: any, filename: string) {
  const wb = XLSX.utils.book_new()
  
  // Transform statistics data into rows
  const rows: any[] = []
  
  // Add data rows for each group
  Object.values(statisticsData).forEach((group: any) => {
    rows.push({
      'Group Name': group.groupName,
      'Participant Count': group.participantCount,
      'XS 34': group.tshirtSizes['XS 34'] || 0,
      'S 36': group.tshirtSizes['S 36'] || 0,
      'M 38': group.tshirtSizes['M 38'] || 0,
      'L 40': group.tshirtSizes['L 40'] || 0,
      'XL 42': group.tshirtSizes['XL 42'] || 0,
      'XXL 44': group.tshirtSizes['XXL 44'] || 0,
      '3XL 46': group.tshirtSizes['3XL 46'] || 0
    })
  })
  
  // Convert to worksheet (json_to_sheet automatically uses object keys as headers)
  const ws = XLSX.utils.json_to_sheet(rows)
  
  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(wb, ws, 'Statistics')
  
  // Generate Excel file and download
  XLSX.writeFile(wb, filename)
}


import { API_BASE_URL } from './config'

interface ApiOptions extends RequestInit {
  requireAuth?: boolean
}

/**
 * Make an authenticated API call with automatic 401 handling
 */
export async function apiCall(
  endpoint: string,
  options: ApiOptions = {},
  onUnauthorized?: () => void
): Promise<Response> {
  const { requireAuth = false, headers = {}, ...fetchOptions } = options

  // Get token from localStorage if auth is required
  let authHeaders: HeadersInit = {}
  if (requireAuth && typeof window !== 'undefined') {
    const token = localStorage.getItem('admin_token')
    if (token) {
      authHeaders = {
        Authorization: `Bearer ${token}`,
      }
    }
  }

  // Merge headers
  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...authHeaders,
    ...headers,
  }

  // Remove Content-Type for FormData
  if (options.body instanceof FormData) {
    delete (mergedHeaders as any)['Content-Type']
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...fetchOptions,
    headers: mergedHeaders,
  })

  // Handle 401 Unauthorized
  if (response.status === 401) {
    if (typeof window !== 'undefined') {
      // Clear token from localStorage
      localStorage.removeItem('admin_token')
      localStorage.removeItem('admin_data')
      
      // Redirect to login if callback provided
      if (onUnauthorized) {
        onUnauthorized()
      } else {
        // Default redirect
        window.location.href = '/admin/login'
      }
    }
    throw new Error('Unauthorized - Please login again')
  }

  return response
}


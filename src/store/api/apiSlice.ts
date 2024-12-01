// src/store/api/apiSlice.ts
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

interface ApiConfig {
  baseUrl: string
}

const config: ApiConfig = {
  baseUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000/api'
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
})

const baseQueryWithErrorHandling = async (args: any, api: any, extraOptions: any) => {
  try {
    const result = await baseQuery(args, api, extraOptions)
    
    if (result.error) {
      const error = result.error as FetchBaseQueryError
      let message = 'An error occurred'
      
      if ('status' in error) {
        if (error.status === 404) {
          message = 'Resource not found'
        } else if (error.status === 500) {
          message = 'Server error'
        }
      }
      
      toast.error(message)
    }
    
    return result
  } catch (error) {
    toast.error('Network error')
    return { error: { status: 'FETCH_ERROR', error: 'Network error' } }
  }
}

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithErrorHandling,
  endpoints: () => ({})
})
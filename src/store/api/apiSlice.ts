// src/store/api/apiSlice.ts
import { 
  createApi, 
  fetchBaseQuery, 
  FetchBaseQueryError,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError as RTKError
} from '@reduxjs/toolkit/query/react'
import { toast } from 'sonner'

interface ApiConfig {
  baseUrl: string
}

const config: ApiConfig = {
  baseUrl: process.env.VITE_API_URL || 'http://localhost:3000/api'
}

const baseQuery = fetchBaseQuery({
  baseUrl: config.baseUrl,
})

const baseQueryWithErrorHandling: BaseQueryFn<
  FetchArgs,
  unknown,
  RTKError
> = async (args, api, extraOptions) => {
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
  endpoints: () => ({
    // Add your endpoints here
  }),
})
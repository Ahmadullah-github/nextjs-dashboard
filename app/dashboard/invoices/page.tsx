import { CreateInvoice } from '@/app/ui/invoices/buttons'
import Pagination from '@/app/ui/invoices/pagination'
import Table from '@/app/ui/invoices/table'
import Search from '@/app/ui/search'
import { InvoicesTableSkeleton } from '@/app/ui/skeletons'
import React, { Suspense } from 'react'
import { fetchInvoicesPages } from '@/app/lib/data'

const page = async ({
  searchParams,
}: {
  searchParams?: {
    query?: string,
    page?: string
  }
}) => {

  const query = searchParams?.query || ""; 
  const currentPage = Number(searchParams?.page) || 1; 
  
  const totalPages = await fetchInvoicesPages(query); 

  return (
    <div className='w-full'>
        <div>
          <h1>Invoices</h1>
        </div>
        <div>
          <Search placeholder='search invoices...'/> 
          <CreateInvoice /> 
        </div>
        <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton /> }>
            <Table query={query} currentPage={currentPage} /> 
        </Suspense>
        <div>
          <Pagination totalPages={totalPages}/>
        </div>
    </div>
  )
}

export default page

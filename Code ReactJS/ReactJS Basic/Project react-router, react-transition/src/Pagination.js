import React from 'react'
import { Pagination } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

//phân trang có sẵn trong sematic-ui => nhớ phải cài cả sematic-ui-css và sematic-ui-react và 
//dùng đúng import 'semantic-ui-css/semantic.min.css' để chơi css
const PaginationExamplePagination = () => (
    <Pagination defaultActivePage={5} totalPages={10} />
)

export default PaginationExamplePagination
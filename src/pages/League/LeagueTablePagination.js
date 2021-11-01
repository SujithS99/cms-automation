import React from 'react'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap'
import '../../App.css';
import $ from 'jquery';

function LeagueTablePagination(props) {
  let [currentPage, setCurrentPage] = React.useState();
  let [pagesCount, setPagesCount] = React.useState()
  let [j, setJ] = React.useState(0);
  
    React.useEffect(() => {
      setPagesCount(props.pagesCount);
      setCurrentPage(props.currentPage)
      setJ(props.currentPage)
    }, [props])
  
    return (
        <Pagination size="lg" aria-label="Page navigation example"  >

          <li className={currentPage <= 0 ? 'page-item disabled':'page-item'}>
            <a href="#" className="page-link" aria-label="Previous" onClick={() => props.handleClick(currentPage-1)}>
              <span className="sr-only">‹</span>
              <span aria-hidden="true" >Previous</span>
            </a>
          </li>
  
          <PaginationItem>
            <PaginationLink  className="active-link"  key={1} href="#" 
              onClick={() => {
                props.handleClick(currentPage+0); 
                
                setJ(currentPage+1)}}>
                {j+1}
            </PaginationLink>
          </PaginationItem>
  
          <PaginationItem>
            <PaginationLink  key={2} href="#" 
              onClick={() => {
                props.handleClick(currentPage+1);
                $("li>a").trigger("blur");
                setJ(currentPage+2)}}>
              {j+2}
            </PaginationLink>
          </PaginationItem>
  
          <PaginationItem>
            <PaginationLink  key={3} href="#" 
              onClick={() => {
                props.handleClick(currentPage+2); 
                $("li>a").trigger("blur"); 
                setJ(currentPage+3)}}>
              {j+3}
            </PaginationLink>
          </PaginationItem>
        
  
          <li className={currentPage >= pagesCount-1 ? 'page-item disabled':'page-item'} >
            <a href="#" className="page-link" aria-label="Next" onClick={() => props.handleClick(currentPage + 1)}>
              <span className="sr-only">›</span>
              <span  aria-hidden="true" >Next</span>
            </a>
          </li>
  
        
              
        </Pagination>
        
    )
  }

export default LeagueTablePagination

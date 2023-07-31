import HeaderNav from './Toolbar/Header'
const  Layout = ({children}) => {
    return(
     <>
    <div style={{width:"100%"}}>
     <HeaderNav/>
     </div>
     
        {/* without sidebar */}
        <div>
          {children }
        </div>

        </>

   
    
    );
}
export default Layout;
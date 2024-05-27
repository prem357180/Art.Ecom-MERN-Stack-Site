import {Link} from 'react-router-dom'
import './css/index.css'
function Nav(){
    return(
        <>
            <nav className="navbar" style={{backgroundColor:'rgb(0, 20, 40)'}}>
            <h1 className='ml-5 px-5 Ecom'>Art.Ecom</h1>
            <ul className="nav px-5">
            <li className="nav-item" id='tbtns'>
                <Link to="/home" >Home</Link>
            </li>
            <li className="nav-item" id='tbtns'>
                <Link to="/cart">Cart</Link>
            </li>
            <li className="nav-item" id='tbtns'>
                <Link to="/sell">Sell</Link>
            </li>
            <li className="nav-item" id='tbtns'>
                <Link to="/ordered">Ordered</Link>
            </li>
            <li className="nav-item" id='tbtns'>
                <Link to="/about">About</Link>
            </li>
            </ul>
            </nav>
        </>
    )
}

export default Nav
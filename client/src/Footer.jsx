import './css/index.css'

function Footer(){
    return(
        <div className='mt-3 foot'>
        <footer>
            <p>Ecommerce Web Application &copy; Developed by Prem Kumar. 
            SoureCode at <i className="bi bi-github" onClick={()=>{window.open('https://github.com/prem357180/Art.Ecom-MERN-Stack-Site')}}></i>.</p>
        </footer>
        </div>
    )
}

export default Footer
import './css/bootstrap.css'
import './css/index.css'
import './css/bootstrap-icons.css'
function Card({img,price,rating,itemId,addtoCart}){
    return (
        <>

            <div className='container  border text-center mt-4 card mycard' style={{width:300}}>
            <img src={img} className='rounded card-body p-0 m-3'/>
            <h5 className='card-body'>Price: &#8377; {price}</h5>
            <button className='btn btn-outline-primary card-body m-3 p-2' onClick={()=>{addtoCart(itemId)}}>Add to Cart <i className="bi bi-cart"></i></button>
            </div>
        </>
    )
}

export default Card
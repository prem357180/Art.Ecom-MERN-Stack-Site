import './css/bootstrap.css'
import './css/index.css'
import './css/bootstrap-icons.css'
function OrderedCard({img,price,rating,itemId,cancleorder}){
    return (
        <>

            <div className='container  border text-center mt-4 card mycard' style={{width:300}}>
            <img src={img} className='rounded card-body p-0 m-3'/>
            <h5 className='card-body'>Price: &#8377; {price}</h5>
            <h1>Out for Delivery</h1>
            <button className='btn btn-danger card-body m-3 p-2' onClick={()=>{cancleorder(itemId)}}>Cancel Order</button>
            </div>
        </>
    )
}

export default OrderedCard
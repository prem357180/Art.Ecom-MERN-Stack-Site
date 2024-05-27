import {useNavigate} from 'react-router-dom'

function RemoveCard({img,price,rating,itemId,removefromCart,buyItem}){
    const navigate = useNavigate()
    return (
            <div className='container p-3 border text-center mt-1 card' style={{width:400,boxShadow: '0px 2px 5px'}}>
            <img className='rounded card-body' src={img} style={{boxShadow: '0px 0px 2.5px inset',borderRadius: '8px',padding: '16px'}}/>
            <h5 className='card-body'>Price: {price}</h5>
            <button className='btn btn-danger rounded card-body p-2 m-2 ' style={{color:'white'}} onClick={()=>{removefromCart(itemId)}}>Remove From cart</button>
            <button className='rounded card-body p-2 m-2' onClick={()=>buyItem(itemId,price)}>Buy Now</button>
            </div>
    )
}

export default RemoveCard
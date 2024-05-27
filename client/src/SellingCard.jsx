function SellingCard(props){
    return (
            <div className='container  text-center card p-4 m-2 border-0' style={{width:400}}>
            <img className='rounded card-body border' src={props.img} style={{}}/>
            <h5 className='rounded card-body border mt-1'>Price: &#8377; {props.price}</h5>
            </div>
    )
}

export default SellingCard
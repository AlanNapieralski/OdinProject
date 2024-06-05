export default function Mellstroy(props) {


    return (
        <button type='button' className="relative">
            <img src={props.gif.url} className="absolute"></img> 
        </button> 
    )
}
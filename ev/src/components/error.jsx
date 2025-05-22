import './../styles/error.css'
import './../utility/util.css'
import close from './../icon/close.png'
import infoStore from '../store/info.store'
import './../styles/media.css'

function Error(){

    const {errorMsg, closeError} = infoStore();

    function closepanel(){
        closeError()
    }

    return(
        <div className="error pad16 flex flex-1 gap16">
            <p className='err'>{errorMsg}</p>
            <button onClick={closepanel} className='closebtn'>
                <img src={close} className='close' alt='close'/>
            </button>
        </div>
    )
}
  

export default Error;
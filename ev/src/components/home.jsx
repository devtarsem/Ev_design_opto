import './../styles/home.css'
import './../utility/util.css'
import { Link } from 'react-router';

function Home(){
    return(
        <div className="home">
            <main className='main'>
                <header className='header flex flex-2 flex-dir gap16'>
                    <h1 className='heaidng'>Analyze you electric vehicle in just one click</h1>
                    <p className='des'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea minima amet corrupti nam et excepturi ipsum eaque, magnam qui<br/> labore id ratione, quisquam iusto commodi praesentium magni illo optio aliquam?</p>
                    <Link to='Ev-design' className='link'>Analyze your design</Link>
                </header>
            </main>
        </div>
    )
}

export default Home;
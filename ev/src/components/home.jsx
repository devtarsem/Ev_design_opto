import './../styles/home.css'
import './../styles/media.css'

import './../utility/util.css'
import { Link } from 'react-router';
import prob from './../icon/evprob.jpg'
import sol from './../icon/s1.png'
import logo from './../icon/logo.jpg'


function Home(){
    return(
        <div className="home">
            <main className='main'>
                <header className='header flex flex-2 flex-dir gap16'>
                    <img src={logo} className='logo' alt='logo'/>
                    <h1 className='heaidng'>Analyze your electric vehicle in just one click</h1>
                    {/* <p className='des'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ea minima amet corrupti nam et excepturi ipsum eaque, magnam qui<br/> labore id ratione, quisquam iusto commodi praesentium magni illo optio aliquam?</p> */}
                    <Link to='Ev-design' className='link'>Analyze your design</Link>
                </header>
                <div className='problem_statement pad96'>
                    <h2 className='head2 colorhead'>Problem statement</h2>
                    <div className='probgrid grid grid-2-col pad96 gap48'>
                        <div className='imgcover'>
                            <img src={prob} className='img' alt='img'/>
                        </div>
                        <div className='cont flex flex-2 pad16'>
                            <p className='dess'>In EV design the most important part is to analyze what is the top speed of the EV and how drag is effecting of design , the second most imnportant thing is to figure out acceleration in relative of speed, and calculating this thing is very tedious it involves 11 steps to compute for a single velocity value and to make a real time EV design user needs to make results on atleast 150 times by taking speed from 1km/hr to 150km/hr and calculating manually is almost impossible, so this si very painfull problem for aerodynamics users.</p>
                        </div>
                    </div>
                </div>
                <div className='ourSolution_statement pad96'>
                    <h2 className='head2 colorhead'>Our solution</h2>
                    <div className='solgrid grid grid-1-col pad96 gap48'>
                        <div className='imgcover'>
                            <img src={sol} className='img img__border lowscale' alt='img'/>
                        </div>
                        <div className='cont flex flex-2 pad16'>
                            <p className='dess'> by using our system user will able to analyze his/her deisign on 3 core parameters of motive force, drag force and net force with real world practicle calculation that goes beyond ideal cases, user can able to visulize its design parameteres and also download the data computed in excel format.</p>
                        </div>
                    </div>
                </div>
            </main>
            <footer className='footer pad96'>
                <h2 className='foothead'>Evolip.</h2>
            </footer>
        </div>
    )
}

export default Home;
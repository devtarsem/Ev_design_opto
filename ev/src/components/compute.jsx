import './../styles/compute.css'
import './../utility/util.css'
import infoStore from '../store/info.store';
import { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
  Colors,
} from 'chart.js';
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Legend, Tooltip);


function Compute(){

    const [showChart1, setChart1] = useState(true);

    const {cacheData, yaw, essentialData,max_speed,acceleration_data,exportAsExcel, computationUnit, prepared_data} = infoStore();

    useEffect(el=>{
        cacheData();
      }, [])

    function compute(){
        computationUnit(yaw, essentialData)
    }


    const labels = prepared_data?.slice(1).map(row => row[0]); // speeds
    const motiveData = prepared_data?.slice(1).map(row => row[1]);
    const resistanceData = prepared_data?.slice(1).map(row => row[2]);
    const netForceData = prepared_data?.slice(1).map(row => row[3]);
    const acceleration = acceleration_data?.map(row => row[1]);
    
    const data = {
        labels,
        datasets: [
        { label: 'Motive Force', data: motiveData, borderColor: '#fff', borderWidth: 3,
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 1,
            borderDash: [0,0], fill: true 
        },
        { label: 'Resistance Force', data: resistanceData, tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 1,
            borderDash: [0,0],borderColor: '#B771E5', fill: false },
        { label: 'Net Force', data: netForceData,
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 1,
            borderDash: [0,0] ,
        borderColor: '#1DCD9F', fill: false },
        ]
    };

    const dataAcc = {
        labels,
        datasets: [
        { label: 'Acceleration', data: acceleration, borderColor: '#fff', borderWidth: 3,
            tension: 0.4,
            pointStyle: 'circle',
            pointRadius: 1,
            borderDash: [0,0], fill: true 
        },
    ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
            labels: {
                color: 'white'  // ✅ Legend labels white
            }
            },
            title: {
            display: true,
            text: 'Force vs Speed',
            color: 'white'  // ✅ Chart title white
            }
        },
        scales: {
            x: {  ticks: {
                color: 'white' // 👈 sets x-axis tick label color
            },
                title: { display: true, text: 'Speed (m/s)', color: 'white' }
            },
            y: { 
                ticks: {
                    color: 'white' // 👈 sets x-axis tick label color
                },
                title: { display: true, text: 'Force (N)', color: 'white' } 
            }
        }
    };

    const optionsAcc = {
        responsive: true,
        plugins: {
            legend: {
            labels: {
                color: 'white'  // ✅ Legend labels white
            }
            },
            title: {
            display: true,
            text: 'Speed vs acceleration',
            color: 'white'  // ✅ Chart title white
            }
        },
        scales: {
            x: {  ticks: {
                color: 'white' // 👈 sets x-axis tick label color
            },
                title: { display: true, text: 'Speed (m/s)', color: 'white' }
            },
            y: { 
                ticks: {
                    color: 'white' // 👈 sets x-axis tick label color
                },
                title: { display: true, text: 'Acceleration (N)', color: 'white' } 
            }
        }
    };

    function exportData(){
        exportAsExcel(prepared_data);
    }

    function forceOpen(){
        setChart1(showChart1=> true)
    }
    function AccOpen(){
        setChart1(showChart1=> false)
    }

    return(
        <div className="compute grid grid-12-col">
            <button onClick={exportData} className='flotbtnExcel'>Download data in excel format</button>
            <div className='first '>
                <div className='tophead  flex flex-2'>
                    <h2 className='head2 head_color'>Computation data</h2>
                </div>
                <div className='essentials borderbot flex flex-dir gap16 pad16'>
                    <p className='da da__'>Mass : -{essentialData[0]?.mass}</p>
                    <p className='da da__'>Frontal area : -{essentialData[0]?.area}</p>
                    <p className='da da__'>Tyre radius : -{essentialData[0]?.tyreRadius}</p>
                    <p className='da da__'>Gear ratio : -{essentialData[0]?.gear}</p>
                    <p className='da da__'>Torque (peak) : -{essentialData[0]?.tor}</p>
                    <p className='da da__'>Motor power : -{essentialData[0]?.motorPower}</p>
                    <p className='da da__'>Efficiency : -{essentialData[0]?.effi}</p>
                    <p className='da da__'>Rolling resistance coefficient : -{essentialData[0]?.rollResis}</p>
                    <p className='da da__'>Air density : -{essentialData[0]?.air_density}</p>
                    <p className='da da__'>Gravity : - 9.81</p>
                </div>
                <div className='yaws'>
                    <table className='yawtable'>
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Yaw angle</th>
                                <th>Tangential force</th>
                            </tr>
                        </thead>
                        <tbody>
                            {yaw[0]?.slice(1,6).map((el,index)=>
                                <tr>
                                    <td>{index}</td>
                                    <td>{el[0]}</td>
                                    <td>{el[1]}</td>
                                </tr>

                            )}
                            ...so on
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='second'>
                <div className='tophead pad16 flex flex-2'>
                    <h2 className='head2 head_color'>Computed chart</h2>
                </div>
                <div className='chart '>
                    {showChart1 &&
                        <div className='plot pad16'>
                            <Line data={data} options={options} />;
                        </div>
                    }
                    {!showChart1 &&
                        <div className='plot pad16'>
                            <Line data={dataAcc} options={optionsAcc} />;
                        </div>
                    }
                    <div className='toggles flex gap16 pad16'>
                        <button onClick={forceOpen} className='openForcebtn btn'>Force vs speed</button>
                        <button onClick={AccOpen} className='openForcebtn btn'>Speed vs acceleration</button>

                    </div>
                    <div className='analysis pad16'>
                        <h2 className='head2 head_color'>Analysis</h2>
                        {max_speed!=0 &&
                            <p className='ana'>Top Speed : {max_speed}km/hr</p>
                        }
                        {max_speed==0 &&
                            <p className='anap'>Not a practile EV, irrelevent figures.</p>
                        }
                    </div>
                </div>
                <div className='secbot flex flex-2 pad16'>
                    <button onClick={compute} className='computebtn btn'>Compute</button>
                </div>
            </div>
            <div className='third'>
                <div className='tophead pad16 flex flex-2'>
                    <h2 className='head2 head_color'>Computed data</h2>
                </div>
                <div className='outputtable'>
                    <table className='yawtable '>
                        <thead>
                            <tr>
                                <th>Sno</th>
                                <th>Speed<br/>(km/hr)</th>
                                <th>Motive force(N)</th>
                                <th>Resistance force(N)</th>
                                <th>Net force(N)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prepared_data?.slice(1, prepared_data.length-1).map((el,index)=>
                                <tr>
                                    <td className='padmin' >{index+1}</td>
                                    <td className='padmin' >{el[0]}</td>
                                    <td className='padmin' >{el[1]}</td>
                                    <td className='padmin' >{el[2]}</td>
                                    <td className={el[3] > 0 ? "green padmin" : "red padmin"} >{el[3]}</td>
                                </tr>

                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Compute;
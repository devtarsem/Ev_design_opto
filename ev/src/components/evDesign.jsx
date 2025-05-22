import './../styles/design.css'
import './../utility/util.css'
import { Link } from 'react-router';
import './../styles/media.css'

import { createRef } from 'react';
import infoStore from '../store/info.store';
import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Error from './error';
function Design(){

    const mass = createRef();
    const area = createRef();
    const tyreRadius = createRef();
    const gear = createRef();
    const tor = createRef();
    const motorPower = createRef();
    const effi = createRef();
    const rollResis = createRef();
    const air_density = createRef();
    const windSpeed = createRef();
    const navigate = useNavigate();
    const {essentialData, errorDisplay, errorMsg, clearningCurrentData, setErrorMsg, closeError,settingAllDataTLocal, yaw, cacheData, showFileUploadPanel, settingtheExcelToLocal,setShowPanel, setClosePanel} = infoStore();

    useEffect(el=>{
        cacheData();
    }, [])

    function DataSetup(){
        if(mass.current.value.trim() == '' ){
            setErrorMsg("Mass must be correctly defined")
            return;
        }
        if(area.current.value.trim() == ''){
            setErrorMsg("Frontal area must be defined")
            return;
        }
        if(tyreRadius.current.value.trim() == ''){
            setErrorMsg("Tyre radous must be defined")
            return;
        }
        if(gear.current.value.trim() == ''){
            setErrorMsg("Gear ratio must be defined")
            return;
        }
        if(tor.current.value.trim() == ''){
            setErrorMsg("Torque  must be defined")
            return;
        }
        if(motorPower.current.value.trim() == ''){
            setErrorMsg("Motor Power must be defined")
            return;
        }
        if(effi.current.value.trim() == ''){
            setErrorMsg("Efficiency must be defined")
            return;
        }
        if(rollResis.current.value.trim() == ''){
            setErrorMsg("Rolling resistance must be defined")
            return;
        }
        if(air_density.current.value.trim() == ''){
            setErrorMsg("Air density must be defined")
            return;
        }
        if(windSpeed.current.value.trim() == ''){
            setErrorMsg("Wind speed must be defined")
            return;
        }

        settingAllDataTLocal({
            mass : Number(mass.current.value),
            area : Number(area.current.value),
            tyreRadius : Number(tyreRadius.current.value),
            gear : Number(gear.current.value),
            tor : Number(tor.current.value),
            motorPower : Number(motorPower.current.value),
            effi : Number(effi.current.value),
            rollResis : Number(rollResis.current.value),
            air_density : Number(air_density.current.value),
            windSpeed : Number(windSpeed.current.value)
        })
        setShowPanel()
    }

    function proccedtoFileUpload(){
        setShowPanel()
    }

    function closePanel(){
        setClosePanel()
    }

    function clearFun(){
        clearningCurrentData()
    }

    const [sheetExcel, setSheet] = useState('');
   
    function pickingFile(el){
        if(el.target.files[0].name.split('.')[1] != 'xlsx'){
            setErrorMsg("File must be of excel(xlsx) type")
            return;
        }
        setSheet(sheetExcel=> el.target.files[0]);
        console.log(el.target.files[0])
    }

    function uploadFile(){
        console.log(sheetExcel)
        if( sheetExcel && sheetExcel.name.split('.')[1] != 'xlsx' ){
            alert('sd')
            setErrorMsg("File must be of excel(xlsx) type")
            return;
        }
        settingtheExcelToLocal(sheetExcel, navigate)
    }

    return(
        <div className="design pad16">
            <button onClick={clearFun} className='removebtn'>Erase Data</button>
            {errorDisplay &&
                <Error/>
            }
            {showFileUploadPanel &&
                <div className='excelUpload flex flex-2'>
                    <div className='fileup flex flex-dir gap16 pad16'>
                        <label className='label'>upload Yaw angle vs tangential force sheet</label>
                        <input onChange={pickingFile} ref={mass} className='inp' placeholder='450kg' type='file'/>
                        {sheetExcel &&
                            <button onClick={uploadFile} className='btn'>Upload sheet</button>
                        }
                        <button onClick={closePanel} className='proceed btn'>close</button>
                    </div>
                </div>
            }

            {essentialData.length == 0 &&

                <div className='designIner pad16 flex flex-dir gap16'>
                    <h2 className='head2 minihead'>Fill out essential information</h2>
                    <div className='formgrid grid grid-5-col gap16'>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Mass(m) kg</label>
                            <input ref={mass} className='inp' placeholder='450kg' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Frontal area(m*m)</label>
                            <input ref={area} className='inp' placeholder='1.3' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Tyre radius(m)</label>
                            <input ref={tyreRadius} className='inp' placeholder='3.5' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Gear ratio(i)</label>
                            <input ref={gear} className='inp' placeholder='2.5' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Torque (peak)(Nm)</label>
                            <input ref={tor} className='inp' placeholder='120 Nm' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Motor power(Kw)</label>
                            <input ref={motorPower} className='inp' placeholder='7.5Kw' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Efficiency η</label>
                            <input ref={effi} className='inp' placeholder='0.9' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Rolling resistance coefficient </label>
                            <input ref={rollResis} className='inp' placeholder='0.012' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Air density ρ (kg/m*m*m) </label>
                            <input ref={air_density} className='inp' placeholder='0.012' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>Wind speed </label>
                            <input ref={windSpeed} className='inp' placeholder='10m/s' type='number'/>
                        </div>
                        <div className='flex flex-dir gap16'>
                            <label className='label'>gravity is 9.81 m/s*s </label>
                        </div>
                    </div>
                    <button onClick={DataSetup} className='proceed btn'>Proceed furthur</button>
                </div>
            }

            {!(essentialData.length == 0) &&
                <div className='filledData pad16'>
                    <h2 className='head2'>Filled information</h2>
                    <div className='grid grid-1-col gap16'>
                        <p className='da'>Mass : -{essentialData[0].mass}kg</p>
                        <p className='da'>Frontal area : -{essentialData[0].area}m²</p>
                        <p className='da'>Tyre radius : -{essentialData[0].tyreRadius}m</p>
                        <p className='da'>Gear ratio : -{essentialData[0].gear}:1</p>
                        <p className='da'>Torque (peak) : -{essentialData[0].tor}</p>
                        <p className='da'>Motor power : -{essentialData[0].motorPower}Kwh</p>
                        <p className='da'>Efficiency : -{essentialData[0].effi}</p>
                        <p className='da'>Rolling resistance coefficient : -{essentialData[0].rollResis}</p>
                        <p className='da'>Air density : -{essentialData[0].air_density}</p>
                        <p className='da'>Gravity : - 9.81 m/s²</p>
                        {yaw.length==0 &&
                            <button onClick={proccedtoFileUpload} className='proceed btn'>Proceed furthur</button>
                        }
                        {!(yaw.length==0) &&
                            <Link to='/computation' className='link'>Compute design</Link>
                        }
                    </div>
                </div>
            }
        </div>
    )
}

export default Design;
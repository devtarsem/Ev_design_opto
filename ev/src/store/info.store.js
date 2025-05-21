import {create} from 'zustand'
import * as XLSX from 'xlsx';

function velocityArr(){
    let arr = [];
    for(let i = 1; i<151; i++){
        arr.push(i);
    }
    return arr;
}

const infoStore = create(
    (set, get)=>({
        essentialData : [],
        yaw : [],
        prepared_data : [],
        acceleration_data : [],
        max_speed : 0,

        showFileUploadPanel : false,
        finalProcced : false,
        setShowPanel : ()=>{
            set({showFileUploadPanel : true})
        }
        ,
        setClosePanel : ()=>{
            set({showFileUploadPanel : false})
        }
        ,
        settingAllDataTLocal : (data)=>{
            localStorage.setItem("EssentialDT", JSON.stringify(data));
            set({essentialData : [data]});
        }
        ,
        cacheData : ()=>{
            if(localStorage.getItem("EssentialDT")){
                set({essentialData : [JSON.parse(localStorage.getItem("EssentialDT"))]})
            }else{
                set({essentialData : []});
            }

            if(localStorage.getItem("YawDB")){
                set({yaw : [JSON.parse(localStorage.getItem("YawDB"))]})
            }else{
                set({yaw : []});
            }
        }
        ,
        settingtheExcelToLocal : (file, navigate)=>{
            const reader = new FileReader();
            reader.onload = (event)=>{
                console.log('File loaded!', event.target.result);
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, {type : 'array'});
                const worksheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[worksheetName];
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {header : 1})
                console.log(jsonData)
                localStorage.setItem("YawDB", JSON.stringify(jsonData));
                navigate("/computation")
                // set({showCols : true, isLoading : false,excelContent_as_json : jsonData, extracted_columns : jsonData[0]})
            }
            reader.readAsArrayBuffer(file)
        }

        ,

        computationUnit : (yaw, data)=>{
            // computing unit for cd*
            const velocityPofile = velocityArr();
            let step = (10*3.14)/180;
            let prepared_table = [
                ["speed" , "Moive force", "Resistace force", "Net force"]
            ]
            console.log(yaw[0][0])
            for(let i = 0; i<velocityPofile.length; i++){
                let activeVelocity = velocityPofile[i];
                activeVelocity = activeVelocity / 3.6;
                let sum = 0;
                for(let j = 1; j<yaw[0].length; j++){
                    let yaw_in_radian = (3.14/180)*yaw[0][j][0];
                    let v_infinite = activeVelocity*activeVelocity + data[0].windSpeed*data[0].windSpeed + 2*activeVelocity*data[0].windSpeed*Math.cos(yaw_in_radian);
                    let element = yaw[0][j][1] * ((v_infinite)/(activeVelocity*activeVelocity)) * step;
                    sum += element;
                }
                sum = sum/3.14;
                // computatuion of drag force
                let drag = (data[0].air_density * sum * data[0].area * activeVelocity*activeVelocity)/2;
                // rolling resistance force
                let rolling = data[0].rollResis * data[0].mass * 9.81;
                // total resistance
                console.log(drag)
                console.log(rolling)

                let total_resistance = Number(drag) + Number(rolling);
                // force by battery
                let force_motive;
                if(activeVelocity < 27.5){
                    force_motive = (data[0].tor * data[0].gear * data[0].effi)/data[0].tyreRadius;
                }else{
                    force_motive = data[0].motorPower / Math.max(activeVelocity, 0.1);
                }
                // calculating net force
                let net_force = force_motive - total_resistance;
                // preparing final array for graph
                prepared_table.push(
                    [(activeVelocity*3.6).toFixed(2), force_motive.toFixed(2), total_resistance.toFixed(2), net_force.toFixed(2)]
                )
            }

            // calculations for accereation && max speed calculation
            let acceleration = [];
            let max_speed = 0;
            prepared_table.slice(1).forEach(el=>{
                if(el[el.length-1] > 0){
                    max_speed = el[0];
                }
                acceleration.push([el[0], el[el.length-1]/data[0].mass]);

            })

            set({max_speed : max_speed,prepared_data : prepared_table, acceleration_data : acceleration})
        }

        ,

        exportAsExcel : async(dataToExport)=>{
            const worksheet = XLSX.utils.json_to_sheet(dataToExport);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "MySheet");
        
            XLSX.writeFile(workbook, "exported_file.xlsx");
        }
    })
)

export default infoStore;

// mass : mass.current.value,
//             area : area.current.value,
//             tyreRadius : tyreRadius.current.value,
//             gear : gear.current.value,
//             tor : tor.current.value,
//             motorPower : motorPower.current.value,
//             effi : effi.current.value,
//             rollResis : rollResis.current.value,
//             air_density : air_density.current.value,
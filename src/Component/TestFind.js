import React,{useState,useEffect} from "react";
import axios from 'axios';


function TestFind (){
    const [danhMuc,setDanhMuc] = useState([]);
    const [searchName,setSearchName] = useState("");

    const fillTable = ()=>{
        const url = "https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc";
        axios.get(url)
        .then(
            (response)=>{
                const {data} = response;
                setDanhMuc(data);
            }
        )
        .catch(
            (error)=>{
                console.error('error');
                console.error(error);
            }
        )
    }

    useEffect(fillTable,[])

    return(
        <div>
            <input type="text"
            placeholder="Search..."
            onChange={(event) => {
                setSearchName(event.target.value);
            }}/>
            {
                danhMuc.filter((val)=>  {
                    if (searchName == "") {
                        return val
                    } else if (val.ten.toLowerCase().includes(searchName.toLowerCase())){
                        return val
                    }
                }).map((val,key)=>{
                    return(
                        <div key={key}>
                            <p>{val.ten}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default TestFind
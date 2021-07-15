import React, {useState,useEffect} from "react";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import Checkbox from '@material-ui/core/Checkbox';
import 'bootstrap/dist/css/bootstrap.min.css';
// Load
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
  }));


function QuangLyDanhMuc () {

    const [danhMuc,setDanhMuc] = useState([]);
    const [sanPham,setSanPham] = useState([]);
    const [searchName,setSearchName] = useState("");

    const limit = 5;
    const pageInit = 1;
    const [page, setPage] = useState(pageInit);

    const loadDanhMuc = () => {
        opendLoad()
        const url = 'https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc?limit=' + limit +
        "&page=" + page;
        axios.get(url)
        .then(
            (response)=>{
                const {data} = response;
                setDanhMuc(data);
                closeLoad()
            }
        )
        .catch(
            (error)=>{
                console.error('error');
                console.error(error);
                closeLoad()
            }
        )
    }

    const trangTruoc = function () {
        if (page == 1) {
          return ;
        }
    
        setPage(page - 1);
    }
    
    const trangSau = function () {
        setPage(page + 1);
    }

    // Load 

    const classes = useStyles();
    const [load,setLoad] = useState(false);
    
    const closeLoad = () => {
        setLoad(false)
    }
    
    const opendLoad = () => {
        setLoad(true)
    } 

    // Them moi

    const [fromData,setFormData] = useState({
        id:'',
        ten:'',
        trangThai: false
    })

    const onRest = () => {
        setFormData({
            id:'',
            ten:'',
            trangThai: false
        })
    }

    const themMoi = () => {
        setLoad(true)
        const cn = window.confirm("Bạn có muốn thêm danh mục này không?")
        if (cn) {
            const urlAdd = 'https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc';
            axios.post(urlAdd,fromData)
                .then(
                    (response)=>{
                        const {data} = response;
                        setDanhMuc([
                            ...danhMuc,
                            data
                        ])
                        onRest()
                        setLoad(false)                        
                    }
                )
                .catch(
                    (error)=>{
                        console.error('error');
                        console.error(error);
                        setLoad(false)
                    }
                )
        }else{
            setLoad(false)
            return
        }
    }
    
    const onInputChange = (even) => {
        const{ name,value } = even.target;
        setFormData({
            ...fromData,
            [name]:value
        })
    }
    const onCheckBoxChange = (even) => {
        const{ name,checked } = even.target;
        setFormData({
            ...fromData,
            [name]:checked
        })
    }
    // Cap nhap

    const capNhap = () => {
        setLoad(true);
        const cn = window.confirm("Bạn có muốn cập nhập danh mục này không");

        if (cn) {
            const urlUpdate = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${fromData.id}`;

             axios.put(urlUpdate,fromData)
                .then(
                    (response) => {
                        const { data } = response
                        const listNew = danhMuc.filter(
                            (val)=>{
                                if (val.id == fromData.id) {
                                    val.ten = fromData.ten
                                    val.trangThai = fromData.trangThai
                                    return true;
                                }else{
                                    return true;
                                }
                            }
                        )
                        
                        setDanhMuc(listNew)
                        onRest()
                        setLoad(false)
                    }
                )
                .catch(
                    (error)=>{
                        console.error('error');
                        console.error(error);
                        setLoad(false)
                    }
                )
        }else{
            setLoad(false)
            return
        }
    }

    // Xoa

    const xoaCung = (value) => {
       setLoad(true)
       const cn = window.confirm("Bạn có muốn xóa danh mục này không ?")
       if (cn) {
        const urlDelete = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${value.id}`;
        axios.delete(urlDelete)
            .then(
                (response) => {
                    const listNew = danhMuc.filter(
                        (val) => {
                            if (val.id === value.id) {
                                 return false;
                            } else {
                                return true;
                            }
                        }
                    )
                    setDanhMuc(listNew);
                    setLoad(false)
                }
            )
            .catch(
                (error) => {
                    console.error('error');
                    console.error(error);
                }
            )
       }else{
           setLoad(false)
           return
       }
    }

    const xoa = function (event,value){
        const urlCheck = 'https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/'+value.id+'/SanPham';

        axios.get(urlCheck)
        .then(
            (response) => {
                const {data} = response;
                if (data.length==0) {
                    xoaCung(value)
                    onRest()
                }else{
                    alert("Danh mục đang có sản phẩm, không thể xóa")
                }
            }
        )
        
    }
    
    // Click

    const [clickRow,setClickRow] = useState(-1);

    const onRowClick = (event,value,index) => {
        setClickRow(index);
        setFormData(value);
    }

    
    useEffect(loadDanhMuc,[page])

    return(
        
        <div style={{backgroundColor:'#f5f5f5f5',height:'900px',width:'100%'}}>
            
            <div style={{backgroundColor:'white',height:'90%',width:'66%',margin:'2% 2%',float:'left'}}>

                <div>
                <Backdrop className={classes.backdrop} open={load} onClick={closeLoad}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                </div>
                
                <TextField type="text"
                style={{margin:'40px 40px 20px 40px',width:'300px'}}
                placeholder="Search..."
                onChange={(event) => {
                    setSearchName(event.target.value);
                }}/>
                {
                    <Table style={{margin:'0 40px 40px 40px', width:'780px'}}>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Tên</TableCell>
                                <TableCell>Hoạt động</TableCell>
                                <TableCell>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                            <TableBody>
                                {
                                    danhMuc.filter((val)=>  {
                                        if (searchName == "") {
                                            return val
                                        } else if (val.ten.toLowerCase().includes(searchName.toLowerCase())){
                                            return val
                                        }
                                    }).map((value,index)=>{
                                        return(
                                            <TableRow 
                                                onClick={(event)=>{
                                                    onRowClick(event,value,index)
                                                }}
                                                key={index}>
                                                    <TableCell>{value.id}</TableCell>
                                                    <TableCell>{value.ten}</TableCell>
                                                    <TableCell>
                                                        <Switch
                                                            color="primary"
                                                            checked={value.trangThai}
                                                            onChange={onInputChange}
                                                            name="trangThai"
                                                            
                                                        />
                                                    </TableCell>
                                                    <TableCell>
                                                        
                                                        <Button
                                                        onClick={(event)=>{xoa(event,value)}}
                                                        color="secondary"
                                                        >
                                                        XÓA</Button>
                                                    </TableCell>
                                            </TableRow>
                                        )
                                    })
                                }
                                
                            </TableBody>
                    </Table>
                    
                }
                <ul className="pagination mt-4 mb-4" style = {{margin:'40px'}}>
            
                    <li
                    onClick={ trangTruoc }
                    className="page-item">
                    <a className="page-link">Trang trước</a>
                    </li>

                    <li className="page-item">
                    <a className="page-link">{ page }</a>
                    </li>

                    <li
                    onClick={ trangSau }
                    className="page-item">
                    <a className="page-link">Trang sau</a>
                    </li>
                </ul>
            </div>
            <div style={{backgroundColor:'white',height:'90%',width:'26%',marginTop:'2%',float:'left',padding:'20px'}}>
                <TextField 
                style = {{width:'280px',margin:'10px'}}
                label="Id" 
                disabled
                name="id"
                value={fromData.id}
                onChange={onInputChange}
                />
                <br/>
                <TextField 
                style = {{width:'280px',margin:'10px'}}
                label="Nhập danh mục cần thêm" 
                name="ten"
                value={fromData.ten}
                onChange={onInputChange}
                />
                <br/>
                <p
                style = {{margin:'10px'}}
                >
                Trạng thái hoạt động</p>
                <Checkbox
                style = {{margin:'0 0 20px 0'}}
                name="trangThai"
                checked={fromData.trangThai}
                onChange={onCheckBoxChange}
                />
                <br/>
                <Button 
                style = {{width:'280px',margin:'10px'}}
                variant="outlined" color="primary"
                onClick={themMoi}
                
                >Thêm mới</Button>
                <br/>
                <Button 
                style = {{width:'280px',margin:'10px'}}
                variant="outlined" color="primary"
                onClick={capNhap}
                
                >Cập nhập</Button>
                <br/>
                <Button 
                style = {{width:'280px',margin:'10px'}}
                variant="outlined" color="primary"
                onClick={onRest}
                
                >Làm mới</Button>
            </div>
        </div>
    )
}

export default QuangLyDanhMuc;
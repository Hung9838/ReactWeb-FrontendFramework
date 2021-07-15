import React, {useState,useEffect} from "react";
import axios from 'axios';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from "@material-ui/core/TextField";
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
// Xoa mem
import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Load
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
// Sap xep
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';



const useStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

function QuangLySanPham () {

    const [danhMuc,setDanhMuc] = useState([]);
 
    const fillSelect = ()=>{
      const url = "https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc";
      axios.get(url)
      .then(
          (response)=>{
              const {data} = response;
              setDanhMuc(data)
          }
      )
      .catch(
          (error)=>{
              console.error('error');
              console.error(error);
          }
      )
    }
  

    const [searchName,setSearchName] = useState("");
    const [sanPham,setSanPham] = useState([]);
    const [fn,setFn] = useState({
        id: '',
        danhMucId: 1,
        tenSP: '',
        gia: '',
        link: '',
        trangThai: true,
    })

    const limit = 10;
    const pageInit = 1;
    const [page, setPage] = useState(pageInit);
    const [id,setID] = useState(1)


    const loadSanPham = () => {
        fillSelect()
        setLoad(true)
        let url = 'https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/'+id+'/SanPham?limit=' + limit +
        "&page=" + page;
        axios.get(url)
        .then(
            (response)=>{
                const {data} = response;
                setSanPham(data)
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
            
    }
    
    const onSelectChange = (event) => {
        const newID = event.target.value
        setID(newID)
        setFn({danhMucId:newID,trangThai:true})
    }

    useEffect(loadSanPham,[page,id])

    const trangTruoc = function () {
        if (page == 1) {
          return ;
        }
    
        setPage(page - 1);
    }
    
    const trangSau = function () {
        setPage(page + 1);
    }

    // Them sanPham 

    const onInputChange = (even) => {
        const{ name,value } = even.target;
        setFn({
            ...fn,
            [name]:value
        })
    }

    const themMoi = () => {

        const cf = window.confirm('Bạn có muốn thêm sản phẩm này không ?')
        if (cf) {
            setLoad(true)
            console.log(id)
            const url = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${fn.danhMucId}/SanPham`

            axios.post(url,fn)
            .then(
                (response) => {
                    console.log(response)
                    const {data} = response
                    setSanPham([
                        ...sanPham,
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
            return
        }
    }

    // Click

    const [clickRow,setClickRow] = useState(-1);

    const onRowClick = (event,value,index) => {
        setClickRow(index);
        setFn(value);
    }

    // Cap nhap 

    const capNhap = () => {
        const cf = window.confirm('Bạn có muốn cập nhập sản phẩm này không ?')
        if (cf) {
            setLoad(true)
            const urlUpdate = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${fn.danhMucId}/SanPham/${fn.id}`
            axios.put(urlUpdate,fn)
                    .then(
                        (response) => {
                            const { data } = response
                            const listNew = sanPham.filter(
                                (val)=>{
                                    if (val.id == fn.id) {
                                        val.danhMucId = fn.danhMucId
                                        val.tenSP = fn.tenSP
                                        val.gia = fn.gia
                                        return true;
                                    }else{
                                        return true;
                                    }
                                }
                            )
                            
                            setSanPham(listNew)
                            onRest()
                            setLoad(false)
                        }
                    )
                    .catch(
                        (error)=>{
                            console.error('error');
                            console.error(error);
                        }
                    ) 
        }else{
            return
        }
    }

    // Reset


    const onRest = () => {
        setFn({
            id: '',
            danhMucId: id,
            tenSP: '',
            gia: '',
            link: '',
            trangThai: true,
        })
    }

    // Xoa mem

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const xoaMem = (event,value) => {
        const cf = window.confirm('Sản phẩm sẽ được tạm thời lưu trong thùng rác')
        if (cf) {
            setLoad(true)
        const urlUpdate = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${value.danhMucId}/SanPham/${value.id}`
        const f = {
            trangThai: false,
        }
        axios.put(urlUpdate,f)
                .then(
                    (response) => {
                        const { data } = response
                        const listNew = sanPham.filter(
                            (val)=>{
                                if (val.id == data.id) {
                                    val.trangThai = data.trangThai
                                    return true;
                                }else{
                                    return true;
                                }
                            }
                        )
                        
                        setSanPham(listNew)
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
            return
        }
    }

    const khoiPhuc = (event,value) => {
        setLoad(true)
        const urlUpdate = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${value.danhMucId}/SanPham/${value.id}`
        const f = {
            trangThai: true,
        }
        axios.put(urlUpdate,f)
                .then(
                    (response) => {
                        const { data } = response
                        const listNew = sanPham.filter(
                            (val)=>{
                                if (val.id == data.id) {
                                    val.trangThai = data.trangThai
                                    return true;
                                }else{
                                    return true;
                                }
                            }
                        )
                        
                        setSanPham(listNew)
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
    }

    // Xoa cung

    const xoaCung = (event,value) => {
        
        const cf = window.confirm('Bạn có muốn xóa vĩnh viễn sản phẩm này không ?')
        
        if (cf) {
            setLoad(true)
         const urlDelete = `https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc/${value.danhMucId}/SanPham/${value.id}`;
         axios.delete(urlDelete)
             .then(
                 (response) => {
                     const listNew = sanPham.filter(
                         (val) => {
                             if (val.id === value.id) {
                                  return false;
                             } else {
                                 return true;
                             }
                         }
                     )
                     setSanPham(listNew);
                     setLoad(false)
                 }
             )
             .catch(
                 (error) => {
                     console.error('error');
                     console.error(error);
                     setLoad(false)
                 }
             )
        }
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
    
    // Sap xep

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openBT = Boolean(anchorEl);

    const buttonOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const buttonClose = () => {
        setAnchorEl(null);
    };

    const sxTangDan = () => {
        const listNew = sanPham.sort( (a,b) => {return a.gia - b.gia} )
        setSanPham(listNew)
        buttonClose()
    }

    const sxGiamDan = () => {
        const listNew = sanPham.sort( (a,b) => {return b.gia - a.gia} )
        setSanPham(listNew)
        buttonClose()
    }

    return(
        <div style={{backgroundColor:'#f5f5f5f5',height:'1000px',width:'100%'}}>
            <div style={{backgroundColor:'white',height:'100%',width:'66%',margin:'2% 2%',float:'left'}}>
                <div>
                <Backdrop className={classes.backdrop} open={load} onClick={closeLoad}>
                    <CircularProgress color="inherit" />
                </Backdrop>
                </div>
                <TextField 
                style = {{margin:'40px'}}
                type="text"
                placeholder="Search..."
                onChange={(event) => {
                    setSearchName(event.target.value);
                }}/>
                <Select
                    color="primary"
                    onChange={(event)=>{
                        onSelectChange(event)                       
                    }}
                    style = {{width:'400px',marginTop:'40px'}}
                    >
                        
                        {
                            danhMuc.map(    
                                (value) => {
                                    return(
                                        <MenuItem value={value.id}>{value.ten}</MenuItem>
                                    )
                                }
                            )
                        }
                </Select>
        
                <div style={{float:'right',margin:'44px 60px 0 0'}}>
                    <Button aria-controls="fade-menu" aria-haspopup="true" onClick={buttonOpen}>
                        Sắp xếp
                    </Button>
                    <Menu
                        id="fade-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={openBT}
                        onClose={buttonClose}
                        TransitionComponent={Fade}
                    >
                        <MenuItem onClick={sxTangDan}>Tăng dần</MenuItem>
                        <MenuItem onClick={sxGiamDan}>Giảm dần</MenuItem>
                    </Menu>
                </div>


                <Table style={{margin:'0 40px 40px 40px', width:'780px'}}>
                    <TableHead>
                        <TableCell>ID</TableCell>
                        <TableCell>ID danh mục</TableCell>
                        <TableCell>Tên sản phẩm</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Hành động</TableCell>
                    </TableHead>
                    <TableBody>
                        {
                            sanPham.filter(
                                (val) => {
                                    if (searchName == "" && val.trangThai == true) {
                                        return val
                                    } else if (val.tenSP.toLowerCase().includes(searchName.toLowerCase()) && val.trangThai == true ){
                                        return val
                                    }
                                }
                                
                            ).map(
                                (value,index) => {
                                    return(
                                        <TableRow
                                        onClick={(event)=>{
                                            onRowClick(event,value,index)
                                        }}
                                        key={index}>
                                            <TableCell>{value.id}</TableCell>
                                            <TableCell>{value.danhMucId}</TableCell>
                                            <TableCell>{value.tenSP}</TableCell>
                                            <TableCell>{value.gia}</TableCell>
                                            <TableCell>
                                                <Button color = "secondary" onClick={ (event) => {xoaMem(event,value)}}>XÓA</Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                }
                            )
                        }
                    </TableBody>
                </Table>
                <ul className="pagination mt-4 mb-4" style = {{margin:'40px',float:'left'}}>
            
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

                <div>
                    <Button style={{margin:'24px 0 0 300px',float:'left'}} variant="outlined" color="secondary" onClick={handleClickOpen}>
                        Thùng rác
                    </Button>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title">{"thùng giác gồm các sản phẩm của danh mục có id : "+id}</DialogTitle>
                        <DialogContent>
                            <Table>
                                <TableHead>
                                    <TableCell>ID</TableCell>
                                    <TableCell>ID danh mục</TableCell>
                                    <TableCell>Tên sản phẩm</TableCell>
                                    <TableCell>Giá</TableCell>
                                    <TableCell>Hành động</TableCell>
                                </TableHead>
                                <TableBody>
                                    {
                                        sanPham.filter(
                                            (val) => {
                                                if (val.trangThai == false) {
                                                    return val
                                                }
                                            }
                                            
                                        ).map(
                                            (value,index) => {
                                                return(
                                                    <TableRow
                                                    key={index}>
                                                        <TableCell>{value.id}</TableCell>
                                                        <TableCell>{value.danhMucId}</TableCell>
                                                        <TableCell>{value.tenSP}</TableCell>
                                                        <TableCell>{value.gia}</TableCell>
                                                        <TableCell>
                                                            <Button
                                                            style = {{width:'150px'}} 
                                                            color="primary"
                                                            onClick = { (event) => {khoiPhuc(event,value)}}>
                                                                Khôi phục
                                                            </Button>
                                                            <Button 
                                                            style = {{width:'150px'}} 
                                                            color = "secondary" 
                                                            onClick = { (event) => {xoaCung(event,value)}}>
                                                                Xóa cứng
                                                            </Button>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            }
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </DialogContent>
                    </Dialog>
                </div>

            </div>
            <div style={{backgroundColor:'white',height:'90%',width:'26%',marginTop:'2%',float:'left',padding:'20px'}}>
                <TextField 
                style = {{width:'280px',margin:'10px'}}
                label="Id" 
                disabled
                name="id"
                value={fn.id}
                onChange={onInputChange}
                />
                <br/>
                <TextField 
                style = {{width:'280px',margin:'10px'}}
                label="Id danh mục"
                disabled 
                name="danhMucId"
                value={fn.danhMucId}
                onChange={onInputChange}
                />
                <br/>
                <TextField 
                style = {{width:'280px',margin:'10px'}}
                label="Nhập sản phẩm cần thêm" 
                name="tenSP"
                value={fn.tenSP}
                onChange={onInputChange}
                />
                <br/>
                <TextField 
                style = {{width:'280px',margin:'10px'}}
                label="Nhập giá của sản phẩm" 
                name="gia"
                value={fn.gia}
                onChange={onInputChange}
                />
                  
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

export default QuangLySanPham;

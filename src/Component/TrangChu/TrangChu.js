import React,{useState,useEffect} from 'react';
import axios from 'axios';
// Danh muc
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// Card san pham
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
// Gio hang
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// Table
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
// Load
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
// Sap xep
import Menu from '@material-ui/core/Menu';
import Fade from '@material-ui/core/Fade';
import MenuItem from '@material-ui/core/MenuItem';



const loadStyles = makeStyles((theme) => ({
    backdrop: {
      zIndex: theme.zIndex.drawer + 1,
      color: '#fff',
    },
}));

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
});

function TrangChu() {

    // Load

    const classess = loadStyles();
    const [load,setLoad] = useState(false);
    
    const closeLoad = () => {
        setLoad(false)
    }
    
    const opendLoad = () => {
        setLoad(true)
    } 

    //---------------

    const classes = useStyles();

    const [danhMuc,setDanhMuc] = useState([]);
    const [sanPham,setSanPham] = useState([]);
    const [searchName,setSearchName] = useState("");
    const [searchSanPham,setSearchSanPham] = useState("");
    const [id,setID] = useState(1)

    const fillDanhMuc = ()=>{
        
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

    const limit = 6;
    const pageInit = 1;
    const [page, setPage] = useState(pageInit);

    const loadSanPham = ()=> {
        setLoad(true)
        fillDanhMuc()
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

    const trangTruoc = function () {
        if (page == 1) {
          return ;
        }
    
        setPage(page - 1);
    }
    
    const trangSau = function () {
        setPage(page + 1);
    }


    const onDanhMucChange = (event,value) => {
        const newID = value.id
        setID(newID)
    }

    useEffect(loadSanPham,[id,page])

    // Gio hang

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [gioHang,setGioHang] = useState([]);

    const onThemGioHang = (event,val) => {
        let trangThai = false
        if (gioHang.length>0) {
            gioHang.map(
                (value) => {
                    if (value.id == val.id) {
                        value.tenSP = val.tenSP
                        value.gia = val.gia
                        value.soLuong = value.soLuong + 1
                        trangThai = true
                        return true
                    }else{
                        return true
                    }
                }
            )
            if (trangThai == true) {
                return
            }else{
                const data = {id:val.id,tenSP:val.tenSP,gia:val.gia,soLuong:1}
                setGioHang([...gioHang,data])
            }
        }else{
            const data = {id:val.id,tenSP:val.tenSP,gia:val.gia,soLuong:1}
            console.log(data)
            setGioHang([...gioHang,data])
        }
    }

    const themSL = (event,val) => {
        const listNew = gioHang.filter(
            (value) => {
                if (value.id == val.id) {
                    value.tenSP = val.tenSP
                    value.gia = val.gia
                    value.soLuong = value.soLuong + 1
                    return true
                }else{
                    return true
                }
            }
        )
        setGioHang(listNew)
    }

    const giamSL = (event,val) => {
        const listNew = gioHang.filter(
            (value) => {
                if (value.id == val.id) {
                    value.tenSP = val.tenSP
                    value.gia = val.gia
                    if (value.soLuong != 1) {
                        value.soLuong = value.soLuong - 1
                    }
                    return true
                }else{
                    return true
                }
            }
        )
        setGioHang(listNew)
    }

    var tongTien = 0

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
        <React.Fragment>
            <div style={{backgroundColor:'#f5f5f5f5',height:'100%',width:'100%'}}>
                <div style={{backgroundColor:'white',height:'90%',width:'76%',margin:'2% 2%',float:'left'}}>
                    <div style={{width:'100%',height:'15%',padding:'20px'}}>
                        <div>
                            <Backdrop className={classess.backdrop} open={load} onClick={closeLoad}>
                                <CircularProgress color="inherit" />
                            </Backdrop>
                        </div>
                        <TextField type="text"
                        style = {{marginTop:'40px',marginLeft:'20px',width:'300px'}}
                        placeholder="Search...."
                        onChange={(event) => {
                            setSearchSanPham(event.target.value);
                        }}/>

                        <Button
                        style = {{marginTop:'40px',marginRight:'20px',float:'right'}}
                        onClick={handleClickOpen}
                        variant="contained"
                        color="primary"
                        startIcon={<ShoppingCartIcon />}
                        >
                         Giỏ hàng   
                        </Button>

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

                        <Dialog
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">Giỏ hàng của bạn : </DialogTitle>
                            <DialogContent>
                                <Table>
                                    <TableHead>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Tên sản phẩm</TableCell>
                                        <TableCell>Giá</TableCell>
                                        <TableCell>Số lượng</TableCell>
                                        <center><TableCell>Hành động</TableCell></center>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            gioHang.map(
                                                (value,key) => {
                                                    tongTien = tongTien + (value.gia * value.soLuong)
                                                    return (
                                                        <TableRow key={key}>
                                                            <TableCell>{value.id}</TableCell>
                                                            <TableCell>{value.tenSP}</TableCell>
                                                            <TableCell>{value.gia}</TableCell>
                                                            <TableCell><center>{value.soLuong}</center></TableCell>
                                                            <TableCell>
                                                                <Button
                                                                onClick = { (event)=>{themSL(event,value)} }
                                                                color="primary"
                                                                >
                                                                    Thêm
                                                                </Button>
                                                                <Button
                                                                onClick = { (event)=>{giamSL(event,value)} }
                                                                color="primary"
                                                                >
                                                                    Bớt
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    )
                                                }
                                            )
                                        }
                                    </TableBody>
                                </Table>
                                <div style = {{height:'40px',padding:'5px'}}>
                                    <p style={{float:'left',marginTop:'5px'}}>Tổng tiền : {tongTien} </p>
                                    <Button style={{float:'right'}} color="secondary">Thanh toán</Button> 
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                    <div style={{width:'100%',height:'76%',padding:'20px'}}>
                        {
                            sanPham.filter((val)=>  {
                                if (searchSanPham == "" && val.trangThai == true) {
                                    return val
                                } else if (val.tenSP.toLowerCase().includes(searchSanPham.toLowerCase()) && val.trangThai == true ){
                                    return val
                                }
                            }).map((val,key)=>{                                   
                                    return(
                                        <div key={key}>
                                            
                                            <Card className={classes.root} style={{float:'left',height:'310px',width:'295px',margin:'10px'}}>
                                                <CardActionArea style={{height:'80%'}}>
                                                    <CardMedia
                                                    style={{height:'80%'}}
                                                    className={classes.media}
                                                    image="https://cdn.fptshop.com.vn/Uploads/Originals/2020/12/4/637426754540310489_asus-vivobook-a415-bac-dd-1.png"
                                                    title="Contemplative Reptile"
                                                    />
                                                    <CardContent
                                                    style={{height:'20%'}}
                                                    >
                                                    <Typography gutterBottom>
                                                        {val.tenSP}
                                                    </Typography>
                                                    <Typography variant="body2" color="textSecondary" component="p">
                                                        {val.gia}
                                                    </Typography>
                                                    </CardContent>
                                                </CardActionArea>
                                                <CardActions style={{height:'20%'}}>
                                                    <Button
                                                    onClick = { (event) => {onThemGioHang(event,val)} } 
                                                    size="small" 
                                                    color="primary">
                                                        Thêm vào giỏ hàng
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </div>
                                    )
                            })
                        }
                    </div>
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

                </div>
                <div style={{backgroundColor:'white',height:'90%',width:'16%',marginTop:'2%',float:'left',padding:'20px'}}>
                    <TextField type="text"
                    style = {{marginTop:'20px',marginBottom:'20px'}}
                    placeholder="Search..."
                    onChange={(event) => {
                        setSearchName(event.target.value);
                    }}/>
                    {
                        danhMuc.filter((val)=>  {
                            if (searchName == "" && val.trangThai == true) {
                                return val
                            } else if (val.ten.toLowerCase().includes(searchName.toLowerCase()) && val.trangThai == true){
                                return val
                            }
                        }).map((val,key)=>{
                            return(
                                <div key={key}>
                                    <Button
                                    style = {{width:'170px',marginTop:'10px'}}
                                    variant="outlined" color="primary" 
                                    value={val.ten} 
                                    onClick={ (event) => {onDanhMucChange(event,val)} }
                                    >
                                        {val.ten}
                                    </Button>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default TrangChu
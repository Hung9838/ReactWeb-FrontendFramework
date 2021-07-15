import React, { useState, useEffect } from "react";
import axios from 'axios';
// Menu ngang
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// Menu doc
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
// Router
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link, 
  Redirect
} from "react-router-dom";
// QL
import QLDanhMuc from './Component/DanhMuc/QLDanhMuc';
import QLSanPham from './Component/SanPham/QLSP';
import TrangChu from './Component/TrangChu/TrangChu'
// Icons
import HomeIcon from '@material-ui/icons/Home';
import ClassIcon from '@material-ui/icons/Class';
import LaptopIcon from '@material-ui/icons/Laptop';
// Login
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import AccountCircle from '@material-ui/icons/AccountCircle';


function App() {

  // Định dạng menu ngang 
  const useStyles  = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

  // Login

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
      setOpen(true)     
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [user,setUser] = useState({taiKhoan:'',matKhau:''});

  const onInputChange = (even) => {
    const{ name,value } = even.target;
    setUser({
        ...user,
        [name]:value
    })
  }

  const reSetForm = () => {
    setUser({taiKhoan:'',matKhau:''})
  }

  const DangNhap = (event) => {
    if (user.taiKhoan == 'admin' && user.matKhau == '123') {
        localStorage.setItem("accessToken",true)
        setOpen(false);
    }else{
      alert("Bạn nhập sai tài khoản hoặc mật khẩu")
    }
  }

 
  const DangXuat = (event) => {
    
    localStorage.removeItem("accessToken")
    reSetForm()
  }

  // const [danhMuc,setDanhMuc] = useState([]);
 
  // const fillSelect = ()=>{
  //   const url = "https://603a4a22d2b9430017d24ddc.mockapi.io/LapTopShoop/DanhMuc";
  //   axios.get(url)
  //   .then(
  //       (response)=>{
  //           const {data} = response;
  //           setDanhMuc(data)
  //       }
  //   )
  //   .catch(
  //       (error)=>{
  //           console.error('error');
  //           console.error(error);
  //       }
  //   )
  // }

  // useEffect(fillSelect,[])

  return (
    
      <React.Fragment>
        <Router>
          <div style = {{width:'100vw',height:'1000px',float:'left'}}>

            <div className="MenuDoc" 
            style = {{width:'15%',height:'100%',float:'left'}}>
              <List component="nav" aria-label="main mailbox folders"
              style={{marginTop:'55px'}}>
                <ListItem button>
                  <ListItemIcon>
                    <ClassIcon style={{marginTop:'10px'}}/>
                  </ListItemIcon>
                  <Link to = "/DanhMuc"
                    style={{textDecoration:'none',color:'black',marginTop:'10px'}}
                  >
                    Quản lý danh mục</Link>
                </ListItem>
                <ListItem button>
                  <ListItemIcon>
                    <LaptopIcon style={{marginTop:'10px'}}/>
                  </ListItemIcon>
                    <Link to = "/SanPham"
                      style={{textDecoration:'none',color:'black',marginTop:'10px'}}
                    >
                      Quản lý sản phẩm</Link>
                </ListItem>
              </List>
              <Divider style={{marginTop:'10px'}}/>
              <List component="nav" aria-label="secondary mailbox folders">
                <ListItem button style={{marginTop:'10px'}}>
                  <Link to = "/"
                    style={{textDecoration:'none',color:'black'}}
                  >
                    Trang chủ</Link>
                </ListItem>
                <ListItem button>
                  <Link 
                    style={{textDecoration:'none',color:'black'}}
                  >Báo cáo</Link>
                </ListItem>
              </List>
            </div>
            <div className={classes.root} 
            style={{width:'85%',float:'left',height:'100%',backgroundColor:'#f5f5f5f5'}}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton 
                    style = {{marginBottom:'8px'}}
                    edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <Link to="/" style={{color:'white'}}><HomeIcon/></Link>
                  </IconButton>
                  <Typography variant="h6" className={classes.title}>
                    Việt Hùng Shop
                  </Typography>
                  {
                    localStorage.getItem("accessToken")? 
                    <Button color="inherit" onClick={DangXuat} >
                      <Link to="/"
                        style={{textDecoration:'none',color:'white'}}
                      >
                        Đăng xuất</Link>
                    </Button>:
                    <Button color="inherit" onClick={handleClickOpen}>Đăng nhập</Button>                    
                  }
                  
                  <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                  <DialogTitle id="form-dialog-title">Đăng nhập</DialogTitle>
                  <DialogContent style={{height:'320px',width:'450px'}}>
                    <center>
                      <img src="https://image.freepik.com/free-psd/digital-device-mockup_53876-91374.jpg" 
                      height="148px" width="202px" alt=""/>
                    </center>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                      <Grid item>
                      <TextField
                        style = {{width:'350px'}}
                        label="Tài khoản"
                        name="taiKhoan"
                        // type="text"
                        value={user.taiKhoan}
                        onChange={onInputChange}
                        fullWidth
                      />
                      </Grid>
                    </Grid>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <AccountCircle />
                    </Grid>
                      <Grid item>
                      <TextField
                        style = {{width:'350px'}}
                        label="Mật khẩu"
                        name="matKhau"
                        type="password"
                        value={user.matKhau}
                        onChange={onInputChange}
                        fullWidth
                      />
                      </Grid>
                    </Grid>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleClose} color="primary">
                      Thoát
                    </Button>
                    <Button onClick={DangNhap} color="primary">
                      Đăng nhập
                    </Button>
                  </DialogActions>
                </Dialog>
                
                </Toolbar>
              </AppBar>
              <Switch>
                <Route path="/DanhMuc"
                render={()=>{
                  return localStorage.getItem("accessToken") ? <QLDanhMuc/> : <Redirect to="/"/>
                }}>
                  
                </Route>
                <Route path="/SanPham"
                render={()=>{
                  return localStorage.getItem("accessToken") ? <QLSanPham /> : <Redirect to="/"/>
                }}>
                  
                </Route>
                <Route path="/">
                    {/* <img src="https://anhdepfree.com/wp-content/uploads/2020/03/nen-background-mau-trang-don-gian.jpg" 
                    alt="" width="100%" height="100%"/> */}
                    <TrangChu/>
                </Route>
              </Switch>
            </div>            
          </div>
        </Router>
      </React.Fragment>

  );
}



export default App;

// Module Material UI / ## v4 

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Headline from './components/Headline';
import ItemList from './components/ItemList';
import Aside from './components/Aside';
import BoxList from './components/BoxList';
import Footer from './components/Footer';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';//mấy cái icon này chỉ import đc từng cái như này
import { Checkbox, FormControlLabel, TextField, Box } from '@material-ui/core';

import { orange, green } from '@material-ui/core/colors';

// import "@fontsource/roboto"; // Defaults to weight 400
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import AppBar from '@material-ui/core/AppBar';
import ToolBar from '@material-ui/core/ToolBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';

// # Thao tác với className style / Dùng css selector trong MUI
// Các hàm thường dùng
const useStyles = makeStyles({//hàm này tạo ra 1 style là 1 object gồm tập hợp các css object dùng cho MUI Component
  root: {
    background: 'linear-gradient(45deg, #FE6B8B, #FF8E53)',
    border: 8,
    borderRadius: 15,
    marginBottom: 15,
    color: "white",
    padding: '5px 38px'//đây là set 2 trục
  },
  test: {
    "& $abc": {
      color: "red",
    }
  },
  abc: {
  },
})
function ButtonStyled(){
  const classes = useStyles();
  return <Button className={classes.root}>Test Styled Button</Button>
}

// function App() {
//   return (
//     //đây là phần hiển thị ra ngoài trình duyệt. nó liên kết với file index.html thông qua file index.js
//     //thẻ main là thẻ báo hiệu nội dung chính của document, là 1 thẻ duy nhất, k đc lồng main dưới các thẻ con
//     //như aside, header, footer, nav, article
//     //section là thẻ xác định 1 section trong document
//     //aside báo hiệu thẻ về 1 bên của document liên quan tới các content xung quanh. Nó k có chức năng tự sang 1 bên
//     //mà vẫn hiển thị bth nên ta phải tự xử lý với style vd float và set width cho nó
//     //thẻ footer báo hiệu chân trang cho 1 section or 1 document
    
//     <div id="layout">
//       <Header/>
//       <main>
//         <section id="content">
//           <Headline bigTitle={blog.bigTitle} />
//           <ItemList itemList={blog.itemList}/>
//         </section>
//         <Aside />
//         <BoxList itemBox={blog.boxList}/>
//       </main>
//       <Footer />
//     </div>
//   );
// }

// # Thao tác với các component options
function CheckboxExample() {
  const [checked, setChecked] = React.useState(true);
  return (
    <div>
      <Checkbox
        checked={checked}
        color="primary"
        // disabled
        icon={<SaveIcon/>}
        checkedIcon={<DeleteIcon/>}
        onChange={(e) => setChecked(e.target.checked)}
        inputProps={{
          'aria-label': 'secondary checkbox'
          //input Props là attribute cung cho thẻ. Ví dụ aria-label
        }}
      />
      <Checkbox />
      <br></br>
      <FormControlLabel
        control={//có thể là radio, switch, checkbox
          <Checkbox
            checked={checked}
            color="primary"
            checkedIcon={<SaveIcon/>}
            onChange={(e) => setChecked(e.target.checked)}
          />}
        label="Testing"
      />
    </div>
  )
}

// # Setup dự án
const theme = createTheme({//để custom các thẻ áp dụng với toàn bộ class có sẵn của MUI
  typography:{//sửa các thẻ có sẵn
    h3: {
      fontSize: 24,
      marginBottom: "10px",
    }//chỉnh class Typography-h3
  },

  palette: {//sửa các thuộc tính có sẵn vd như màu
    primary: {
      main: green[400],//mảng cho biết mức độ đậm nhạt
      //màu nào dùng nh trong theme để ở  primary, main là màu chính primary
    },
    secondary: {
      main: orange[300]
    }
  }
})

// # Dùng Grid
// # Dùng Paper
function App() {
  const classes = useStyles();
  return(
    <>
      <Grid container spacing={2} justify="center">
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper style={{width: "100%", height: 75}}>Hello</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper style={{width: "100%", height: 75}}>Hello</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper style={{width: "100%", height: 75}}>Hello</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper style={{width: "100%", height: 75}}>Hello</Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
          <Paper style={{width: "100%", height: 75}}>Hello</Paper>
        </Grid>
      </Grid>
      <Box className={classes.test}>
        <Box className={classes.test1}>
          <Box className={classes.abc}>Hello</Box>
        </Box>
      </Box>
    </>
  )
}

// Các component khác
// Dùng Paper, Dùng Grid, Dùng Typography, Dùng Box
// Dùng input text TextField
// class App extends React.Component {
//   constructor(props){
//     super(props);
//     this.state = blog;
//   }
  
//   changeData = () => {
//     this.setState({
//       itemList: [
//         {
//           title: 'Title changed',
//           info: 'Proin ex nunc, bibendum ut magna quis.'
//         },
//         {
//           title: 'Blandit mollis',
//           info: 'New information changed.'
//         },
//         {
//           title: 'Donec ut libero',
//           info: 'Donec ut libero pretium, efficitur nisl vel, sagittis elit.'
//         }
//       ]
//     })
//   }

//   render(){
//     return (
//     <div id="layout">
//       <ThemeProvider theme={theme}>
//         <Container maxWidth="md">{/*lg,sm,xs*/}
//         <AppBar>
//           <ToolBar>
//             <IconButton>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6">
//               MUI Theming
//             </Typography>
//             <Button>
//               Login
//             </Button>
//           </ToolBar>
//         </AppBar>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
//         <br/>
          // <Grid container spacing={2} justify="center">
          //   <Grid item xs={12} sm={3}>
          //     {/* ở trong vùng sm chỉ chiếm 3 ô, ở trong vùng sx chiếm max 12 cột(đây là responsive
          //       để nó chiếm hết vùng đó thì paper ta set là 100% chứ k đc fix) */}
          //     <Paper style={{width: "100%", height: 75}} variant="outlined">
          //       <Box component="span" m={1}>
          //         <Button>Button in paper</Button>
          //       </Box>
          //       {/* paper cx như card ấy, là 1 nơi chứa nhưng dạng giấy, ta nhét các thứ vào trong */}
          //       {/* box là tương tự 1 cái hộp chứa component, nó như 1 thẻ div nếu ta k set component, 
          //       ta có thể chứa các item xong gom 1 css */}
          //     </Paper>
          //   </Grid>
          //   <Grid item xs={3} sm={3}>
          //     <Paper style={{width: "100%", height: 75}}/>
          //   </Grid>
          //   <Grid item xs={3} lg={12}>
          //     <Paper style={{width: "100%", height: 75}}/>
          //   </Grid>
          // </Grid>

//           {/* có component div thì kẹp trong thẻ div có class Typography-h2, k thì kẹp trong thẻ h2 */}
//           <Typography variant="h3" component="div">{/*xác định nằm trong thẻ nào */}
//             Welcome to MUI
//           </Typography>
//           <Typography variant="body1"> {/*subtitle1 */}
//             Use to MUI
//           </Typography>

//           <ButtonGroup style={{fontSize: 14}} variant="contained">{/*tự apply cho các button*/}
//             <Button endIcon={<SaveIcon />}
//               color="secondary" size="small">Hello World</Button>
//             {/*outlined,text/primary/large/disabled*/}
//             <Button startIcon={<DeleteIcon />}
//               color="primary" size="small">Discard</Button>
//           </ButtonGroup>

//           <ButtonStyled />

//           <TextField 
//             variant="filled" //outlined
//             color="secondary"
//             type="email"//time,date
//             label="The Email"
//             // value="default text"
//             placeholder="hieucuopbien123@gmail.com"
//           />

//           <CheckboxExample />
//         </Container>
//       </ThemeProvider>

//       <Header/>
//       <main>
//         <section id="content">
//           <Headline bigTitle={this.state.bigTitle} />
//           <ItemList itemList={this.state.itemList}/>
//           <button onClick={this.changeData}>Change Data</button>
//         </section>
//         <Aside />
//         <BoxList itemBox={this.state.boxList}/>
//       </main>
//       <Footer />
//     </div>
//   );
//   }//vấn đề là thêm 1 chức năng button-> ta có thể đặt nó ở trong item list or ở ngay đây. Nếu đặt nó trong item list
//   //thì ta phải truyền event từ cha sang con mất thời gian hơn. Đúng là ta nghĩ theo kiểu component thì cho rằng các
//   //component nên độc lập với nhau, ta chỉ nên làm v nếu như cái button của ta chỉ thay đổi các thành phần trong item
//   //list, nếu button thay đổi cả trong box list thì rõ ràng nên để ở đây hơn-> nhìn rộng ra là cả cái cục lớn này mới
//   //chỉ là 1 component độc lập với button mà thôi. Nên nhớ đặt đúng scope mà button ảnh hưởng.
//   //Ở Th này thì nên nhét button vào Item list và Item list dùng state để đổi data, làm v chuẩn hơn
// }

//tạo data thử từ bên ngoài r ốp vào component, đáng lẽ nó ở file riêng nhưng ta ốp luôn ở đây cho nhanh
const blog = {
  bigTitle: 'Consectetur elit proin sit amet neque.',
  itemList: [
    {
      title: 'Proin ex nunc',
      info: 'Proin ex nunc, bibendum ut magna quis.'
    },
    {
      title: 'Blandit mollis',
      info: 'Blandit mollis orci. Ut pretium diam ut tristique interdum amet condimentum.'
    },
    {
      title: 'Donec ut libero',
      info: 'Donec ut libero pretium, efficitur nisl vel, sagittis elit.'
    }
  ],
  boxList: [
    'Placerat arcu vel',
    'Duis at est nunc',
    'Tellus at trist',
    'Ut rhoncus'
  ]
};

export default App
//phải export default như vầy khi dùng với reportWebVitals
import logo from './logo.svg';
import './App.css';
import Customer from './components/Customer';
import { Table ,TableHead,TableBody,TableRow ,TableCell,withStylesm,Paper} from '@mui/material';

const styles = {
  root: {
  width: "100%",
  overflowX: "auto"
  },
  table: {
  minWidth: 1080
  }
  };

const customers = [{
  'id': 1,
  'image': 'https://placeimg.com/64/64/1',
  'name': '김예림',
  'birthday': '060118',
  'gender': '여자',
  'job': 'student'
}, {
  'id': 2,
  'image': 'https://placeimg.com/64/64/2',
  'name': '김예봄',
  'birthday': '060118',
  'gender': '여자',
  'job': 'student'
}, {
  'id': 3,
  'image': 'https://placeimg.com/64/64/3',
  'name': '김주완',
  'birthday': '060118',
  'gender': '여자',
  'job': 'student'
}]

function App(props) {
  const {classes} = props;
  return (
    <Paper sx={{overflowX: "auto"}}>
      <Table stickyHeader sx={{maxWidth: '1080px', minWidth: '1080px'}}>
        <TableHead>
          <TableRow>
            <TableCell>번호</TableCell>
            <TableCell>이미지</TableCell>
            <TableCell>이름</TableCell>
            <TableCell>생년월일</TableCell>
            <TableCell>성별</TableCell>
            <TableCell>직업</TableCell>
          </TableRow>
        </TableHead>
      </Table>
      {
        customers.map(c => {
          return (
            <Customer
            key={c.id}
              id={c.id}
              name={c.name}
              birthday={c.birthday}
              gender={c.gender}
              job={c.job}
              image={c.image}
            />
          );
          })
        }
    </Paper>
  )
      }

export default App;

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Examination from "./Examination"
import NewExamination from './NewExamination';
import Header from './Header';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  large: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    marginBottom: '6px'
  }
}));

export default function Profile() {
  const classes = useStyles();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const role = JSON.parse(sessionStorage.getItem('role'));

  function RenderNewExaminationButton(props) {
    if(props.role === "Admin") {
      return (
        <NewExamination />
      )
    }
  }

  return (
    <div className={classes.root}>
      <Header  user={user} role={role} />
      <Card className={classes.root} variant="outlined">
        <CardContent>
          <Avatar className={classes.large} />
            <h5>
              Welcome {user.first_name} {user.last_name}
            </h5>
            <RenderNewExaminationButton role={role} />
        </CardContent>
      </Card>
      <Examination user={user} />
    </div>
  );
}
import React, {Component} from "react";
import {makeStyles} from "@material-ui/core/styles";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
import JobApplicationCard from "./Cards/JobApplicationCard";
import JobPostingCard from "./Cards/JobPostingCard";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles(() => ({
  home_page: { 
    paddingLeft: '5%',
    paddingRight: '5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  booking_history: {
    fontFamily: 'PT Sans',
    fontSize: '20px',
    textAlign: 'left',
    color: '#58595b',
    fontWeight: 'bold',
    marginTop: '20px',
    marginBottom: '0px'
  },
  section_title: {
    fontFamily: 'PT Sans',
    fontSize: '15px',
    margin: '5px',
    marginBottom: '10px',
    marginTop: '15px',
    textAlign: 'left',
    color: 'black'
  }
}));

function withMyHook(Component) {
    return function WrappedComponent(props) {
        const classes = useStyles();
        return <Component {...props} classes={classes}/>
    }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coffee_chats: [
        {
          type: 'one',
          booked: false,
          name: 'Mohaimen K',
          title: 'Software Engineering',
          company: 'Microsoft',
          tags: ['Software', 'Programming', 'Product'],
          available: 'July 1th, 2020'
        },
        {
          type: 'one',
          booked: false,
          name: 'Ahmed H',
          title: 'Software Engineering',
          company: 'Tealbook',
          tags: ['Software', 'Frontend', 'Programming'],
          available: 'August 10th, 2020'
        },
        {
          type: 'four',
          booked: false,
          name: 'Malak A',
          title: 'Software Engineering',
          company: 'MAX',
          tags: ['Software', 'Programming'],
          available: 'August 5th, 2021'
        },
        {
          type: 'one',
          booked: false,
          name: 'Fatum A',
          title: 'Software Engineering',
          company: 'MAX',
          tags: ['Software', 'Programming'],
          available: 'May 5th, 2021'
        },
      ],
      job_applications: [],
      job_postings: []
    }
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.home_page}>
          <h1 className={classes.booking_history}>Your Booking History</h1>
          <Grid
            container
            alignItems="flex-start"
            justify="flex-start"
          >  
            <Grid
              container
              item xs={12}
              spacing={1}
              alignItems="flex-start"
              justify="flex-start"
            >
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Registered Coffee Chats</p>
              </Grid>
              {this.state.coffee_chats.map((chat) => (
                <Grid
                  container
                  item xs={6}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <CoffeeChatCard oneOnOneCard={chat.type === 'one' ? true : false} booked={chat.booked} data={chat}/>
                </Grid>
              ))}
            </Grid>

            {this.props.isSeniorExec ?
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={8}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Applications</p>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Job Postings</p>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobPostingCard/>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobPostingCard/>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobApplicationCard/>
                </Grid>
              </Grid>
            :
              <Grid
                container
                item xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Grid
                  container
                  item xs={8}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Your Job Application</p>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <p className={classes.section_title}>Job Postings</p>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobApplicationCard/>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobApplicationCard/>
                </Grid>
                <Grid
                  container
                  item xs={4}
                  spacing={1}
                  alignItems="flex-start"
                  justify="flex-start"
                >
                  <JobPostingCard/>
                </Grid>
              </Grid>
            }
          </Grid>
        </div>
      </div>
    )
  }
}

Home = withMyHook(Home);
export default Home;

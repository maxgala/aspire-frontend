import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
// TODO: Hiding filters until they get implemented
// import Filter from "./Cards/FilterCard";
import CardTypes from "./CardTypes";
import { httpGet } from "../../lib/dataAccess";
// import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import EmptyCard from "./Cards/EmptyCard";
import Skeleton from '@material-ui/lab/Skeleton';

const useStyles = makeStyles(() => ({
  mainPage: {
    paddingLeft: "8%",
    paddingRight: "8%",
    justifyContent: "center",
    alignItems: "center",
    height: "90vh",
  },

  cardCoffeeLoader: {
    width: "100%",
    maxWidth: "500px",
    marginLeft: "5px",
    height: "180px",
    marginBottom: "10px",
    borderRadius: "20px",
    textAlign: "left",
    backgroundColor: "#B5A165",
    color: "white",
    boxShadow: "0px 6px 6px #00000029",
  },

  coffeeChat: {
    fontFamily: "PT Sans",
    fontSize: "30px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
    marginTop: "40px",
  },

  grid: {
    justifyContent: "center",
    alignItems: "center",
  },

  section_title: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    margin: "5px",
    marginBottom: "10px",
    textAlign: "left",
    color: "black",
    fontWeight: "bold",
  },

  select: {
    background: "#EAEAEA",
    borderColor: "#EAEAEA",
    outline: "none",
    color: "#6EA0B5",
    fontWeight: "800",
  },

  sort: {
    alignItems: "flex-start",
    textAlign: "left",
    marginBottom: "40px",
  },

  date: {
    fontFamily: "PT Sans",
    fontSize: "15px",
    fontWeight: "bold",
  },
}));

function withMyHook(Component) {
  return function WrappedComponent(props) {
    const classes = useStyles();
    return <Component {...props} classes={classes} />;
  };
}

class CoffeeChats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chats: [],
      isChatsLoaded: false
    };
  }

  fetchChats = async () => {
    const existingChatsData = await httpGet(
      "chats",
      localStorage.getItem("idToken")
    );
    this.setState({
      isChatsLoaded: true,
      chats: existingChatsData.data.chats,
    });
  };

  componentDidMount() {
    this.fetchChats();
  }

  render() {
    const classes = this.props.classes;
    //const userProfile = this.getUserProfile();
    return (
      <div>
        {/* <PerfectScrollbar> */}
        <div className={classes.mainPage}>
          <h1 className={classes.coffeeChat}>Coffee Chats</h1>
          {/* TODO: Hiding filters until they get implemented
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Industry</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={3}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Job Title</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>

            <Grid
              container
              item
              xs={12}
              sm={12}
              md={6}
              spacing={1}
              alignItems="center"
              justify="center"
            >
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <p className={classes.section_title}>Additional Filters</p>
                <p className={classes.section_title}>Random Company</p>
              </Grid>
              <Grid
                container
                item
                xs={12}
                spacing={1}
                alignItems="flex-start"
                justify="flex-start"
              >
                <Filter />
              </Grid>
            </Grid>
          </Grid>
           <div className={classes.sort}>
              <p className={classes.date}> Sort date posted by:
            <select className={classes.select}>
                  <option value="Ascending">Ascending</option>
                  <option value="descending">Descending</option>
                </select>
              </p>
            </div>
            */}

          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            {this.state.isChatsLoaded ? (
              this.state.chats && this.state.chats.length > 0 ? (
                this.state.chats.map((chat, key) => (
                  <Grid
                    key={chat.chat_id}
                    container
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    lg={6}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <CoffeeChatCard data={chat} />
                  </Grid>
                ))
              ) : (
                  <Grid
                    container
                    item
                    xs={12}
                    spacing={1}
                    alignItems="center"
                    justify="center"
                  >
                    <EmptyCard type={CardTypes.coffeeChat} />
                  </Grid>
                )
            ) : (
                <Skeleton variant="rect" className={classes.cardCoffeeLoader} />
              )}
          </Grid>
        </div>
        {/* </PerfectScrollbar> */}
      </div>
    );
  }
}

CoffeeChats = withMyHook(CoffeeChats);
export default CoffeeChats;

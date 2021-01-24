import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CoffeeChatCard from "./Cards/CoffeeChatCard";
import CardTypes from "./CardTypes";
import { httpGet } from "../../lib/dataAccess";
// import PerfectScrollbar from "@opuscapita/react-perfect-scrollbar";
import EmptyCard from "./Cards/EmptyCard";
import Skeleton from "@material-ui/lab/Skeleton";
import { withRouter } from "react-router";
import { Auth } from "aws-amplify";
import TextField from "@material-ui/core/TextField";
import Industries from "../Registration/industry";
import MenuItem from "@material-ui/core/MenuItem";

const IndustryLabels = [];
IndustryLabels.push("All");
for (let i = 0; i < Industries.length; ++i) {
  IndustryLabels.push(Industries[i]["name"]);
}

const ChatTypeLabels = [];
ChatTypeLabels.push("All");
ChatTypeLabels.push("One on One");
ChatTypeLabels.push("Mock Interview");

const useStyles = makeStyles(() => ({
  mainPage: {
    paddingLeft: "8%",
    paddingRight: "2%",
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

  filter: {
    marginBottom: "40px",
  },

  filterText: {
    fontFamily: "PT Sans",
    fontSize: "18px",
    textAlign: "left",
    color: "#58595B",
    fontWeight: "bold",
  },

  filterOption: {
    padding: "12px",
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
      isChatsLoaded: false,
      industry: "",
      unfilteredChats: [],
      chatType: "",
    };
  }

  fetchChats = async () => {
    const existingActiveChatsData = await httpGet(
      "chats?status=ACTIVE",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    const existingPartialChatsData = await httpGet(
      "chats?status=RESERVED_PARTIAL",
      (await Auth.currentSession()).getIdToken().getJwtToken()
    );
    let full = existingActiveChatsData.data.chats.concat(
      existingPartialChatsData.data.chats
    );
    this.setState({
      isChatsLoaded: true,
      chats: full,
      unfilteredChats: full,
    });
  };

  filterChats = async () => {
    let industry = this.state.industry;
    let type = this.state.chatType;
    let filteredChats = this.state.unfilteredChats;

    if (industry !== "" && industry !== "All") {
      filteredChats = this.state.unfilteredChats.filter(
        (chat) => chat.industry === this.state.industry
      );
    }

    if (type !== "" && type !== "All") {
      if (type === "One on One") {
        type = "ONE_ON_ONE";
      } else {
        type = "MOCK_INTERVIEW";
      }
      filteredChats = filteredChats.filter((chat) => chat.chat_type === type);
    }

    this.setState({
      isChatsLoaded: true,
      chats: filteredChats,
    });
  };

  handleIndustryChange = async (event) => {
    await this.setState({ industry: event.target.value });
    this.filterChats();
  };

  handleChatTypeChange = async (event) => {
    await this.setState({ chatType: event.target.value });
    this.filterChats();
  };

  componentDidMount() {
    this.fetchChats();
  }

  render() {
    const classes = this.props.classes;
    return (
      <div>
        <div className={classes.mainPage}>
          <h1 className={classes.coffeeChat}>Available Coffee Chats</h1>

          <Grid
            container
            item
            xs={12}
            sm={12}
            md={12}
            spacing={1}
            alignItems="center"
            justify="center"
          >
            <Grid item xs={12}>
              <h1 className={classes.filterText}>Filter by</h1>
            </Grid>
            <Grid container item xs={12} className={classes.filter}>
              <Grid item xs={4} className={classes.filterOption}>
                <TextField
                  id="outlined-select-education"
                  fullWidth
                  select
                  label="Industry"
                  value={this.state.industry}
                  onChange={this.handleIndustryChange}
                  variant="outlined"
                >
                  {IndustryLabels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4} className={classes.filterOption}>
                <TextField
                  id="outlined-select-education"
                  fullWidth
                  select
                  label="Type"
                  value={this.state.chatType}
                  onChange={this.handleChatTypeChange}
                  variant="outlined"
                >
                  {ChatTypeLabels.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            container
            item
            xs={12}
            spacing={1}
            alignItems="center"
            justify="flex-start"
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
                    md={6}
                    lg={4}
                    spacing={1}
                    alignItems="center"
                    justify="flex-start"
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
                  justify="flex-start"
                >
                  <EmptyCard type={CardTypes.coffeeChat} />
                </Grid>
              )
            ) : (
              <Skeleton variant="rect" className={classes.cardCoffeeLoader} />
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

CoffeeChats = withMyHook(CoffeeChats);
CoffeeChats = withRouter(CoffeeChats);
export default CoffeeChats;

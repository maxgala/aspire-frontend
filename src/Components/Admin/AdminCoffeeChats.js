import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { httpGet, httpPut } from "../../lib/dataAccess";
import MaterialTable from "material-table";
import { forwardRef } from "react";

import { AddBox, ArrowUpward } from "@material-ui/icons";

import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import AddIcon from '@material-ui/icons/Add';import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import Moment from "react-moment";
import CreateCoffeeChatCard from "./../Dashboard/Cards/CreateCoffeeChatCard";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowUpward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const useStyles = makeStyles((theme) => ({
  home_page: {
    paddingLeft: "5%",
    paddingRight: "5%",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "90vh",
    marginLeft: "20px",
  },
  booking_history: {
    fontFamily: "PT Sans",
    fontSize: "20px",
    textAlign: "left",
    color: "#58595b",
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "0px",
  },
  section_title: {
    width: "100%",
    fontFamily: "PT Sans",
    fontSize: "15px",
    margin: "5px",
    marginBottom: "10px",
    marginTop: "15px",
    textAlign: "left",
    color: "black",
  },
  example: {
    width: "1000px",
    height: "100px",
  },
  body: {
    fontSize: 14,
  },
  table: {
    minWidth: 700,
  },
  CoffeeChatTable: {
    padding: "8px",
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
      coffeeChats: [],
      modalOpen: true,
      columns: [
        { title: "Senior Exec", field: "seniorExec" },
        { title: "Status", field: "coffeeChat_status" },
        { title: "Type", field: "type" },
        { title: "Description", field: "description" },
        { title: "Tags", field: "tags" },
        {
          title: "Created",
          field: "created_on",
          defaultSort: "desc",
          render: (rowData) => {
            // Format unix Timestamp to date time
            return <Moment unix>{rowData.created_on}</Moment>;
          },
        },
        { title: "Applications", field: "applicantCount" },
      ],
    };
  }

  fetchCoffeeChats = async () => {
    const existingCoffeeChatsData = await httpGet(
      "coffeeChats",
      localStorage.getItem("idToken")
    );
    if(existingCoffeeChatsData.data.coffeeChats !== undefined){

      // Go through every coffeeChat and derive the # of applicants to fill in table
      Object.keys(existingCoffeeChatsData.data.coffeeChats).forEach(function (coffeeChatID) {
        let currentCoffeeChat = existingCoffeeChatsData.data.coffeeChats[coffeeChatID];

        currentCoffeeChat.applicantCount = currentCoffeeChat.coffeeChat_applications.length;
      });

      this.setState({
        coffeeChats: existingCoffeeChatsData.data.coffeeChats,
      });
  
    }
  };

  /**
   * This function will set the status of a coffeeChat to rejected
   * @param {int} coffeeChatID the ID of the coffeeChat to have it's status set to rejected
   */
  removeCoffeeChat = async (coffeeChatID) => {
    let removedCoffeeChat = {
      coffeeChat_status: "REJECTED",
    };
    await httpPut(`coffeeChats/${coffeeChatID}`, localStorage.getItem("idToken"), removedCoffeeChat);
    this.fetchCoffeeChats();
  };

  /**
   * This function will set the status of a coffeeChat to active
   * @param {int} coffeeChatID the ID of the coffeeChat to have it's status set to active
   */
  approveCoffeeChat = async (coffeeChatID) => {
    let approvedCoffeeChat = {
      coffeeChat_status: "ACTIVE",
    };
    await httpPut(
      `coffeeChats/${coffeeChatID}`,
      localStorage.getItem("idToken"),
      approvedCoffeeChat
    );
    this.fetchCoffeeChats();
  };

  componentDidMount() {
    this.fetchCoffeeChats();
  }


  render() {
    // Use Moment library to format timestamp returned from API.
    Moment.globalFormat = "MMM DD, YYYY";

    // These are the actions on the left of every column in the table.
    const actions = [
      {
        icon: () => <Check />,
        tooltip: "Approve CoffeeChat Posting",
        onClick: (event, rowData) => {
          new Promise((resolve, reject) => {
            // Send PUT request to set coffeeChat status to Active.
            this.approveCoffeeChat(rowData.coffeeChat_id);

            resolve();
          });
        },
      },
      {
        icon: () => <DeleteOutline />,
        tooltip: "Remove CoffeeChat Posting",
        onClick: (event, rowData) => {
          new Promise((resolve, reject) => {
            // Send PUT request to set coffeeChat status to Rejected.
            this.removeCoffeeChat(rowData.coffeeChat_id);

            resolve();
          });
        },
      },
      {
        icon: () => <AddIcon />,
        tooltip: "Add Coffee Chat",
        isFreeAction:true,
        onClick: (event) => {
            console.log("Test");
            this.setState({
              modalOpen: true
            });

            console.log(this.state)
            // Send PUT request to set coffeeChat status to Rejected.
            // this.removeCoffeeChat(rowData.coffeeChat_id);

        },
      },

    ];
    return (
      <div>
      <CreateCoffeeChatCard open={this.modalOpen}/>

      <MaterialTable
        title="Global Coffee Chat Postings"
        actions={actions}
        columns={this.state.columns}
        icons={tableIcons}
        data={this.state.coffeeChats}
        options={{
          paging: true,
          pageSize: 15,
          emptyRowsWhenPaging: true,
          pageSizeOptions: [5, 10, 15, 30, 50],
          exportButton: true,
          exportTrue: true,
        }}
      />

      </div>
    );
  }
}

CoffeeChats = withMyHook(CoffeeChats);
export default CoffeeChats;

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
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";

import Moment from "react-moment";
import CreateCoffeeChatCard from "./../Dashboard/Cards/CreateCoffeeChatCard";
import RefreshIcon from "@material-ui/icons/Refresh";
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
        { title: "Senior Exec", field: "senior_executive" },
        { title: "Status", field: "chat_status" },
        { title: "Type", field: "chat_type" },
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
      ],
    };
  }

  fetchCoffeeChats = async () => {
    const existingCoffeeChatsData = await httpGet(
      "chats",
      localStorage.getItem("idToken")
    );

    let coffeeChatsData = [];
    if (existingCoffeeChatsData.data.chats !== undefined) {
      Object.keys(existingCoffeeChatsData.data.chats).forEach(function (
        coffeeChatID
      ) {
        let currentCoffeeChat =
          existingCoffeeChatsData.data.chats[coffeeChatID];

        coffeeChatsData.push(currentCoffeeChat);
      });

      this.setState({
        coffeeChats: coffeeChatsData,
      });
    }
  };

  /**
   * This function will set the status of a coffeeChat to rejected
   * @param {int} coffeeChatID the ID of the coffeeChat to have its status set to rejected
   */
  removeCoffeeChat = async (coffeeChatID) => {
    await httpPut(
      `chats/${coffeeChatID}/CANCELLED`,
      localStorage.getItem("idToken")
    );
    // this.fetchCoffeeChats();
  };

  /**
   * This function will set the approve a chat if the status is RESERVED_CONFIRMED
   * @param {int} coffeeChatID the ID of the coffeeChat to have its status set to approved
   */
  approveCoffeeChat = async (coffeeChatID, coffeeChatStatus) => {
    if (coffeeChatStatus === "RESERVE_CONFIRMED") {
      await httpPut(
        `chats/${coffeeChatID}/DONE`,
        localStorage.getItem("idToken")
      );
      // this.fetchCoffeeChats();
    } else {
      alert(
        "Only Coffee Chat's with the RESERVED_CONFIRMED status may be approved from the Admin Dashboard"
      );
    }
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
            this.approveCoffeeChat(rowData.chat_id);

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
            this.removeCoffeeChat(rowData.chat_id);

            resolve();
          });
        },
      },
      {
        icon: () => <RefreshIcon />,
        tooltip: "Update Coffee Chats displayed below",
        onClick: (event, rowData) => {
          new Promise((resolve, reject) => {
            // To save on expensive and large lambda GET calls, admin's manually fetch for new requests.
            this.fetchCoffeeChats();
          });
        },
        isFreeAction: true,
      },
    ];

    return (
      <div>
        <CreateCoffeeChatCard />

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

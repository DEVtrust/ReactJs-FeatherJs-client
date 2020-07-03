import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { withStyles } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";
import { AutoSizer, Column, Table, InfiniteLoader, defaultTableRowRenderer } from "react-virtualized";
import SearchArea from "./components/search";
import { clearRecords, setSelected , setAllSelected, loadEvents } from "../../store/actions/event";
import Checkbox from "@material-ui/core/Checkbox";
import Drawer from "@material-ui/core/Drawer";
import InfoComponnet from "./components/info";
import CircularProgress from "@material-ui/core/CircularProgress";
import UnAuthModel from "../UnAuthModal/index";
import moment from "moment";

const styles = (theme) => ({
  flexContainer: {
    display: "flex",
    alignItems: "center",
    boxSizing: "border-box",
  },
  table: {
    // temporary right-to-left patch, waiting for
    // https://github.com/bvaughn/react-virtualized/issues/454
    "& .ReactVirtualized__Table__headerRow": {
      flip: false,
      paddingRight: theme.direction === "rtl" ? "0 !important" : undefined,
    },
  },
  tableRow: {
    cursor: "pointer",
  },
  tableRowHover: {
    "&:hover": {
      backgroundColor: theme.palette.grey[200],
    },
  },
  tableCell: {
    flex: 1,
  },
  noClick: {
    cursor: "initial",
  },
  headerView: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    cursor: "pointer"
  },
  center: {
    display: "block",
    width: "100%",
    textAlign: "center"
  },
  scrollX: {
    overflowX: "auto"
  },
  mainContainer: {
    height: 800,
    width: "100%" 
  },
  drawerWidth: {
    width: 300
  }
});
///
/// Table UI component
///
class MuiVirtualizedTable extends React.PureComponent {
  static defaultProps = {
    headerHeight: 48,
    rowHeight: 48,
  };
  constructor(props) {
    super(props);
    this.exampleRef = React.createRef();
  }

  getRowClassName = ({ index }) => {
    const { classes, onRowClick } = this.props;

    return clsx(classes.tableRow, classes.flexContainer, {
      [classes.tableRowHover]: index !== -1 && onRowClick != null,
    });
  };

  cellRenderer = (propsData) => {
    const { cellData, columnIndex, rowData } = propsData;
    const { columns, classes, onRowClick } = this.props;
    
    let flag = false;
    if(rowData && rowData.isSelected != null) {
      flag = rowData.isSelected;
    }
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, {
          [classes.noClick]: onRowClick == null,
        })}
        variant="body"
        style={{ height: "auto" }}
        align={(columnIndex != null && columns[columnIndex].numeric) || false ? "right" : "left"}
      >
        {
          (columns[columnIndex].dataKey === "event_id") ? 
          (
            <div>
              <Checkbox
                value={flag}
                checked={flag}
                onClick={(e) => {
                  e.stopPropagation();
                  this.props.onCheckboxClick({id: cellData, flag: e.target.checked});
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </div>
          )
          : 
          <div>{(columns[columnIndex].dataKey === "derived_tstamp") ? moment(cellData).format("MM/DD/YYYY hh:mm A") : (cellData ? cellData : "-")}</div>
        }
      </TableCell>
    );
  };

  headerRenderer = ({ label, columnIndex }) => {
    const { headerHeight, columns, classes, hideColumn, onHeaderCellClick } = this.props;
    return (
      <TableCell
        component="div"
        className={clsx(classes.tableCell, classes.flexContainer, classes.noClick)}
        variant="head"
        style={{ height: headerHeight, minWidth: "100" }}
        align={columns[columnIndex].numeric || false ? "right" : "left"}
        onClick={() => columnIndex === 0 ? null : onHeaderCellClick(columns[columnIndex])}
      >
        <div className={classes.headerView}>
          {
            columnIndex === 0 ? 
            <span style={{display:"block"}}>
              <Checkbox
                onClick={(e) => {
                  this.props.onHeaderCheckboxClick(e.target.checked);
                }}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            </span>
          :
          <div>
            {
              columns[columnIndex].sorting ? <span className="material-icons" style={{fontSize: 15}}>
              { columns[columnIndex].sortType === "asc" ? "arrow_downward": "arrow_upward"}
              </span> : ""
            }
            {label}
          </div>
          }
          {
            columnIndex === 0 ? "" : <span onClick={() => hideColumn(columns[columnIndex])} style={{fontSize: 15}} className="material-icons">
            visibility_off
            </span>
          }
        </div>
      </TableCell>
    );
  };

  rowRenderer = props => {
    return defaultTableRowRenderer(props);
  };

  render() {
    const { classes, columns, rowHeight, headerHeight, onRawClick, ...tableProps } = this.props;
    
    return (
      <div className={classes.scrollX}>
        <UnAuthModel />
        <div style={{ height: (700-120), minWidth: 756 }}>
          <AutoSizer>
            {({ width }) => (
              <Table
                noRowsRenderer={() => {
                  return this.props.isLoading ? 
                  <div className={classes.center}><CircularProgress /></div>  : 
                  <span className={classes.center}> No records found </span> ;
                }}
                height={700-120}
                width={width}
                rowHeight={rowHeight}
                gridStyle={{
                  direction: "inherit",
                }}
                onRowClick={(data)=> {
                  onRawClick(data);
                }}
                onColumnClick={()=>{
                  
                }}
                headerHeight={headerHeight}
                className={classes.table}
                {...tableProps}
                rowClassName={this.getRowClassName}
                rowRenderer={this.rowRenderer}
              >
                {columns.map(({ dataKey, ...other }, index) => {
                  if(columns[index].isHidden)  {
                    return null;
                  }
                  return (
                    <Column
                      key={dataKey}
                      headerRenderer={(headerProps) =>
                        this.headerRenderer({
                          ...headerProps,
                          columnIndex: index,
                        })
                      }
                      className={classes.flexContainer}
                      cellRenderer={this.cellRenderer}
                      dataKey={dataKey}
                      {...other}
                    />
                  );
                })}
              </Table>
            )}
          </AutoSizer>
        </div>
      </div>
    );
  }
}

MuiVirtualizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      dataKey: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      numeric: PropTypes.bool,
      width: PropTypes.number.isRequired,
      isHidden: PropTypes.bool,
      sorting: PropTypes.bool,
      sortType: PropTypes.string
    }),
  ).isRequired,
  headerHeight: PropTypes.number,
  onRowClick: PropTypes.func,
  rowHeight: PropTypes.number,
  onCheckboxClick: PropTypes.func,
  onHeaderCellClick: PropTypes.func,
  onRawClick: PropTypes.func,
  onHeaderCheckboxClick: PropTypes.func,
  isLoading: PropTypes.bool,
  hideColumn: PropTypes.any,

};

const VirtualizedTable = withStyles(styles)(MuiVirtualizedTable);


///
/// Infinite scroll with table.
///
class ReactVirtualizedTable extends React.PureComponent {
    
    static get propTypes() {
      return {
        events: PropTypes.array,
        dispatch: PropTypes.func,
        hasMoreData: PropTypes.bool,
        isLoading: PropTypes.bool,
        classes: PropTypes.object,
      };
    }

    constructor(props) {
      super(props);
      this.state = {
        isOpen: false,
        page: 1,
        limit: 20,
        searchText: "",
        startDate: "",
        endDate: "",
        sortKey: "",
        sortType: "",
        selectedRaw: null,
        columns:[
            {
              width: 100,
              label: "Action",
              dataKey: "event_id",
              sorting: false,
              isAllowedHide: false
          },
          {
              width: 270,
              label: "Time",
              dataKey: "derived_tstamp",
              sorting: false,
              sortBy: "asc",
              isHidden: false,
              isAllowedHide: true
          },
          {
              width: 200,
              label: "Url",
              dataKey: "page_url",
              sorting: false,
              isAllowedHide: true
          },
          {
              width: 200,
              label: "Category",
              dataKey: "se_category",
              sorting: false,
              isAllowedHide: true
          },
          {
              width: 200,
              label: "Action",
              dataKey: "se_action",
              sorting: false,
              isAllowedHide: true
          },
          {
              width: 200,
              label: "Property",
              dataKey: "se_property",
              sorting: false,
              isAllowedHide: true
          },
          {
            width: 200,
            label: "Value",
            dataKey: "se_value",
            sorting: false,
            isAllowedHide: true
        },
        ]
      };
    }

    componentDidMount(){
      this.loadData();
    }

    isRowLoaded = ({index}) => {
      const { events } = this.props;
      return !!events[index];
    }

    loadData = () => {
      const { page, limit, searchText, sortBy, sortType, startDate, endDate } = this.state;
      this.props.dispatch(loadEvents({
        page,
        limit,
        text: searchText,
        sortType,
        sortKey: sortBy,
        startDate, 
        endDate
      }));
      this.setState({
        page: page+1
      });
    }

    loadMoreRows = () => {
      if(this.props.hasMoreData && !this.props.isLoading) {
        this.loadData(); 
      }
      return new Promise(resolve => {
          resolve();
      });
    }

    resetAndSearch = () => {
        this.setState({
          ...this.state,
          page: 1,
          limit: 20,
        }, () => {
          this.props.dispatch(clearRecords());
          this.loadData();
        });
    }

    onTextChange = ({text, startDate, endDate}) => {
      
      this.setState({
        ...this.state,
        searchText: text,
        startDate,
        endDate
      }, () => {
        this.resetAndSearch();
      });
    }

    onCellClick = (data) => {
      
      const { columns } = this.state;
      const index = columns.findIndex((x) => x.dataKey === data.dataKey);
      
      let sortType = this.state.sortType === "asc" ? "desc" : "asc";

      columns[index].sorting = true;
      columns[index].sortType = sortType;
      let i  = 0;
      for(i in columns) {
        if(index === i) {
          continue;
        } else {
          columns[i].sorting = false;
          columns[i].sortType = "";
        }    
      }

      this.setState({
        ...this.state,
        sortBy: data.dataKey,
        sortType,
        columns
      }, () => {
        this.resetAndSearch();
      });
    }

    toggelDrawer = () => {
      const { isOpen } = this.state;
      this.setState({
        ...this.state,
        isOpen: !isOpen
      });
    }

    onSelectChange = (value) => {
      
      const { columns } = this.state;
      /* eslint-disable no-unused-vars */
      for(let i in columns) {
        columns[i].isHidden = false;
      }
      /* eslint-disable no-unused-vars */
      for(let i in value) {
        const index = columns.findIndex((x) => x.dataKey === value[i]);
        
        if(index > -1) {
          columns[index].isHidden = true;
        } else {
          columns[index].isHidden = false;
        }
      }
      this.setState({
        ...this.state,
        columns: [...columns]
      });
    }

    resetFilter = () => {
      this.setState({
        ...this.state,
        sortBy: "",
        sortType: "",
        page: 1,
        searchText: "",
        endDate: "",
        startDate: ""
      }, () => {
        this.resetAndSearch();
      });
    }

    render() {
      const { events, isLoading, classes } = this.props;
      const { columns, page } = this.state;
      const selectedColumn = [];
      const allowedFileters = columns.filter((x) => x.isAllowedHide);
      const visibleColumns = [];

      for(let i in columns) {
        if(!columns[i].isHidden) {
          visibleColumns.push(columns[i]);
        }
      }

      for(let i in allowedFileters) {
        if(allowedFileters[i].isHidden) {
          selectedColumn.push(allowedFileters[i].dataKey);
        }
      }
      
      return (
        <Paper className={classes.mainContainer}>
          <Drawer 
            anchor={"right"} 
            open={this.state.isOpen} 
            onClose={()=> {
              this.setState({
                ...this.state,
                isOpen: false
              });
            }
          }>
            <div className={classes.drawerWidth}>
              <InfoComponnet 
                info={this.state.selectedRaw}
                closeDrawer={() => {
                  this.setState({
                    ...this.state,
                    isOpen: false
                  });
                }}
              />
            </div>
          </Drawer>
         
            <div>
              <SearchArea 
                change={this.onTextChange}
                value={this.state.searchText}
                onSelectChange={this.onSelectChange}
                allowedFileters={allowedFileters}
                selectedColumn={selectedColumn}
                resetFilter={this.resetFilter}
              />
            </div>
            
            <InfiniteLoader
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={2000}
            >
            {({ onRowsRendered, registerChild }) => (
                <VirtualizedTable
                    ref={registerChild}
                    isLoading={isLoading}
                    onRowsRendered={onRowsRendered}
                    rowCount={events.length}
                    onCheckboxClick={(data) => {
                      this.props.dispatch(setSelected(data));
                    }}
                    onHeaderCheckboxClick={(flag) => {
                      this.props.dispatch(setAllSelected(flag));
                    }}
                    onRawClick={(data) => {
                      this.setState({
                        ...this.state,
                        isOpen: true,
                        selectedRaw: data.rowData
                      });
                    }}
                    onHeaderCellClick={this.onCellClick}
                    hideColumn={(data)=> {
                      const index = columns.findIndex((x) => x.dataKey === data.dataKey);
                      const items = [...columns];
                      items[index].isHidden = true;
                      if(index > -1) { 
                        this.setState({
                          ...this.state,
                          columns: items
                        });
                      }
                    }}
                    rowGetter={({ index }) => events[index]}
                    columns={visibleColumns}
                />
            )}
          </InfiniteLoader>
          <div className={classes.center}>
            {(isLoading  && (page > 2)) ? <CircularProgress /> : ""}
          </div>
        </Paper>
      );
    }
}

export default withStyles(styles)(ReactVirtualizedTable);
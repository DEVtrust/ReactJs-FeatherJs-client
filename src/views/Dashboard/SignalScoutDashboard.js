import React from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// react plugin for creating vector maps
import { VectorMap } from "react-jvectormap";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
// import Icon from "@material-ui/core/Icon";

// @material-ui/icons
// import ContentCopy from "@material-ui/icons/ContentCopy";
// import Store from "@material-ui/icons/Store";
// import InfoOutline from "@material-ui/icons/InfoOutline";
import Warning from "@material-ui/icons/Warning";
/*import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";*/
import ArrowUpward from "@material-ui/icons/ArrowUpward";
// import AccessTime from "@material-ui/icons/AccessTime";
import Refresh from "@material-ui/icons/Refresh";
import Edit from "@material-ui/icons/Edit";
// import Place from "@material-ui/icons/Place";
import ArtTrack from "@material-ui/icons/ArtTrack";
// import Language from "@material-ui/icons/Language";
import VisibilityIcon from "@material-ui/icons/Visibility";
import StorageIcon from "@material-ui/icons/Storage";
import AddIcon from "@material-ui/icons/Add";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LanguageIcon from "@material-ui/icons/Language";
import AndroidIcon from "@material-ui/icons/Android";
import PhoneIphoneIcon from "@material-ui/icons/PhoneIphone";
import ExploreIcon from "@material-ui/icons/Explore";
// import CheckIcon from "@material-ui/icons/Check";
import CodeIcon from "@material-ui/icons/Code";
import PersonIcon from "@material-ui/icons/Person";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
// import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart,
} from "variables/charts";

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";

/*
import priceImage1 from "assets/img/card-2.jpeg";
import priceImage2 from "assets/img/card-3.jpeg";
import priceImage3 from "assets/img/card-1.jpeg";
*/

import biWalkThrough1 from "assets/img/biWalkThrough1.png";
import biWalkThrough2 from "assets/img/biWalkThrough2.jpg";
import christina from "assets/img/christina.jpg";

const us_flag = require("assets/img/flags/US.png");
const de_flag = require("assets/img/flags/DE.png");
const au_flag = require("assets/img/flags/AU.png");
const gb_flag = require("assets/img/flags/GB.png");
const ro_flag = require("assets/img/flags/RO.png");
const br_flag = require("assets/img/flags/BR.png");

var mapData = {
  AU: 760,
  BR: 550,
  CA: 120,
  DE: 1300,
  FR: 540,
  GB: 690,
  GE: 200,
  IN: 200,
  RO: 600,
  RU: 300,
  US: 2920,
};

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Warning />
              </CardIcon>
              <p className={classes.cardCategory}>Scouts Needing Input</p>
              <h3 className={classes.cardTitle}>1</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Warning />A scout needs your input
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <StorageIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Events Used This Month</p>
              <h3 className={classes.cardTitle}>345K/1M</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AddIcon />
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more events
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <VisibilityIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Active Scouts</p>
              <h3 className={classes.cardTitle}>1/1</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <AddIcon />
                Get More Scouts
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={6} lg={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <FavoriteIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Signals & Predictions</p>
              <h3 className={classes.cardTitle}>2 & 1</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <ExploreIcon />
                Explore
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <StorageIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Event Volume by App
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={12}>
                  <Table
                    tableData={[
                      [<LanguageIcon key="1"/>, "www.yourco.com", "20,920", "53.23%"],
                      [<AndroidIcon key="2" />, "YourCo Android", "10,300", "20.43%"],
                      [<PhoneIphoneIcon key="3"/>, "YourCo iPhone", "7600", "10.35%"],
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12}>
          <Card>
            <CardHeader color="success" icon>
              <CardIcon color="success">
                <StorageIcon />
              </CardIcon>
              <h4 className={classes.cardIconTitle}>
                Event Volume by Top Locations
              </h4>
            </CardHeader>
            <CardBody>
              <GridContainer justify="space-between">
                <GridItem xs={12} sm={12} md={5}>
                  <Table
                    tableData={[
                      [
                        <img src={us_flag} alt="us_flag" key={"flag"} />,
                        "USA",
                        "2,920",
                        "53.23%",
                      ],
                      [
                        <img src={de_flag} alt="us_flag" key={"flag"} />,
                        "Germany",
                        "1,300",
                        "20.43%",
                      ],
                      [
                        <img src={au_flag} alt="us_flag" key={"flag"} />,
                        "Australia",
                        "760",
                        "10.35%",
                      ],
                      [
                        <img src={gb_flag} alt="us_flag" key={"flag"} />,
                        "United Kingdom",
                        "690",
                        "7.87%",
                      ],
                      [
                        <img src={ro_flag} alt="us_flag" key={"flag"} />,
                        "Romania",
                        "600",
                        "5.94%",
                      ],
                      [
                        <img src={br_flag} alt="us_flag" key={"flag"} />,
                        "Brasil",
                        "550",
                        "4.34%",
                      ],
                    ]}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <VectorMap
                    map={"world_mill"}
                    backgroundColor="transparent"
                    zoomOnScroll={false}
                    containerStyle={{
                      width: "100%",
                      height: "280px",
                    }}
                    containerClassName="map"
                    regionStyle={{
                      initial: {
                        fill: "#e4e4e4",
                        "fill-opacity": 0.9,
                        stroke: "none",
                        "stroke-width": 0,
                        "stroke-opacity": 0,
                      },
                    }}
                    series={{
                      regions: [
                        {
                          values: mapData,
                          scale: ["#AAAAAA", "#444444"],
                          normalizeFunction: "polynomial",
                        },
                      ],
                    }}
                  />
                </GridItem>
              </GridContainer>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="info" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Scout Activity</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 12
                </span>{" "}
                average per day
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <ExploreIcon /> Explore Scouts
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="warning" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Events Total by Month</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <ExploreIcon /> Explore events
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart className={classes.cardHover}>
            <CardHeader color="danger" className={classes.cardHeaderHover}>
              <ChartistGraph
                className="ct-chart-white-colors"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="Refresh"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button simple color="info" justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Change Date"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardTitle}>Signals Discovered</h4>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <ExploreIcon /> Explore Signals
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <h3>Discover More</h3>
      <br />
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={christina} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Creating a Scout, 101
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Cristina demonstrates how to use a Scout to find what influences a particular conversion event.
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                 <VideoLibraryIcon color="info"/>
                Screencast video, 5 minute read
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <PersonIcon /> Cristina, VanScoutski
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={biWalkThrough2} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Deploy a scout to your code base for realtime predictions
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
                Pat, a senior member of our data developer team, walks you through
                deploying a Scout into your website for realtime inferencing or
                prediction
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <CodeIcon color="info"/>
                 Javascript Included, 8 minute read
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <PersonIcon /> Pat, Developino
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card product className={classes.cardHover}>
            <CardHeader image className={classes.cardHeaderHover}>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={biWalkThrough1} alt="..." />
              </a>
            </CardHeader>
            <CardBody>
              <div className={classes.cardHoverUnder}>
                <Tooltip
                  id="tooltip-top"
                  title="View"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="transparent" simple justIcon>
                    <ArtTrack className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Edit"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="success" simple justIcon>
                    <Refresh className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
                <Tooltip
                  id="tooltip-top"
                  title="Remove"
                  placement="bottom"
                  classes={{ tooltip: classes.tooltip }}
                >
                  <Button color="danger" simple justIcon>
                    <Edit className={classes.underChartIcons} />
                  </Button>
                </Tooltip>
              </div>
              <h4 className={classes.cardProductTitle}>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Explore User Click Streams With Tableau
                </a>
              </h4>
              <p className={classes.cardProductDesciprion}>
               In this article, Joe walks you through working with a user&apsos;s click stream using SignalScout with SQL and Tableau
              </p>
            </CardBody>
            <CardFooter product>
              <div className={classes.price}>
                <CodeIcon color="info"/>
                 SQL Included, 10 minute read
              </div>
              <div className={`${classes.stats} ${classes.productStats}`}>
                <PersonIcon /> Joe, McData
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}

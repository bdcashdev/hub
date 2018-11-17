// Inputs:  progress Object
// Outputs: None

import React, { Component } from 'react';

//import material-ui components
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import CheckIcon from '@material-ui/icons/Check';
import SaveIcon from '@material-ui/icons/Save';

// import style
import injectSheet from 'react-jss';
import proposalProgressStyle from './proposalProgress.style';

// import project assets
const docIcon = require('../../../assets/img/png_stats_propposal_votes.png');

class ProposalProgress extends Component {
  state = {
    progress : 0,
    totalNodes: 0,
    totalVotes: 0,
    status: ''
  }

  componentWillMount(){
    this.prepareData();
  }
  
  prepareData() {
    const { progressObj } = this.props;
    const { totalNodes, totalVotes, passingPercentage, funded } = progressObj;
    const progress = Math.floor(totalVotes / totalNodes * 100);
    let status = progress >= passingPercentage ? 'passing' : 'unfunded';
    if (funded ) { status = 'funded' } ;
    this.setState({
      totalNodes,
      totalVotes,
      progress,
      passingPercentage,
      status
    });
  }

  render() {
    const { classes} = this.props;
    const { progress, totalNodes, totalVotes, status } = this.state;
    return (
      <div className={classes.root}>
        <div className="proposalProgressWrapper">
          <Button
            variant="fab"
            color="primary"
            className={`proposalProgressButton ${status}`}
            onClick={this.handleButtonClick}
            >
            <div className="proposalProgressInner">
              {/* <img alt="a" src={docIcon} className="proposalProgressIcon" /> */}
              <div className="proposalProgressPercentage">{`${progress}%`}</div>
              <div className="proposalProgressStatus">{`${status.toUpperCase()}`}</div>
            </div>
          </Button>
          <CircularProgress
            className={`proposalProgress ${status}`}
            variant="static"
            size={100}
            thickness={5}
            value={progress}
          />
        </div>
        <div className={`proposalProgressInfo ${status}`}>
          {`${totalVotes} / ${totalNodes}`}
        </div>
      </div>
    );
  }
}


export default injectSheet(proposalProgressStyle)(ProposalProgress);
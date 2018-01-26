import React, { Component } from 'react';

import { connect } from 'react-redux';
import actions from '../../redux/actions';
import { withStyles } from 'material-ui';
import NewProposalStyle from './styles/newProposalStyle'
//import for text editor
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
// import components
import { Editor } from 'react-draft-wysiwyg';
import '../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Row, Col, Card } from 'antd';
import { Form, Icon, Input, Button, InputNumber } from 'antd';
import Stepper, { Step, StepLabel, StepContent } from 'material-ui/Stepper';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
//import style

const FormItem = Form.Item;






class NewProposal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activeStep: 0,
      showEditor: true,
      proposalTitle: '',
      paymentQuantity: 0,
      address: '',
      amount: '',
      stepperSubHeading: '',
      editorState: EditorState.createEmpty(),
      proposal__detail: ''
    };


    this.getStepContent = this.getStepContent.bind(this);
    this.getSteps = this.getSteps.bind(this)
    this.proposalTitle = this.proposalTitle.bind(this)
    this.onDateChange = this.onDateChange.bind(this);
    this.paymentQuantity = this.paymentQuantity.bind(this);
    this.getAddress = this.getAddress.bind(this)
    this.getAmount = this.getAmount.bind(this)
    this.onEditorStateChange = this.onEditorStateChange.bind(this)

  }

  handleNext = () => {
    this.setState({
      activeStep: this.state.activeStep + 1,
    });
    console.log(this.state.proposalTitle, 'proposalTitle')
    console.log(this.state.address, "address")
    console.log(this.state.amount, "amount")
    console.log(this.state.paymentQuantity, "parment quantity")

  };

  handleBack = () => {
    this.setState({
      activeStep: this.state.activeStep - 1,
      proposal__detail: this.state.proposal__detail
    }, () => {
      if (this.state.activeStep == 1 || this.state.activeStep == 0) {
        this.previewHTML()
      }

    });
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  //date change function
  onDateChange(date, dateString) {
    console.log(date, dateString);
  }

  //proposal title function
  proposalTitle(e) {
    this.setState({
      proposalTitle: e.target.value
    })
  }

  //payment quantity
  paymentQuantity(value) {
    this.setState({
      paymentQuantity: value
    })

  }

  //get address function
  getAddress(e) {
    this.setState({
      address: e.target.value
    })
  }

  //get amount function
  getAmount(e) {
    this.setState({
      amount: e.target.value
    })
  }

  //
  previewHTML() {

    this.setState({ showEditor: false, proposal__detail: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())) }, () => {
      let previewContainer = document.getElementById('preview-html-container');
      previewContainer.innerHTML = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
      console.log('----------------------')
    })
  }

  confirmProposalDetail() {
    this.previewHTML();
  }

  // steps name in array in which we map
  getSteps() {
    return ['Proposal Title', 'Proposal Details', 'Payment Details', 'Amount', 'Create Proposal'];
  }
  //all the step contents are coming from return of switch case
  getStepContent(step) {
    switch (step) {
      case 0:
        return ( //Proposal Title Row
          <Row className="proposal-title-row">
            {/* Proposal Title Colomn */}
            <Col span={10}>
              {/* proposal title input field */}
              <Form>
                <FormItem className='form-item'>
                  <Input placeholder="Insert Reference Title" value={this.state.proposalTitle} onChange={this.proposalTitle} />
                </FormItem>
              </Form>
            </Col>
            {/* Proposal Description Url Colomn */}
            <Col span={14}>
              <span className="proposal-description-url">http://www.syshub.com/p/proposal-title</span>
            </Col>

          </Row>);
      case 1:
        return (
          // Proposal Detail Row
          <Row className="proposal-details-row">
            {/* Proposal Detail Colomn */}
            <Col span={20}>
              {/* {this.state.showEditor ?

                <Button className='preview-edit-button' onClick={this.previewHTML.bind(this)}>PREVIEW</Button>
                :
                <Button className='preview-edit-button' onClick={() => { this.setState({ showEditor: true }) }}>EDITOR</Button>

              } */}
              {this.state.showEditor ? <div>
                <h2 className="editor-title">Write proposal details</h2>
                {/* proposal detail editor */}
                <Editor
                  editorState={this.state.editorState}
                  onEditorStateChange={this.onEditorStateChange}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="proposalEditor-wrapper"
                  editorClassName="proposal-editor"
                  toolbar={{
                    options: ['inline', 'list'],
                    inline: {
                      options: ['bold', 'italic', 'underline', 'monospace'],
                      list: {
                        options: ['unordered', 'ordered'],
                      },
                    },
                  }} />
                <Button className='confirm-button' onClick={this.confirmProposalDetail.bind(this)}>Confirm</Button>

              </div>
                :
                // proposal detail preview
                <Row>
                  <Col span={22} offset={1}>
                    <h1 className='proposalDetail-title'>Proposal Title</h1>
                  </Col>
                  <Col span={22}>
                    <div className="proposalContent-div" id="preview-html-container">
                    </div>
                  </Col>
                </Row>
              }
            </Col>
          </Row>
        )
      case 2:
        return (
          <Row className='paymentDetail-row'>
            <Col span={9}>
              <label className='label'>Date</label>
              <DatePicker onChange={this.onDateChange} />
            </Col>
            <Col span={7}>
              <label># of Payments</label>
              <InputNumber min={1} max={50} defaultValue={3} value={this.state.paymentQuantity} onChange={this.paymentQuantity} />
            </Col>
            <Col span={8}>
              <label>Address</label>
              <Input type='text' placeholder="input addresss" value={this.state.address} onChange={this.getAddress} />
            </Col>
          </Row>
        )
      case 3:
        return <Row className='amount-row'>
          <Col span={4}>
            <Input type='text' placeholder="0" value={this.state.amount} onChange={this.getAmount} />
          </Col>
        </Row>
      default:
        return
        <Button>Confirm</Button>;
    }
  }
  onEditorStateChange(editorState) {
    this.setState({
      editorState,
    });
    console.log(this.state.editorState, "editor state")
  };


  render() {
    const { classes } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;
    console.log(this.state.proposal__detail, "detail")
    return (
      <div className={classes.root}>

        <h1 className='title'>Proposal Configuration</h1>
        <Paper className='paper-container' elevation={4}>

          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((label, index) => {
              return (
                <Step className="steper__container" key={label}>
                  <StepLabel className="steper__label">
                    <h2 className='step-label'> {label} </h2>
                    {this.state.activeStep == 0 && label == "Proposal Title" ? <h3 className="proposal-title">Proposal Discription Url</h3> : null}
                    {this.state.activeStep == 1 && label == "Proposal Details" ?
                      (this.state.showEditor ? <Button className='preview-edit-button' onClick={this.previewHTML.bind(this)}>PREVIEW</Button>
                        : <Button className='preview-edit-button' onClick={() => { this.setState({ showEditor: true }) }}>EDITOR</Button>)
                      : null}
                  </StepLabel>
                  <StepContent>
                    <div>{this.getStepContent(index)}</div>
                    <div className={classes.actionsContainer}>
                      <div className={activeStep === steps.length - 1 ? 'confirm-btn-div' : 'next-btn-div'}>

                        {
                          activeStep === 0 ?
                            null : <Button
                              raised={true}
                              type='primary'
                              onClick={this.handleBack}
                              className={classes.button}
                            >
                              Back
                      </Button>
                        }
                        <Button
                          raised={true}
                          type='primary'
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? 'Confirm' : 'Next Step'}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {/* {activeStep === steps.length && (
            <Paper square elevation={0} className={classes.resetContainer}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button onClick={this.handleReset} className={classes.button}>
                Reset
            </Button>
            </Paper>
          )} */}
        </Paper>
      </div>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(stateToProps, dispatchToProps)(withStyles(NewProposalStyle)(NewProposal))

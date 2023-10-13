import React, { Component } from 'react';
import {
  Typography,
  Grid,
  OutlinedInput,
} from '@material-ui/core';
import { InputNumber, Input } from 'antd';
import Proptypes from 'prop-types'

class NumericInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num1: 0,
      num2: 0,
      num3: 0,
      num4: 0,
      num5: 0,
      num6: 0,
      num7: 0,
      num8: 0,
      num9: 0,
      num10: 0,
      result: 0,
      yearlyElectricityCost: 0,
      yearlyRentCost: 0,
      yearlyServiceCharge: 0,
      yearlyTelephoneRentCost: 0,
      yearlySignageCost: 0,
      boothBuildCost: 0,
    };
    this._changeNum1 = this._changeNum1.bind(this);
    this._changeNum2 = this._changeNum2.bind(this);
    this._changeNum3 = this._changeNum3.bind(this);
    this._changeNum4 = this._changeNum4.bind(this);
    this._changeNum5 = this._changeNum5.bind(this);
    this._changeNum6 = this._changeNum6.bind(this);
    this._changeNum7 = this._changeNum7.bind(this);
    this._changeNum8 = this._changeNum8.bind(this);
    this._changeNum9 = this._changeNum9.bind(this);
    this._changeNum10 = this._changeNum10.bind(this);
  }

  _changeNum1(value) {

      let newNum1 = value;
      this.setState({
        num1: newNum1,
        yearlyRentCost: newNum1,
        result: newNum1 + this.state.num2 + this.state.num3 + this.state.num4 + this.state.num5 + this.state.num6,
      });
      this.props.onChange(this.state)
      console.log(this.props)
  }

  _changeNum2(value) {
    
      let newNum2 = value;
      this.setState({
        num2: newNum2,
        yearlyElectricityCost: newNum2,
        result: this.state.num1 + newNum2 + this.state.num3 + this.state.num4 + this.state.num5 + this.state.num6,
      });
      this.props.onChange(this.state)
  }

  _changeNum3(value) {
    
      let newNum3 = value;
      this.setState({
        num3: newNum3,
        yearlyTelephoneRentCost: newNum3,
        result: this.state.num1 + this.state.num2 + newNum3 + this.state.num4 + this.state.num5 + this.state.num6,
      });
      this.props.onChange(this.state)
  }

  _changeNum4(value) {
      let newNum4 = value;
      this.setState({
        num4: newNum4,
        yearlyServiceCharge:newNum4,
        result: this.state.num1 + this.state.num2 + this.state.num3 + newNum4 + this.state.num5 + this.state.num6,
      });
      this.props.onChange(this.state)
  }

  _changeNum5(value) {
      let newNum5 = value;
      this.setState({
        num5: newNum5,
        boothBuildCost: newNum5,
        result: this.state.num1 + this.state.num2 + this.state.num3 + this.state.num4 + newNum5 + this.state.num6,
      });
      this.props.onChange(this.state)
  }

  _changeNum6(value) {
      let newNum6 = value;
      this.setState({
        num6: newNum6,
        yearlySignageCost: newNum6,
        result: this.state.num1 + this.state.num2 + this.state.num3 + this.state.num4 + this.state.num5 + newNum6,
      });
      this.props.onChange(this.state)
  }

  _changeNum7(value){
    let newNum7 = value;
    console.log(value)
    this.setState({
      num7: newNum7,
    });
    this.props.onChange(this.state)
  }

  _changeNum8(value){
    let newNum8 = value;
    console.log(value)
    this.setState({
      num8: newNum8,
    });
    this.props.onChange(this.state)
  }

  _changeNum9(value){
    let newNum9 = value;
    console.log(value)
    this.setState({
      num9: newNum9,
    });
    this.props.onChange(this.state)
  }

  _changeNum10(value){
    let newNum10 = value;
    console.log(value)
    this.setState({
      num10: newNum10,
    });
    this.props.onChange(this.state)
  }

  render() {

    const idrCurrencyFormat = (value, delimiter) => {
      return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);
    };

    return (
      <Grid container direction="row" spacing={10} justify="flex-start" style={{padding: '15px 0 0 6px'}}>
            <Grid item>
              <Grid container direction="column" spacing={2} style={{padding: '15px 0'}}>
                <Typography variant="h6" component="h6">
                  Biaya Pemeliharaan Per Tahun
                </Typography>

                <Grid container direction="row" spacing={4} style={{padding: '20px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0'}}>
                      Biaya Sewa per Tahun
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    style={{ borderRadius: 8, width: '25ch' }}
                    id="biaya-sewa-pertahun-input"
                    // variant="outlined"
                    formatter={_changeNum1 => `${_changeNum1}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    // type="number"
                    // value={this.state.num1} 
                    onChange={this._changeNum1}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={8} style={{padding: '20px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0'}}>
                      Listrik per Tahun
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    style={{ borderRadius: 8, width: '25ch' }}
                    id="listrik-pertahun-input"
                    // variant="outlined"
                    formatter={_changeNum2 => `${_changeNum2}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    // type="number"
                    // value={this.state.num2}
                    onChange={this._changeNum2}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={10} style={{padding: '20px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 45px 0 0'}}>
                      Telepon
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    style={{ borderRadius: 8, width: '25ch' }}
                    id="telepon-input"
                    // variant="outlined"
                    formatter={_changeNum3 => `${_changeNum3}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    // type="number"
                    // value={this.state.num3}
                    onChange={this._changeNum3}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={10} style={{padding: '20px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 40px 0 0'}}>
                      Services
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    style={{ borderRadius: 8, width: '25ch' }}
                    id="services-input"
                    // variant="outlined"
                    formatter={_changeNum4 => `${_changeNum4}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    // type="number"
                    // value={this.state.num4}
                    onChange={this._changeNum4}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={3} style={{padding: '20px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0'}}>
                      Biaya Bangun Ruangan
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    style={{ borderRadius: 8, width: '25ch' }}
                    id="biaya-bangun-ruangan-input"
                    // variant="outlined"
                    formatter={_changeNum5 => `${_changeNum5}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    // type="number"
                    // value={this.state.num5}
                    onChange={this._changeNum5}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={10} style={{padding: '20px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 5px 0 0'}}>
                      Sewa Signage
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    style={{ borderRadius: 8, width: '25ch' }}
                    id="sewa-signage-input"
                    // variant="outlined"
                    formatter={_changeNum6 => `${_changeNum6}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    // type="number"
                    // value={this.state.num6}
                    onChange={this._changeNum6}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={2} style={{padding: '20px 0 0'}} justify="space-between">
                  <Typography variant="h6" component="h6" style={{padding: '15px 0'}}>
                      Total :
                  </Typography>
                  <Typography variant="h6" component="h6" style={{padding: '15px 0'}}>
                      Rp {idrCurrencyFormat(this.state.result, ',')}
                  </Typography>
                </Grid>
                
              </Grid>
            </Grid>

            <Grid item>
              <Grid container direction="column" spacing={2} style={{padding: '0 0 0 50px'}}>
                <Typography variant="h6" component="h6" style={{padding: '15px 0 0'}}>
                  Deposit
                </Typography>

                <Grid container direction="row" spacing={5} style={{padding: '15px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0 0 6px'}}>
                      Sewa
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    // className={textInput}
                    style={{ borderRadius: 8, width: '25ch' }}
                    // type="number"
                    id="sewa-input"
                    formatter={_changeNum7 => `${_changeNum7}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // variant="outlined"
                    placeholder="00"
                    onChange={this._changeNum7}
                    size="large"
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={4} style={{padding: '22px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0 0 8px'}}>
                      Listrik
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    // className={textInput}
                    style={{ borderRadius: 8, width: '25ch' }}
                    // type="number"
                    id="listrik-input"
                    formatter={_changeNum8 => `${_changeNum8}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    // variant="outlined"
                    placeholder="00"
                    size="large"
                    onChange={this._changeNum8}
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={3} style={{padding: '22px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0 0 5px'}}>
                      Telepon
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    // className={textInput}
                    style={{ borderRadius: 8, width: '25ch' }}
                    // type="number"
                    id="telepon-input"
                    // variant="outlined"
                    formatter={_changeNum9 => `${_changeNum9}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    size="large"
                    onChange={this._changeNum9}
                  />
                  </Grid>
                </Grid>

                <Grid container direction="row" spacing={3} style={{padding: '22px 0 0'}}>
                  <Grid item>
                    <Typography variant="body1" component="p" style={{padding: '2px 0'}}>
                      Lain-lain
                    </Typography>
                  </Grid>
                  <Grid item>
                  <InputNumber
                    // className={textInput}
                    style={{ borderRadius: 8, width: '25ch' }}
                    // type="number"
                    // id="lain-lain-input"
                    // variant="outlined"
                    formatter={_changeNum10 => `${_changeNum10}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    placeholder="00"
                    size="large"
                    onChange={this._changeNum10}
                  />
                  </Grid>
                </Grid>

              </Grid>
            </Grid>

            <Grid item>
              {/* empty */}
            </Grid>
            <Grid item>
              {/* empty */}
            </Grid>
          </Grid>
    );
  }
}

NumericInput.propTypes = {
  onChange : Proptypes.func
}

export default NumericInput;

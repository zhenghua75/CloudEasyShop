import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView
} from 'react-native';

import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Test extends Component{
    constructor(props){
        super(props);
        this.testAddVouchs = this.testAddVouchs.bind(this);
        this.testVerifyVouch = this.testVerifyVouch.bind(this);
        this.testUnVerifyVouch = this.testUnVerifyVouch.bind(this);
        this.testDeleteVouchs = this.testDeleteVouchs.bind(this);
        this.testDeleteVouch = this.testDeleteVouch.bind(this);
        this.testAddVouchAndVouchs = this.testAddVouchAndVouchs.bind(this);
        this.testGetVouch = this.testGetVouch.bind(this);
        this.testGetVouchs = this.testGetVouchs.bind(this);

    }
    testGetVouch(){
      const { actions,auth } = this.props;
      let data = {
        draw:1,
        columns:[
          {
            data:'DT_RowId',
            name:'',
            searchable:true,
            orderable:true,
            search:{
              value:'=131885',
              regex:false
            }
          },
          {
            data:'Vouch.VouchType',
            name:'',
            searchable:true,
            orderable:true,
            search:{
              value:'=012',
              regex:false
            }
          }
        ],
        order:[
          {
            column:0,
            dir:'asc'
          }
        ],
        start:0,
        length:1,
        search:{
          value:'',
          regex:false
        }
      };
      actions.vouch(auth.token.access_token,'012',data);
    }
    testGetVouchs(){
      const { actions,auth } = this.props;
      let data = {
        draw:1,
        columns:[
          {
            data:'Vouchs.VouchId',
            name:'',
            searchable:true,
            orderable:true,
            search:{
              value:'=131885',
              regex:false
            }
          }
        ],
        order:[
          {
            column:0,
            dir:'asc'
          }
        ],
        start:0,
        length:1,
        search:{
          value:'',
          regex:false
        }
      };
      actions.vouchs(auth.token.access_token,data);
    }
    testAddVouchAndVouchs(){
      const { actions,auth,vouch } = this.props;
      let vouchData = {
        action:'create',
        data:[
          {
            Vouch:{
              VouchType:'012',
              BusType:null,
              Step:0,
              VouchDate:'2016-08-17',
              ToWhId:26,
              FromWhId:39,
              Memo:null
            }
          }
        ]
      };
      let vouchsData = {
        action:'create',
        data:[
          {
            Vouchs:{
              VouchId:0,
              InvId:1,
              Num:11,
              Memo:null
            }
          }
        ]
      };
      actions.vouchAndVouchs(auth.token.access_token,'012',vouchData,vouchsData);
    }
    testAddVouchs(){
      const { actions,auth,vouch } = this.props;
      let rowId = vouch.vouch.data[0].DT_RowId;
      let vouchId = parseInt(rowId.substring(4));
      actions.vouchs(auth.token.access_token,{
        action:'create',
        data:[
          {
            Vouchs:{
              VouchId:vouchId,
              InvId:1,
              Num:11,
              Memo:null
            }
          }
        ]
      });
    }
    testVerifyVouch(){
      const { actions,auth,vouch } = this.props;
      let rowId = vouch.vouch.data[0].DT_RowId;
      let data = {
        action:'verify',
        data:{}
      };
      data.data[rowId]={
        Vouch:{
          IsVerify:true,
          VouchType:'012'
        }
      };
      actions.vouch(auth.token.access_token,'012',data);
    }
    testUnVerifyVouch(){
      const { actions,auth,vouch } = this.props;
      let rowId = vouch.vouch.data[0].DT_RowId;
      let data = {
        action:'unverify',
        data:{}
      };
      data.data[rowId]={
        Vouch:{
          IsVerify:false,
          VouchType:'012'
        }
      };
      actions.vouch(auth.token.access_token,'012',data);
    }
    testDeleteVouchs(){
      const { actions,auth,vouch } = this.props;
      let rowId = vouch.vouchs.data[0].DT_RowId;
      let vouchsId = parseInt(rowId.substring(4));
      let data = {
        action:'remove',
        data:{}
      };
      data.data[rowId]={
        DT_RowId:rowId
      };
      actions.vouchs(auth.token.access_token,data);
    }
    testDeleteVouch(){
      const { actions,auth,vouch } = this.props;
      let rowId = vouch.vouch.data[0].DT_RowId;
      let data = {
        action:'remove',
        data:{}
      };
      data.data[rowId]={
        DT_RowId:rowId,
        Vouch:{
            VouchType:'012'
          }
      };
      actions.vouch(auth.token.access_token,'012',data);
    }
    render() {
      const { actions,auth,vouch } = this.props;
        return (
        <ScrollView style={styles.container}>
            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.login('gcxsb2','123456')}>
            <Text>login 1234</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.logout(auth.token.access_token)}>
            <Text>logout</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.getProfile(auth.token.access_token)}>
            <Text>getProfile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.updateProfile(auth.token.access_token,'系统管理员')}>
            <Text>updateProfile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.resetPassword(auth.token.access_token,{
              OldPassword:'admin1',
              NewPassword:'$186196!',
              ConfirmPassword:'$186196!'
            })}>
            <Text>resetPassword</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.getVouch(auth.token.access_token,{
              VouchType:'012',
              IsVerify:true,
              VouchDate:'2016-07-28'
            })}>
            <Text>getVouch</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={()=>actions.vouch(auth.token.access_token,'012',{
              action:'create',
              data:[
                {
                  Vouch:{
                    VouchType:'012',
                    BusType:null,
                    Step:0,
                    VouchDate:'2016-08-17',
                    ToWhId:26,
                    FromWhId:39,
                    Memo:null
                  }
                }
              ]
            })}>
            <Text>add vouch</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testAddVouchs}>
            <Text>add vouchs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testVerifyVouch}>
            <Text>verify vouch</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testUnVerifyVouch}>
            <Text>unverify vouch</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testDeleteVouchs}>
            <Text>testDeleteVouchs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testDeleteVouch}>
            <Text>testDeleteVouch</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testAddVouchAndVouchs}>
            <Text>testAddVouchAndVouchs</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testGetVouch}>
            <Text>testGetVouch</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{padding:5,margin:5}} onPress={this.testGetVouchs}>
            <Text>testGetVouchs</Text>
            </TouchableOpacity>
        </ScrollView>
        )
  }
}

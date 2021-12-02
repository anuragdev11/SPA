import React from 'react';
import './App.css';
import CompanyList from './Company';
import RenewalFilter from './RenewalFilters';
import StatusFilter from './StatusFilter';
import  VintageFilter from './VintageFilter';

class Menu extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOpen: false
      }
      this._menuToggle = this._menuToggle.bind(this);
      this._handleDocumentClick = this._handleDocumentClick.bind(this);
    }
    componentDidMount() {
      document.addEventListener('click', this._handleDocumentClick, false);
    }
    componentWillUnmount() {
      document.removeEventListener('click', this._handleDocumentClick, false);
    }
    _handleDocumentClick(e) {
      if (!this.refs.root.contains(e.target) && this.state.isOpen === true) {
        this.setState({
        isOpen: false
      });
      };
    }
    _menuToggle(e) {
      e.stopPropagation();
      this.setState({
        isOpen: !this.state.isOpen
      });
    }
    render() {
      let menuStatus = this.state.isOpen ? 'isopen' : '';
  
      return (
        <div ref="root">
          <div className="menubar">
            <div className="hambclicker" onClick={ this._menuToggle }></div>
            <div id="hambmenu" className={ menuStatus }><span></span><span></span><span></span><span></span></div>
            <div className="title">
              <span>{ this.props.title }</span>
            </div>
          </div>
          <div className="magin_10" id='menu'>
      <CompanyList sendCompany={this.getCompany.bind(this)}/>
      </div>
        <StatusFilter sendStatus={this.getStatus.bind(this)}/>
      <RenewalFilter sendRenewal={this.getRenewal.bind(this)}/> 
      <VintageFilter sendVintage={this.getVintage.bind(this)}></VintageFilter>
      <div className="text-center">
      <button onClick={() => this.search()} id="btnSearch" className='btnSearch'>Search</button>
      </div>
        </div>
      )
    }
  }
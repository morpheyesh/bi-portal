/** @jsx React.DOM */

var React = require('react/addons');
var ReactBootstrap =  require('react-bootstrap')
var ReactDOM = require('react-dom');

//import {Navbar, Nav, NavItem, NavDropdown, MenuItem, ProgressBar} from "react-bootstrap";

var Navbar = ReactBootstrap.Navbar;
var Nav = ReactBootstrap.Nav;
var NavItem = ReactBootstrap.NavItem;
var NavDropdown = ReactBootstrap.NavDropdown;
var MenuItem = ReactBootstrap.MenuItem;
var Button = ReactBootstrap.Button;
var BootstrapModal = ReactBootstrap.BootstrapModal;
var BootstrapButton = ReactBootstrap.BootstrapButton;
var Modal = require('react-modal');
var ReactGridLayout = require('react-grid-layout');




var Bizviz = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({modalIsOpen: true});
  },

  closeModal: function() {
    this.setState({modalIsOpen: false});
  },


      render: function () {
        return (
          <div id="main-container" className="sidebar-closed">
              <div id="palette">
                <br/>

                <button onClick={this.openModal} >
                    Add Data
                </button>

                <Modal
                  isOpen={this.state.modalIsOpen}
                  onRequestClose={this.closeModal}
                 >
                  <h2>Hello</h2>
                  <button onClick={this.closeModal}>close</button>
                  <div>I am a modal</div>
                  <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                  </form>
                </Modal>

              </div>
            </div>

        )
      }

  });



var Example = React.createClass({


    render: function() {
      return (
        <div id='example'>
        <ReactGridLayout className="layout"
     cols={12} rowHeight={30}>
     <div key={1} _grid={{x: 500, y: 0, w: 1, h: 2}} ></div>
     <div key={2} _grid={{x: 500, y: 0, w: 1, h: 2}} ></div>
     <div key={3} _grid={{x: 500, y: 0, w: 1, h: 2}} ></div>
   </ReactGridLayout>
        </div>
      )
    }
});


//ReactDOM.render(<App/>, document.getElementById('example'));

/* Module.exports instead of normal dom mounting */
module.exports = Bizviz;
